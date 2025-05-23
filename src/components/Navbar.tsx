import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { GitHub as GitHubIcon } from '@mui/icons-material';

const Navbar = () => {
  return (
    <AppBar position="fixed" color="default" elevation={0} sx={{ bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo/Brand */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              '&:hover': {
                textDecoration: 'none',
                color: 'inherit',
              },
            }}
            href="/"
            component="a"
          >
            {/* Logo */}
            <Box
            component="img"
            src="/src/assets/revi-logo-removebg-preview.png"
            alt="Revi Logo"
            sx={{
              height: 32, // Adjust size as needed
              width: 'auto',
              mr: 1,
            }}
            />
          <Typography
            variant="h6"
            component="div"
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              fontSize: '1.5rem',
            }}
          >
            Revi
          </Typography>
          </Box>

          {/* Navigation Links */}
          <Box sx={{ display: 'flex', gap: 4, alignItems: 'center' }}>
            <Button
              href="https://github.com"
              target="_blank"
              rel="noopener"
              startIcon={<GitHubIcon />}
              color="inherit"
            >
              GitHub
            </Button>
            <Button 
              variant="contained" 
              color="primary"
              // href="#waitlist"
              onClick={() => {
              // const waitlistButton = document.querySelector('.waitlist-button');
              // if (waitlistButton) {
              //   waitlistButton.scrollIntoView({ behavior: 'smooth' });
              // }
              }}
            >
              Join waitlist
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
