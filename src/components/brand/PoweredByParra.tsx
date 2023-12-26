import React, { useEffect, useState } from 'react';
import PoweredByParraSvg from '../assets/svgs/PoweredByParra';
import { ThemeName } from '../theme/Theme';

export interface PoweredByParraProps {
  forceTheme?: ThemeName;
}

export default function PoweredByParra({ forceTheme }: PoweredByParraProps) {
  const systemTheme = () => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    return media.matches ? 'dark' : 'light';
  };

  const [theme, setTheme] = useState<ThemeName>(forceTheme || systemTheme());

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');

    function onMediaChange() {
      const newTheme = media.matches ? 'dark' : 'light';
      setTheme(newTheme);
    }

    onMediaChange();
    media.addEventListener('change', onMediaChange);

    return () => {
      media.removeEventListener('change', onMediaChange);
    };
  }, []);

  return (
    <a
      title="Powered by Parra"
      aria-label="Powered by Parra"
      href="https://parra.io"
      style={{
        display: 'inline-block',
        margin: 3,
        textDecoration: 'none',
        textAlign: 'center',
      }}
    >
      <PoweredByParraSvg theme={theme} />
    </a>
  );
}
