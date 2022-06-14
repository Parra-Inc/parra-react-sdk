import React from 'react';
import FeedbackNavigation, {
  Props,
} from '../../../../src/components/feedback/FeedbackNavigation';
import { Story, Meta } from '@storybook/react';

const Template: Story<Props> = (props: Props) => (
  <FeedbackNavigation {...props} />
);

export const defaultStory = Template.bind({});

defaultStory.story = { name: 'Default' };
defaultStory.args = { hideBrand: false, hideNext: false, hidePrevious: false };

export default {
  id: 'feedback/navigation',
  title: 'Feedback Navigation',
  component: Template,
} as Meta;
