import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: 'none',
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              backgroundColor: 'hsl(var(--muted))',
              padding: '0.25rem 0.375rem',
              borderRadius: '0.375rem',
              fontSize: '0.875rem',
              fontWeight: '500',
              border: '1px solid hsl(var(--border))',
            },
            'h1, h2, h3, h4, h5, h6': {
              scrollMarginTop: '5rem',
              fontWeight: '600',
            },
            h1: {
              fontSize: '2rem',
              lineHeight: '2.5rem',
              marginTop: '2rem',
              marginBottom: '1.5rem',
            },
            h2: {
              fontSize: '1.75rem',
              lineHeight: '2.25rem',
              marginTop: '2rem',
              marginBottom: '1rem',
              borderBottomWidth: '1px',
              borderBottomColor: 'hsl(var(--border))',
              paddingBottom: '0.5rem',
            },
            h3: {
              fontSize: '1.5rem',
              lineHeight: '2rem',
              marginTop: '1.5rem',
              marginBottom: '0.75rem',
            },
            h4: {
              fontSize: '1.25rem',
              lineHeight: '1.75rem',
              marginTop: '1.25rem',
              marginBottom: '0.5rem',
            },
            h5: {
              fontSize: '1.125rem',
              lineHeight: '1.75rem',
              marginTop: '1rem',
              marginBottom: '0.5rem',
            },
            h6: {
              fontSize: '1rem',
              lineHeight: '1.5rem',
              marginTop: '1rem',
              marginBottom: '0.5rem',
              color: 'hsl(var(--muted-foreground))',
            },
            p: {
              textAlign: 'justify',
              lineHeight: '1.75',
              marginTop: '1rem',
              marginBottom: '1rem',
            },
            a: {
              color: 'hsl(var(--primary))',
              textDecorationLine: 'underline',
              textUnderlineOffset: '2px',
              textDecorationThickness: '1px',
              '&:hover': {
                color: 'hsl(var(--primary) / 0.8)',
                textDecorationThickness: '2px',
              },
            },
            blockquote: {
              borderLeftColor: 'hsl(var(--primary))',
              borderLeftWidth: '4px',
              paddingLeft: '1rem',
              fontStyle: 'italic',
              backgroundColor: 'hsl(var(--muted) / 0.3)',
              paddingTop: '0.5rem',
              paddingBottom: '0.5rem',
              borderTopRightRadius: '0.375rem',
              borderBottomRightRadius: '0.375rem',
              color: 'hsl(var(--muted-foreground))',
            },
            'ul, ol': {
              marginTop: '1rem',
              marginBottom: '1rem',
              paddingLeft: '1rem',
            },
            'ul > li': {
              paddingLeft: '0.25rem',
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'ol > li': {
              paddingLeft: '0.25rem',
              marginTop: '0.25rem',
              marginBottom: '0.25rem',
            },
            'ul > li::marker': {
              color: 'hsl(var(--primary))',
            },
            'ol > li::marker': {
              color: 'hsl(var(--primary))',
              fontWeight: '600',
            },
            pre: {
              backgroundColor: 'hsl(var(--muted))',
              border: '1px solid hsl(var(--border))',
              borderRadius: '0.5rem',
              padding: '1rem',
              overflow: 'auto',
              fontSize: '0.875rem',
              lineHeight: '1.5',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: 'none',
              padding: '0',
              fontSize: 'inherit',
              fontWeight: 'inherit',
            },
            img: {
              borderRadius: '0.5rem',
              boxShadow: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
            },
            figure: {
              marginTop: '2rem',
              marginBottom: '2rem',
            },
            figcaption: {
              textAlign: 'center',
              fontSize: '0.875rem',
              color: 'hsl(var(--muted-foreground))',
              fontStyle: 'italic',
              marginTop: '0.5rem',
            },
            strong: {
              fontWeight: '600',
              color: 'hsl(var(--foreground))',
            },
            em: {
              fontStyle: 'italic',
            },
            hr: {
              borderColor: 'hsl(var(--border))',
              marginTop: '2rem',
              marginBottom: '2rem',
            },
          },
        },
        lg: {
          css: {
            fontSize: '1.125rem',
            lineHeight: '1.75',
            h1: {
              fontSize: '2.25rem',
              lineHeight: '2.75rem',
            },
            h2: {
              fontSize: '2rem',
              lineHeight: '2.5rem',
            },
            h3: {
              fontSize: '1.75rem',
              lineHeight: '2.25rem',
            },
            h4: {
              fontSize: '1.5rem',
              lineHeight: '2rem',
            },
          },
        },
      },
    },
  },
}

export default config
