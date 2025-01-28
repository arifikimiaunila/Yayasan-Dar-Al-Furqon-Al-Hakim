/* eslint-disable @typescript-eslint/no-require-imports */
import flowbite from 'flowbite-react/tailwind';

export default {
  content: [
    "./resources/views/app.blade.php",
    "./resources/**/*.{js,ts,jsx,tsx}",
	  'node_modules/flowbite-react/lib/esm/**/*.js',
	  "./node_modules/flowbite/**/*.js",
	 flowbite.content(),
  ],
	extends: [
    // ...
    "plugin:tailwindcss/recommended",
  ],
  settings: {
    // ...
    tailwindcss: {
      callees: ["twMerge", "createTheme"],
      classRegex: "^(class(Name)|theme)?$",
    },
important: '#app',
prefix: 'a354-',
separator: '_',
darkMode: ['selector', '[data-mode="dark"]'],
  theme: {
    screens: {
      'tablet': '640px',
      // => @media (min-width: 640px) { ... }

      'laptop': '1024px',
      // => @media (min-width: 1024px) { ... }

      'desktop': '1280px',
      // => @media (min-width: 1280px) { ... }
    },
    darkMode: 'selector',
  plugins: [
	  require('flowbite/plugin')({
      wysiwyg: true,
  }),
	require('flowbite-typography'),
	require('prettier-plugin-tailwindcss'),
  	require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('tailwind-children'),
	  flowbite.plugin(),
  ],
  tailwindAttributes: ["theme"],
  tailwindFunctions: ["twMerge", "createTheme"],
}
}
}

