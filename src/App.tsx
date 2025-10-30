import '@mantine/core/styles.css';

import { createTheme, MantineProvider } from '@mantine/core';
import { Router } from './Router';

// import { theme } from './theme';

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'cyan',
});

export default function App() {
  return (
    <MantineProvider defaultColorScheme="dark" theme={theme}>
      <Router />
    </MantineProvider>
  );
}
