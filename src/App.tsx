import './App.css';
import { createTheme, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/tiptap/styles.css';
import '@mantine/dates/styles.css';
import '@mantine/carousel/styles.css';
import '@mantine/notifications/styles.css';
import { Notifications } from '@mantine/notifications';
import { Provider } from 'react-redux';
import Store from './Store';
import AppRoutes from './Pages/AppRoutes';

function App() {
  const theme = createTheme({
    focusRing: "never",
    fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif",
    headings: {
      fontFamily: "'Outfit', -apple-system, BlinkMacSystemFont, sans-serif",
      fontWeight: '700',
    },
    defaultRadius: 'md',
    primaryColor: "brightSun",
    primaryShade: 4,
    colors: {
      'brightSun': [
        '#fffbeb', '#fef3c7', '#fde68a', '#fcd34d', '#f59e0b',
        '#d97706', '#b45309', '#92400e', '#78350f', '#451a03', '#260d01'
      ],
      'mineShaft': [
        '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1', '#94a3b8',
        '#64748b', '#475569', '#2d3748', '#1b2234', '#121724', '#090d16'
      ],
    }
  });

  return (
    <Provider store={Store}>
      <MantineProvider defaultColorScheme='dark' theme={theme}>
        <Notifications position='top-center' zIndex={1000}/>
        <AppRoutes/>
      </MantineProvider>
    </Provider>
  );
}

export default App;
