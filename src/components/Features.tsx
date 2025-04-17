import { Container, Typography, Paper, Box, Grid } from '@mui/material';
import {
  PhotoCamera,
  Search,
  Compare,
  Speed,
  Storage,
  Psychology,
} from '@mui/icons-material';

const features = [
  {
    icon: <PhotoCamera sx={{ fontSize: 40 }} color="primary" />,
    title: 'Snap & Analyze',
    description: 'Take a photo of any product and get instant reviews and analysis',
  },
  {
    icon: <Search sx={{ fontSize: 40 }} color="primary" />,
    title: 'Smart Search',
    description: 'Find products through text queries powered by advanced AI',
  },
  {
    icon: <Compare sx={{ fontSize: 40 }} color="primary" />,
    title: 'Quick Comparisons',
    description: 'Compare similar products side by side to make the best choice',
  },
  {
    icon: <Speed sx={{ fontSize: 40 }} color="primary" />,
    title: 'Instant Results',
    description: 'Get comprehensive product information in seconds',
  },
  {
    icon: <Storage sx={{ fontSize: 40 }} color="primary" />,
    title: 'Vector Search',
    description: 'Advanced search technology for accurate product matching',
  },
  {
    icon: <Psychology sx={{ fontSize: 40 }} color="primary" />,
    title: 'AI-Powered Analysis',
    description: 'Intelligent analysis of reviews and product information',
  },
];

const Features = () => {
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
            Powerful Features
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Everything you need to make informed shopping decisions
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid key={index} size={{xs: 12, sm: 6, md: 4}}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  backgroundColor: 'background.default',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                  },
                }}
              >
                <Box sx={{ mb: 2 }}>{feature.icon}</Box>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
