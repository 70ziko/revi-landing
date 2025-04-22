import { VolunteerActivism } from '@mui/icons-material';
import { Container, Typography, Button, Box, Stack, TextField, Divider } from '@mui/material';
import { useState } from 'react';

const Hero = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/waitlist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      setSubmitted(true);
    } catch (err) {
      console.error('Waitlist submission failed', err);
    }
  };

  return (
    <Box
      sx={{
        background: 'linear-gradient(180deg, rgba(74, 139, 224, 0.3) 0%, rgb(27, 27, 27) 100%)',
        pt: { xs: 12, md: 24 },
        pb: { xs: 8, md: 12 },
        pl: { xs: 2, sm: 12 },
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
                background: 'linear-gradient(90deg,rgb(47, 64, 215) 0%, #10b981 100%)',
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
              {!submitted ? (
                <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    required
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    sx={{ flex: 1 }}
                  />
                  <Button type="submit" variant="contained" size="large" color="primary">
                    Join Waitlist
                  </Button>
                </Box>
              ) : (
                <Typography variant="body1" color="success.main" sx={{ fontWeight: 'bold', mt: 2 }}>
                  Thank you for joining the waitlist! We will notify you when we launch.
                </Typography>
              )}
              {/* horizontal rule on mobile */}
              <Divider
                orientation="horizontal"
                flexItem
                sx={{ display: { xs: 'block', sm: 'none' }, my: 2, borderColor: 'divider' }}
              />
              {/* vertical rule on desktop */}
              <Divider
                orientation="vertical"
                flexItem
                sx={{ display: { xs: 'none', sm: 'block' }, mx: 2, borderColor: 'divider' }}
              />
                <Button
                variant="outlined"
                size="large"
                href="https://patreon.com/your-project"
                target="_blank"
                rel="noopener noreferrer"
                color="primary"
                sx={{
                  backgroundColor: 'white',
                  color: 'primary.main',
                  textAlign: 'center',
                  fontWeight: 'bold',
                  borderColor: 'primary.main',
                  '&:hover': {
                  backgroundColor: 'primary.main',
                  color: 'white',
                  },
                }}
                // Note: There isn't a standard MUI icon for Patreon.
                // Using VolunteerActivism as a placeholder for "support".
                // Consider using an SVG icon component for the actual Patreon logo if needed.
                endIcon={<VolunteerActivism />}
                // endIcon={<ArrowForward />}
                >
                Back the Project
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
              src="/revi-app-screenshot.jpg"
              alt="Revi App Screenshot"
              sx={{
                maskImage: 'linear-gradient(to bottom, black 69%, transparent 100%)',
                WebkitMaskImage: 'linear-gradient(to bottom, black 69%, transparent 100%)', // For Safari compatibility
                maxWidth: '100%',
                height: 'auto',
                // marginTop: 2,
                paddingTop: 2,
                maxHeight: 700,
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
