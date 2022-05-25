import { AuthorizationProvider, HTTPInterceptor } from '@parra/http-client';
import 'isomorphic-fetch';

export interface ParraAPIOptions {
  authorization?: AuthorizationProvider;
  baseUrl?: string;
  interceptors?: HTTPInterceptor[];
}
