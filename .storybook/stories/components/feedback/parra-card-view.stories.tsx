import React from 'react';
import ParraCardView, {
  Props,
} from '../../../../src/components/card/ParraCardView';
import { Story, Meta } from '@storybook/react';
import { ParraFeedbackProvider } from '../../../../src/components/feedback/context';

const Template: Story<Props> = (props: Props) => (
  <ParraFeedbackProvider>
    <ParraCardView {...props} />;
  </ParraFeedbackProvider>
);

const questions = [
  {
    id: '975b061c-2c6c-41f3-9d22-6e372d7950fd',
    created_at: '2022-01-01T22:18:39.952Z',
    updated_at: '2022-01-01T22:18:39.952Z',
    deleted_at: null,
    tenant_id: '73840a9f-9491-4af0-b53f-0aadc44c40c3',
    title: 'What feature should we work on next?',
    subtitle: 'Please make a selection.',
    type: 'choice',
    kind: 'radio',
    status: 'open',
    data: {
      options: [
        {
          title: 'More question types',
          value: 'question-types',
          is_other: false,
          id: 'd02d31fa-6fe9-455d-8b41-cf06aaa61869',
        },
        {
          title: 'Advanced analytics',
          value: 'analytics',
          is_other: false,
          id: '406ce020-6068-4f7c-b906-963c85dad083',
        },
        {
          title: 'Inviting team members',
          value: 'inviting team members',
          is_other: false,
          id: 'cf4d239d-334d-4916-9319-c3787660dcb9',
        },
      ],
    },
    active: true,
    expires_at: '2022-05-18T01:23:31.000Z',
    answer_quota: 1000,
  },
  {
    id: 'a0ca7503-84c9-4e1d-83c3-68a89fa00898',
    created_at: '2022-01-01T22:18:39.952Z',
    updated_at: '2022-01-01T22:18:39.952Z',
    deleted_at: null,
    tenant_id: '73840a9f-9491-4af0-b53f-0aadc44c40c3',
    title: 'This is a closed question?',
    subtitle: 'Please make a selection.',
    type: 'choice',
    kind: 'radio',
    closed_at: '2022-02-01T22:18:39.952Z',
    status: 'closed',
    data: {
      options: [
        {
          title: 'More question types',
          value: 'question-types',
          is_other: false,
          id: 'd02d31fa-6fe9-455d-8b41-cf06aaa61869',
        },
        {
          title: 'Advanced analytics',
          value: 'analytics',
          is_other: false,
          id: '406ce020-6068-4f7c-b906-963c85dad083',
        },
        {
          title: 'Inviting team members',
          value: 'inviting team members',
          is_other: false,
          id: 'cf4d239d-334d-4916-9319-c3787660dcb9',
        },
      ],
    },
    active: true,
    expires_at: '2022-05-18T01:23:31.000Z',
    answer_quota: 1000,
  },
];

export const defaultStory = Template.bind({});

defaultStory.story = { name: 'Default' };
defaultStory.args = {
  cardsResponse: {
    items: questions.map((question) => ({
      type: 'question',
      version: 'v1',
      data: question,
    })),
  },
};

export const emptyStory = Template.bind({});

emptyStory.story = { name: 'Empty' };
emptyStory.args = {
  cardsResponse: {
    items: [],
  },
};

export default {
  id: 'feedback/parra-card-view',
  title: 'Parra Card View',
  component: Template,
} as Meta;
