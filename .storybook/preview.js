import React from 'react';
import { ParraContext } from '../src/parra';
import MockParraAPI from '../src/lib/api/__mocks__/MockParraAPI';

export const decorators = [
  (Story) => (
    <ParraContext tenantId="abc123" api={new MockParraAPI()}>
      {Story()}
    </ParraContext>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
