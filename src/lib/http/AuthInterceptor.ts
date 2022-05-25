import { HTTPRequest } from './HTTPClient';
import { HTTPInterceptor } from './HTTPInterceptor';

export type Authorization = string | null | undefined;
export type AuthFunctionProvider = () => Authorization;
export type AuthPromiseProvider = () => Promise<Authorization>;
export type AuthorizationProvider =
  | Authorization
  | AuthPromiseProvider
  | AuthFunctionProvider;

export class AuthInterceptor implements HTTPInterceptor {
  constructor(private authorization: AuthorizationProvider) {}

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

  async willSendRequest(req: HTTPRequest): Promise<HTTPRequest> {
    if (!this.authorization) {
      return req;
    }

    try {
      const authToken = await this.authorizationTokenForAuthorization(
        this.authorization
      );

      if (authToken) {
        const headers = new Headers(req.headers);
        headers.set('Authorization', `Bearer ${authToken}`);
        req.headers = headers;
      }
    } catch (err) {
      console.error(err);
    }

    return req;
  }

  async willHandleResponse(res: Response): Promise<Response> {
    return res;
  }
}
