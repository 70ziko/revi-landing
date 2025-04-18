import { Container, Typography, Button, Box, Stack } from '@mui/material';
import { PhotoCamera, CompareArrows } from '@mui/icons-material';

const Hero = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, rgba(74, 139, 224, 0.3) 0%, rgb(27, 27, 27) 100%)',
        pt: { xs: 12, md: 16 },
        pb: { xs: 8, md: 12 },
      }}
    >
      <Container maxWidth="lg">
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={4}
          alignItems="center"
          justifyContent="space-between"
        >
          {/* Left side - Content */}
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h1"
              gutterBottom
              sx={{
                background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Reviews at a Glance
            </Typography>
            <Typography
              variant="h4"
              color="text.secondary"
              gutterBottom
              sx={{ mb: 4, fontWeight: 'normal' }}
            >
              Make informed shopping decisions instantly with AI-powered product analysis
            </Typography>
            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
              justifyContent={{ xs: 'center', md: 'flex-start' }}
            >
              <Button
                variant="contained"
                size="large"
                startIcon={<PhotoCamera />}
                color="primary"
              >
                Try with Photo
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<CompareArrows />}
                color="primary"
              >
                Compare Products
              </Button>
            </Stack>
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mt: 2 }}
            >
              Available for iOS and Android
            </Typography>
          </Box>

          {/* Right side - Mock Image */}
          <Box
            sx={{
              flex: 1,
              display: 'flex',
              justifyContent: 'center',
              mt: { xs: 4, md: 0 },
            }}
          >
            <Box
              component="img"
              src="/placeholder-app-screenshot.png"
              alt="Revi App Screenshot"
              sx={{
                maxWidth: '100%',
                height: 'auto',
                maxHeight: 600,
                filter: 'drop-shadow(0px 4px 20px rgba(0, 0, 0, 0.1))',
                borderRadius: 4,
              }}
            />
          </Box>
        </Stack>
      </Container>
    </Box>
  );
};

export default Hero;
