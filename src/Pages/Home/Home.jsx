import React from 'react'
import { Card, Typography, Box } from '@mui/material'

function Home() {
  return (
    <Box 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      height="100vh" 
      bgcolor="#f0f0f0"
    >
      <Card 
        sx={{ 
          padding: 4, 
          maxWidth: 400, 
          textAlign: 'center', 
          boxShadow: 3 
        }}
      >
        <Typography 
          variant="h5" 
          component="div" 
          gutterBottom
          sx={{ 
            color: '#1976d2', 
            fontWeight: 'bold' 
          }}
        >
          Thank you for considering me
        </Typography>
        <Typography 
          variant="body1" 
          component="div"
          sx={{ 
            color: '#555' 
          }}
        >
          Website still under construction. Estimated time: 1 day
        </Typography>
      </Card>
    </Box>
  )
}

export default Home
