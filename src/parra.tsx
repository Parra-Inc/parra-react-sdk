import React, { createContext, PropsWithChildren, useContext } from 'react';
import ParraAPI from './lib/api/ParraAPI';
import {
  AuthInterceptor,
  AuthorizationProvider,
} from './lib/http/AuthInterceptor';
import { HTTPClient } from './lib/http/HTTPClient';

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

export const ParraContext: React.FC<PropsWithChildren<Parra>> = ({
  children,
  ...props
}) => {
  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export const ParraProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  tenantId,
  authorization,
  options,
}) => {
  const baseUrl = options?.baseUrl ?? 'https://api.parra.io';
  const authInterceptor = new AuthInterceptor(authorization);
  const http = new HTTPClient([authInterceptor]);
  const api = new ParraAPI(http, { baseUrl });

  return (
    <ParraContext api={api} tenantId={tenantId}>
      {children}
    </ParraContext>
  );
};
