import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import React from 'react';
import ContainerList from './ContainerList';
import ContainerLogTable from './ContainerLogTable';
import LogFilters from './LogFilters';

const drawerWidth = 240;

export default function App() {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const theme = React.useMemo(
    () => createTheme({
      palette: {
        mode: prefersDarkMode ? 'dark' : 'light',
      },
    }),
    [prefersDarkMode],
  );

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ display: 'flex', height: '100%' }}>
        <CssBaseline />
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' },
          }}
        >
          <Box sx={{ overflow: 'auto' }}>
            <ContainerList />
          </Box>
        </Drawer>
        <Stack component="main" sx={{ flexGrow: 1, flexShrink: 1 }}>
          <LogFilters />
          <Divider />
          <ContainerLogTable />
        </Stack>
      </Box>
    </ThemeProvider>
  );
}
