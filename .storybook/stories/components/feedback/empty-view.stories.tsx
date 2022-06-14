import React from 'react';
import { EmptyView } from '../../../../src/components/card/ParraCardView';
import { Story, Meta } from '@storybook/react';

const Template: Story<{}> = (props: {}) => <EmptyView {...props} />;

export const defaultStory = Template.bind({});

defaultStory.story = { name: 'Default' };
defaultStory.args = {};

export default {
  id: 'feedback/empty-card-view',
  title: 'Parra Empty Card View',
  component: Template,
} as Meta;
