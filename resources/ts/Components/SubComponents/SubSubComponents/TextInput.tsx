import { FloatingLabel } from "flowbite-react";
import React, { forwardRef } from 'react';

const TextInput = forwardRef<
  HTMLInputElement,
  React.DetailedHTMLProps< React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
>((ref) => (
<FloatingLabel variant="standard" label={ref} color="success" className="dark:text-gray-400 peer-focus:dark:text-blue-500" />
));

export default TextInput;
