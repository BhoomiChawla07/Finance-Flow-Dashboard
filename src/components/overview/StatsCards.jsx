import React from 'react'
import {
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Avatar,
  LinearProgress,
} from '@mui/material'
import { motion } from 'framer-motion'
import {
  AccountBalanceWallet,
  TrendingUp,
  TrendingDown,
  Savings,
} from '@mui/icons-material'
import { useFinance } from '../../context/FinanceContext.jsx'

const StatsCards = () => {
  const { netWorth, revenueSum, costSum, savingsPercentage } = useFinance()

  const cards = [
    {
      title: 'Net Worth',
      value: `$${netWorth.toFixed(2)}`,
      icon: <AccountBalanceWallet sx={{ fontSize: 32 }} />,
      color: '#6366f1',
      bgColor: '#eef2ff',
      progress: 75,
    },
    {
      title: 'Revenue',
      value: `$${revenueSum.toFixed(2)}`,
      icon: <TrendingUp sx={{ fontSize: 32 }} />,
      color: '#10b981',
      bgColor: '#d1fae5',
      progress: 65,
    },
    {
      title: 'Costs',
      value: `$${costSum.toFixed(2)}`,
      icon: <TrendingDown sx={{ fontSize: 32 }} />,
      color: '#ef4444',
      bgColor: '#fee2e2',
      progress: 45,
    },
    {
      title: 'Savings Rate',
      value: `${savingsPercentage.toFixed(1)}%`,
      icon: <Savings sx={{ fontSize: 32 }} />,
      color: '#f59e0b',
      bgColor: '#fed7aa',
      progress: savingsPercentage,
    },
  ]

  return (
    <Grid container spacing={3} sx={{ mb: 4 }}>
      {cards.map((card, index) => (
        <Grid item xs={12} sm={6} md={3} key={index}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                  <Typography variant="body2" color="textSecondary">
                    {card.title}
                  </Typography>
                  <Avatar sx={{ bgcolor: card.bgColor, color: card.color }}>
                    {card.icon}
                  </Avatar>
                </Box>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 1 }}>
                  {card.value}
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={card.progress}
                  sx={{
                    height: 6,
                    borderRadius: 3,
                    bgcolor: '#e5e7eb',
                    '& .MuiLinearProgress-bar': {
                      bgcolor: card.color,
                      borderRadius: 3,
                    },
                  }}
                />
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  )
}

export default StatsCards
