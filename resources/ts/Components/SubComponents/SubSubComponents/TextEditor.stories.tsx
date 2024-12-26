// Replace your-framework with the name of your framework
import type { Meta, StoryObj } from '@storybook/react';
import { TextEditor } from './TextEditor';

const meta = {
  component: TextEditor,
} satisfies Meta<typeof TextEditor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Example = {
  args: {
    primary: true,
    label: 'TextEditor',
  },
} satisfies Story;
