import { Container, Typography, Grid, Box, Card, CardContent } from '@mui/material';
import {
  AccessTime,
  TrendingUp,
  Security,
  Insights,
} from '@mui/icons-material';

const benefits = [
  {
    icon: <AccessTime sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Save Time',
    description: 'Get instant product insights instead of spending hours reading reviews',
  },
  {
    icon: <TrendingUp sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Make Better Decisions',
    description: 'Compare products and understand their pros and cons in seconds',
  },
  {
    icon: <Security sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Shop with Confidence',
    description: 'Access reliable, AI-analyzed information from multiple sources',
  },
  {
    icon: <Insights sx={{ fontSize: 48, color: 'primary.main' }} />,
    title: 'Stay Informed',
    description: 'Get comprehensive product information while shopping in physical stores',
  },
];

const Benefits = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, bgcolor: 'background.paper' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            gutterBottom
            sx={{
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #2563eb 0%, #10b981 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Why Choose Revi
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Transform your shopping experience with smart product analysis
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {benefits.map((benefit, index) => (
            <Grid key={index} size={{xs:12, sm: 6}}>
              <Card
                elevation={0}
                sx={{
                  height: '100%',
                  bgcolor: 'background.default',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4 }}>
                  <Box sx={{ mb: 2 }}>
                    {benefit.icon}
                  </Box>
                  <Typography variant="h5" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {benefit.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {benefit.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Benefits;
