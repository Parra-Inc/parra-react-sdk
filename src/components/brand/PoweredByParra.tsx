'use client';

import React, { CSSProperties } from 'react';
import PoweredByParraSvg from '../assets/svgs/PoweredByParra';

export interface PoweredByParraProps {
  className?: string;
  style?: CSSProperties;
  tenantId?: string;
  applicationId?: string;
  isDark?: boolean;
}

const makeHref = (tenantId?: string, applicationId?: string) => {
  const url = new URL('https://parra.io');

  url.searchParams.append('utm_medium', 'powered_by_parra');
  url.searchParams.append('utm_source', 'parra_web');

  if (tenantId) {
    url.searchParams.append('tenant_id', tenantId);
  }

  if (applicationId) {
    url.searchParams.append('application_id', applicationId);
  }

  return url.toString();
};

export default function PoweredByParra({
  className,
  tenantId,
  applicationId,
  isDark,
  style,
}: PoweredByParraProps) {
  return (
    <a
      title="Powered by Parra"
      aria-label="Powered by Parra"
      href={makeHref(tenantId, applicationId)}
      style={{
        display: 'inline-block',
        margin: 3,
        textDecoration: 'none',
        textAlign: 'center',
        ...style,
      }}
      className={className}
    >
      <PoweredByParraSvg isDark={isDark} />
    </a>
  );
}
