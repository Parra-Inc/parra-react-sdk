'use client';

import React from 'react';
import PoweredByParraSvg from '../assets/svgs/PoweredByParra';
import { useParra } from '../../parra';

export interface PoweredByParraProps {}

export default function PoweredByParra({}: PoweredByParraProps) {
  const { theme } = useParra();

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
      <PoweredByParraSvg theme={theme === 'dark' ? 'dark' : 'light'} />
    </a>
  );
}
