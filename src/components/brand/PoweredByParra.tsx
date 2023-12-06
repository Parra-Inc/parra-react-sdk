import React from 'react';
import PoweredByParraSvg from '../assets/svgs/PoweredByParra';
export default function PoweredByParra() {
  return (
    <a
      href="https://parra.io"
      style={{
        display: 'inline-block',
        color: 'rgba(0, 0, 0, 0.1)',
        margin: 3,
        textDecoration: 'none',
        textAlign: 'center',
      }}
    >
      <PoweredByParraSvg />
      <span
        style={{
          fontSize: 8,
          fontWeight: 700,
        }}
      >
        Powered by{' '}
      </span>
      <span
        style={{
          fontFamily: 'Pacifico',
          fontSize: 11,
          fontWeight: 400,
        }}
      >
        Parra
      </span>
    </a>
  );
}
