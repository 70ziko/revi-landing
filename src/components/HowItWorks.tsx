import { Container, Typography, Box, Stepper, Step, StepLabel, StepContent } from '@mui/material';
import { CameraAlt, AutoAwesome, CheckCircle } from '@mui/icons-material';

const steps = [
  {
    label: 'Take a Photo or Search',
    description: 'Simply snap a photo of any product or type your query to get started',
    icon: <CameraAlt color="primary" />,
  },
  {
    label: 'AI Analysis',
    description: 'Our AI instantly processes the information and searches through thousands of reviews',
    icon: <AutoAwesome color="primary" />,
  },
  {
    label: 'Get Results',
    description: 'View comprehensive product analysis, reviews, and comparisons in seconds',
    icon: <CheckCircle color="primary" />,
  },
];

const HowItWorks = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 } }}>
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
            How It Works
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
            Get product insights in three simple steps
          </Typography>
        </Box>

        <Box sx={{ maxWidth: 600, mx: 'auto' }}>
          <Stepper orientation="vertical">
            {steps.map((step, index) => (
              <Step key={index} active={true}>
                <StepLabel
                  StepIconComponent={() => (
                    <Box sx={{ 
                      width: 40, 
                      height: 40, 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center',
                      borderRadius: '50%',
                      bgcolor: 'primary.light',
                      color: 'primary.main'
                    }}>
                      {step.icon}
                    </Box>
                  )}
                >
                  <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 1 }}>
                    {step.label}
                  </Typography>
                </StepLabel>
                <StepContent>
                  <Typography variant="body1" color="text.secondary">
                    {step.description}
                  </Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorks;
