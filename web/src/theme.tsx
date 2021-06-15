import { extendTheme } from '@chakra-ui/react'
import { createBreakpoints } from '@chakra-ui/theme-tools'

const fonts = { mono: `'Menlo', monospace` }

const breakpoints = createBreakpoints({
  sm: '40em',
  md: '52em',
  lg: '64em',
  xl: '80em',
})

const theme = extendTheme({
  colors: {
    black: '#16161D',
    airbnb: {
      50: '#ffe8e9',
      100: '#ffd7d9',
      200: '#ffc4c6',
      300: '#ffafb1',
      400: '#ff9598',
      500: '#ff7478',
    },
    blackFuel: {
      50: '#dee2e6',
      100: '#adb5bd',
      200: '#6c757d',
      300: '#495057',
      400: '#343a40',
      500: '#212529',
    },
  },
  fonts,
  breakpoints,
})

export default theme
