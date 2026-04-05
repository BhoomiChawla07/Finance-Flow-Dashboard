import React from 'react'
import { Box, CircularProgress, Typography } from '@mui/material'

const Loader = ({ message = 'Loading...' }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: 400,
      }}
    >
      <CircularProgress size={60} thickness={4} />
      <Typography variant="body2" color="textSecondary" sx={{ mt: 2 }}>
        {message}
      </Typography>
    </Box>
  )
}

export default Spinner
