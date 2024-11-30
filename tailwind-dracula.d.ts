declare module 'tailwind-dracula' {
  import { Plugin } from 'tailwindcss';

  const tailwindDracula: (prefix?: string, hard?: boolean) => Plugin;
  export default tailwindDracula;
}

declare module 'tailwind-dracula/colors' {
  const colors: {
    [key: string]: {
      [shade: string]: string;
      DEFAULT: string;
    };
  };
  export default colors;
}
