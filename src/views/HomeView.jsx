import React from 'react'
import { Grid, Box } from '@mui/material'
import StatsCards from '../components/overview/StatsCards.jsx'
import TrendChart from '../components/overview/TrendChart.jsx'
import SpendBreakdown from '../components/overview/SpendBreakdown.jsx'
import Analytics from '../components/overview/Analytics.jsx'

const HomeView = () => {
  return (
    <Box>
      <StatsCards />
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <TrendChart />
        </Grid>
        <Grid item xs={12} md={5}>
          <SpendBreakdown />
        </Grid>
        <Grid item xs={12}>
          <Analytics />
        </Grid>
      </Grid>
    </Box>
  )
}

export default HomeView
