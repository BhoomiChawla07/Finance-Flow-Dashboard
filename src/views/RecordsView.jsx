import React from 'react'
import { Box, Typography } from '@mui/material'
import EntryFilters from '../components/entries/EntryFilters.jsx'
import EntryList from '../components/entries/EntryList.jsx'

const RecordsView = () => {
  return (
    <Box>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
        Entry Management
      </Typography>
      <EntryFilters />
      <EntryList />
    </Box>
  )
}

export default RecordsView
