import { Container, Typography, Button, Box, Paper } from '@mui/material';
import { GetApp } from '@mui/icons-material';

const CTA = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
      <Container maxWidth="md">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 4, md: 8 },
            textAlign: 'center',
            background: 'linear-gradient(135deg, rgba(37,99,235,0.1) 0%, rgba(16,185,129,0.1) 100%)',
            borderRadius: 4,
          }}
        >
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Ready to Shop Smarter?
          </Typography>
          <Typography
            variant="h5"
            color="text.secondary"
            sx={{ mb: 4, maxWidth: 600, mx: 'auto' }}
          >
            Download Revi now and experience the power of AI-driven product analysis
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<GetApp />}
            sx={{
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
              '&:hover': {
                background: 'linear-gradient(90deg, #1e40af 0%, #059669 100%)',
              },
            }}
          >
            Download Now
          </Button>
        </Paper>
      </Container>
    </Box>
  );
};

export default CTA;
