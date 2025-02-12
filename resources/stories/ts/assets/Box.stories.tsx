import type { Meta, StoryObj } from '@storybook/react';
import Box from './Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Box',
  component: Box,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    fill: { control: 'color' },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args
export const viewBox: Story = {
  args: {
    fill: '',
    picture: {
      id: 1,
      title: 'Test Box',
      state: 'Element Test'
    },
    state: ''
  },
};

