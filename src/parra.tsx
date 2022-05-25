import React, { createContext, PropsWithChildren, useContext } from 'react';
import ParraAPI from './lib/api/ParraAPI';
import {
  AuthInterceptor,
  AuthorizationProvider,
} from './lib/http/AuthInterceptor';
import { HTTPClient } from './lib/http/HTTPClient';
import { HTTPInterceptor } from './lib/http/HTTPInterceptor';

interface Parra {
  api: ParraAPI;
  tenantId: string;
}

const Context = createContext<Parra>(null as any);

export const useParra = () => useContext(Context);

export interface ParraLogger {
  info: () => void;
  debug: () => void;
  warn: () => void;
  error: () => void;
}

export interface ParraOptions {
  baseUrl?: string;
  logger?: ParraLogger;
}

interface Props {
  tenantId: string;
  authorization: AuthorizationProvider;
  options?: ParraOptions;
}

export const ParraProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  tenantId,
  authorization,
  options,
}) => {
  const baseUrl = options?.baseUrl ?? 'https://api.parra.io';

  const interceptors: HTTPInterceptor[] = [];

  const authInterceptor = new AuthInterceptor(authorization);
  interceptors.push(authInterceptor);

  const http = new HTTPClient(interceptors);

  const api = new ParraAPI(http, { baseUrl });

  const parra: Parra = {
    api,
    tenantId,
  };

  return <Context.Provider value={parra as any}>{children}</Context.Provider>;
};
