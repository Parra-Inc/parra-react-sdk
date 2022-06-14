import React from 'react';
import LeftArrow from '../../../src/components/assets/svgs/LeftArrow';
import RightArrow from '../../../src/components/assets/svgs/RightArrow';
import RadioOff from '../../../src/components/assets/svgs/RadioOff';
import RadioOffDisabled from '../../../src/components/assets/svgs/RadioOffDisabled';
import RadioOn from '../../../src/components/assets/svgs/RadioOn';
import RadioOnDisabled from '../../../src/components/assets/svgs/RadioOnDisabled';
import { Story, Meta } from '@storybook/react';

const Template: Story = (args) => {
  return (
    <div>
      <div>
        <LeftArrow />
        <RightArrow />
      </div>
      <RadioOff />
      <RadioOffDisabled />
      <RadioOn />
      <RadioOnDisabled />
      <div></div>
    </div>
  );
};

export const defaultStory = Template.bind({});

defaultStory.story = { name: 'Default' };

export default {
  id: 'assets',
  title: 'Assets',
  component: Template,
} as Meta;
