'use client';

import { extendTheme } from '@chakra-ui/react';

// Definicja motywu używająca zmiennych CSS
const theme = extendTheme({
  colors: {
    brand: {
      50: "#FCE8E8",
      100: "#F5C6C6",
      200: "#EEA4A4",
      300: "#E78282",
      400: "#E06060",
      500: "var(--primary)", // główny kolor
      600: "var(--primary-hover)", // hover
      700: "var(--primary-active)", // active
      800: "#AD3434",
      900: "#932C2C",
    },
  },
  fonts: {
    heading: 'var(--font-sans)',
    body: 'var(--font-sans)',
  },
  styles: {
    global: {
      body: {
        bg: 'gray.50',
        color: 'gray.800',
      },
    },
  },
  components: {
    Button: {
      baseStyle: {
        fontWeight: 'medium',
        borderRadius: 'md',
      },
      variants: {
        primary: {
          bg: "var(--primary)",
          color: 'white',
          _hover: {
            bg: "var(--primary-hover)",
          },
          _active: {
            bg: "var(--primary-active)",
          },
        },
      },
    },
    Link: {
      baseStyle: {
        color: "var(--primary)",
        _hover: {
          textDecoration: 'underline',
        },
      },
    },
  },
});

export default theme;
