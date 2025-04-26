import { ThemeProvider, CssBaseline, Box } from '@mui/material';
import { createTheme } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowItWorks from './components/HowItWorks';
import Benefits from './components/Benefits';
import CTA from './components/CTA';
import Footer from './components/Footer';
// import GraphBackground from './components/GraphBackground';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3d52a0', // Blue
      light: '#7091e6',
      dark: '#8697c4',
    },
    secondary: {
      main: '#10b981', // Green for success/action
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '3.5rem',
      fontWeight: 700,
      '@media (max-width:600px)': {
        fontSize: '2.5rem',
      },
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
      '@media (max-width:600px)': {
        fontSize: '2rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
    },
    body1: {
      fontSize: '1.1rem',
      lineHeight: 1.7,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 500,
          padding: '8px 24px',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <GraphBackground /> */}
      <Navbar />
      <Box 
        component="main" 
        sx={{ 
          width: '100%',
          display: 'flex', 
          flexDirection: 'column',
          overflow: 'hidden',
          '& > *': {
            width: '100%',
            maxWidth: 'none',
            '& .MuiContainer-root': {
              maxWidth: '100% !important',
              paddingLeft: { xs: 2, sm: 4 },
              paddingRight: { xs: 2, sm: 4 },
            },
          }
        }}
      >
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CTA />
      </Box>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
