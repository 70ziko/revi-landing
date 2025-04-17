import { Container, Typography, Box, Link, Grid } from '@mui/material';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        bgcolor: 'background.paper',
        borderTop: '1px solid',
        borderColor: 'divider',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid size={{xs: 12, sm: 4}}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 700,
                color: 'primary.main',
                mb: 2,
              }}
            >
              Revi
            </Typography>
            <Typography variant="body2" color="text.secondary">
              AI-powered product analysis<br />
              for smarter shopping decisions
            </Typography>
          </Grid>

          <Grid size={{xs: 12, sm: 8}}>
            <Grid container spacing={2}>
              <Grid size={{xs: 6, sm: 4}}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Product
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="#" color="text.secondary" underline="hover">Features</Link>
                  <Link href="#" color="text.secondary" underline="hover">How It Works</Link>
                  <Link href="#" color="text.secondary" underline="hover">Download</Link>
                </Box>
              </Grid>

              <Grid size={{xs: 6, sm: 4}}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Company
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="#" color="text.secondary" underline="hover">About</Link>
                  <Link href="#" color="text.secondary" underline="hover">Blog</Link>
                  <Link href="#" color="text.secondary" underline="hover">Contact</Link>
                </Box>
              </Grid>

              <Grid size={{xs: 6, sm: 4}}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Legal
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                  <Link href="#" color="text.secondary" underline="hover">Privacy</Link>
                  <Link href="#" color="text.secondary" underline="hover">Terms</Link>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Typography
          variant="body2"
          color="text.secondary"
          align="center"
          sx={{ mt: 4 }}
        >
          © {new Date().getFullYear()} Revi. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
