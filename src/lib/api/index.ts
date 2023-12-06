import { HTTPInterceptor } from '../http/HTTPInterceptor';
import { AuthorizationProvider } from '../http/AuthInterceptor';
import 'isomorphic-fetch';

export interface ParraAPIOptions {
  authorization?: AuthorizationProvider;
  baseUrl?: string;
  interceptors?: HTTPInterceptor[];
}
