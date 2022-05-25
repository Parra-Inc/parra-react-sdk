import { HTTPRequest, HTTPResponse } from './HTTPClient';

export interface HTTPInterceptor {
  willSendRequest(req: HTTPRequest): Promise<HTTPRequest>;
  willHandleResponse(res: HTTPResponse): Promise<HTTPResponse>;
}
