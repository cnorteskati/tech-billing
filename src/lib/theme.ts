import { createTheme } from '@mui/material';

export const lightTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'light',
  },
});

export const darkTheme = createTheme({
  cssVariables: true,
  palette: {
    mode: 'dark',
  },
});
