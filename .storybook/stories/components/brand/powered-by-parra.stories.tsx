import React from 'react';
import PoweredByParra from '../../../../src/components/brand/PoweredByParra';
import { Story, Meta } from '@storybook/react';

const Template: Story = (args) => <PoweredByParra />;

export const defaultStory = Template.bind({});

defaultStory.story = { name: 'Default' };

export default {
  id: 'powered-by-parra',
  title: 'Powered by Parra',
  component: Template,
} as Meta;
