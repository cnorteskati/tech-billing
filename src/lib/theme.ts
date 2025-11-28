import { createTheme } from '@mui/material';

// TODO put the reused colors on the theme for all charts

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
