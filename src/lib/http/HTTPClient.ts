import { AuthorizationProvider } from './AuthInterceptor';
import { HTTPInterceptor } from './HTTPInterceptor';

export type HTTPRequestBody = BodyInit;
export type HTTPUrlComponent = number | string;
export type HTTPResponse = Response;
export type HTTPHeaders = Headers;
export type HTTPQuery =
  | URLSearchParams
  | { [param: string]: HTTPUrlComponent | undefined | null }
  | object;

export type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HTTPLogger {
  debug: (value: string) => void;
  info: (value: string) => void;
  warn: (value: string) => void;
  error: (value: string) => void;
}

export interface HTTPOptions {
  baseUrl?: string;
  authorization: AuthorizationProvider;
  logger?: HTTPLogger;
}

export type HTTPRequest = RequestInit & {
  query?: HTTPQuery | null;
  raw?: boolean;
};
export type HTTPRequestWithoutMethod = Omit<HTTPRequest, 'method'>;

export class HTTPClient {
  private token?: string;

  constructor(
    private interceptors: Array<HTTPInterceptor> = new Array<HTTPInterceptor>(),
    private options?: HTTPOptions
  ) {
    if (typeof options?.authorization === 'string') {
      this.token = options?.authorization;
    }
  }

  private async authorizationTokenForAuthorization(
    authorization: any | null | undefined
  ) {
    if (!authorization) {
      return undefined;
    }

    if (typeof authorization === 'string') {
      return authorization;
    } else if (typeof authorization === 'function') {
      const value = authorization();
      if (value.then) {
        return await value;
      } else {
        return value;
      }
    }
  }

  private async _signRequest(req: HTTPRequest): Promise<HTTPRequest> {
    const authorization = this.options?.authorization;

    if (!authorization) {
      return req;
    }

    // Sign request
    let authToken;

    if (this.token) {
      authToken = this.token;
    } else {
      authToken = await this.authorizationTokenForAuthorization(authorization);
      this.token = authToken;
    }

    try {
      if (authToken) {
        const headers = new Headers(req.headers);
        headers.set('Authorization', `Bearer ${authToken}`);
        req.headers = headers;
        this.options?.logger?.info(`Signing request with token ${this.token}`);
      }
    } catch (err) {
      console.error(err);
    }

    return req;
  }

  private async _refreshToken() {
    const authorization = this.options?.authorization;
    this.options?.logger?.info('Refreshing token...');

    if (authorization) {
      this.token = await this.authorizationTokenForAuthorization(authorization);
      this.options?.logger?.info(`refreshed token ${this.token}`);
    }
  }

  get<T>(
    path: string,
    query?: HTTPQuery,
    options?: HTTPRequestWithoutMethod
  ): Promise<T> {
    return this.execute(path, {
      ...options,
      method: 'GET',
      query,
    });
  }

  post<T>(
    path: string,
    body: HTTPRequestBody,
    options?: HTTPRequestWithoutMethod
  ): Promise<T> {
    return this.execute(path, {
      ...options,
      method: 'POST',
      body,
    });
  }

  put<T>(
    path: string,
    body: HTTPRequestBody,
    options?: HTTPRequestWithoutMethod
  ): Promise<T> {
    return this.execute(path, {
      ...options,
      method: 'PUT',
      body,
    });
  }

  patch<T>(
    path: string,
    body: HTTPRequestBody,
    options?: HTTPRequestWithoutMethod
  ): Promise<T> {
    return this.execute(path, {
      ...options,
      method: 'PATCH',
      body,
    });
  }

  delete<T>(path: string, options?: HTTPRequestWithoutMethod): Promise<T> {
    return this.execute(path, {
      ...options,
      method: 'DELETE',
    });
  }

  async execute<T>(path: string, req: HTTPRequest): Promise<T> {
    this.options?.logger?.debug(`Executing ${req.method} ${path}`);

    const unsignedReqToSend = await this.willSendRequest(req);

    this.options?.logger?.debug(
      `Unsigned request ${JSON.stringify(unsignedReqToSend)}`
    );

    // TODO: - Check token expiration and preemptively refresh token
    const signedReq = await this._signRequest(unsignedReqToSend);

    this.options?.logger?.debug(`Signed request ${JSON.stringify(signedReq)}`);

    const url = this._buildUrl(
      path,
      signedReq.query,
      this.options?.baseUrl
    ).toString();

    this.options?.logger?.debug(`Built url ${url}`);

    const requestInit = {
      method: signedReq.method,
      body: signedReq.body,
      headers: signedReq.headers || new Headers(),
    };

    this.options?.logger?.info(`${requestInit.method} url`);
    this.options?.logger?.info(`Body: ${JSON.stringify(requestInit.body)}`);
    this.options?.logger?.info(
      `Headers: ${JSON.stringify(requestInit.headers)}`
    );

    let rawRes = await fetch(url, requestInit);

    if (rawRes.status === 401) {
      this.options?.logger?.info(
        `${requestInit.method} url -> ${rawRes.status} -> refreshing`
      );

      // Refresh token and try again
      await this._refreshToken();

      const resignedReq = await this._signRequest(unsignedReqToSend);

      rawRes = await fetch(url, {
        method: resignedReq.method,
        body: resignedReq.body,
        headers: resignedReq.headers || new Headers(),
      });
    }

    this.options?.logger?.info(`${requestInit.method} url -> ${rawRes.status}`);

    const res = await this.willHandleResponse(rawRes);

    if (res.ok) {
      if (req.raw) {
        return res as any as T;
      } else {
        return this._dataForRes(res);
      }
    } else {
      throw res;
    }
  }

  private async _dataForRes(res: HTTPResponse): Promise<any> {
    const contentType = res.headers.get('content-type');
    const isJSON = contentType && contentType.includes('application/json');
    this.options?.logger?.debug(`Content type: ${contentType}`);

    if (isJSON) {
      const body = await res.json();
      return body;
    } else {
      return res.body;
    }
  }

  async willSendRequest(req: HTTPRequest): Promise<HTTPRequest> {
    let request = req;

    for (const interceptor of this.interceptors) {
      request = await interceptor.willSendRequest(request);
    }

    return request;
  }

  async willHandleResponse(res: HTTPResponse): Promise<HTTPResponse> {
    let response = res;

    for (const interceptor of this.interceptors) {
      response = await interceptor.willHandleResponse(response);
    }

    return response;
  }

  private _buildUrl(
    path: string,
    params?: HTTPQuery | null,
    baseUrl?: string
  ): URL {
    const url = new URL(baseUrl ? `${baseUrl}/${path}` : path);

    if (params) {
      Object.entries(params)
        .filter(([, value]) => !!value)
        .forEach(([key, value]) => url.searchParams.append(key, value));
    }

    return url;
  }
}
