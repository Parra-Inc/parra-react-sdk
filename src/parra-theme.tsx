import React, { createContext, PropsWithChildren, useContext } from 'react';

export type Theme = 'dark' | 'light' | 'auto' | string;

export interface ParraTheme {
  theme?: Theme;
  isDark: boolean;
}

const Context = createContext<ParraTheme>(null as any);

export const useParraTheme = () => useContext(Context);

export interface ParraLogger {
  info: () => void;
  debug: () => void;
  warn: () => void;
  error: () => void;
}

interface Props {
  theme?: Theme;
}

export const ParraThemeContext: React.FC<PropsWithChildren<ParraTheme>> = ({
  children,
  ...props
}) => {
  return <Context.Provider value={props}>{children}</Context.Provider>;
};

export const ParraThemeProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  theme,
}) => {
  const isDark = theme === 'dark';

  return (
    <ParraThemeContext theme={theme} isDark={isDark}>
      {children}
    </ParraThemeContext>
  );
};
