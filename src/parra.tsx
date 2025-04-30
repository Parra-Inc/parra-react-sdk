import React, {
  createContext,
  PropsWithChildren,
  useContext,
  useMemo,
} from 'react';
import ParraAPI from './lib/api/ParraAPI';
import {
  AuthInterceptor,
  AuthorizationProvider,
  FetchFunction,
  HTTPClient,
} from '@parra/http-client';
import { ParraThemeProvider } from './parra-theme';

interface Parra {
  api: ParraAPI;
  tenantId: string;
  theme?: string;
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
  fetch?: FetchFunction;
}

interface Props {
  tenantId: string;
  authorization: AuthorizationProvider;
  options?: ParraOptions;
  theme?: string;
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
  theme,
}) => {
  const api = useMemo(() => {
    const baseUrl = options?.baseUrl ?? 'https://api.parra.io';
    const authInterceptor = new AuthInterceptor(authorization, {
      logger: options?.logger,
    });
    const http = new HTTPClient({
      interceptors: [authInterceptor],
      fetch: options?.fetch || ((...args) => window.fetch(...args)),
      logger: options?.logger,
    });
    return new ParraAPI(http, { baseUrl });
  }, [options, authorization]);

  return (
    <ParraThemeProvider theme={theme}>
      <ParraContext api={api} tenantId={tenantId}>
        {children}
      </ParraContext>
    </ParraThemeProvider>
  );
};
