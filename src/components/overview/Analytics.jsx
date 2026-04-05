import React from 'react'
import { Card, CardContent, Typography, Box, Chip, Grid, Alert, AlertTitle } from '@mui/material'
import {
  TrendingUp,
  TrendingDown,
  AttachMoney,
  LocalFireDepartment,
  EmojiEvents,
} from '@mui/icons-material'
import { motion } from 'framer-motion'
import { useFinance } from '../../context/FinanceContext.jsx'

const Analytics = () => {
  const { generateAnalytics, revenueSum, costSum, savingsPercentage } = useFinance()
  const insights = generateAnalytics() || {}
  const savingsRate = savingsPercentage || insights.savingsRate || 0

  const getMonthlyComparisonMessage = () => {
    if (!insights.monthlyComparison) return null
    if (insights.monthlyComparison > 0) {
      return {
        severity: 'warning',
        message: `You spent ${insights.monthlyComparison.toFixed(1)}% more this month compared to last month`,
        icon: <TrendingUp />,
      }
    } else if (insights.monthlyComparison < 0) {
      return {
        severity: 'success',
        message: `Great job! You spent ${Math.abs(insights.monthlyComparison).toFixed(1)}% less this month`,
        icon: <TrendingDown />,
      }
    }
    return null
  }

  const getSavingsMessage = () => {
    if (savingsRate >= 30) {
      return {
        severity: 'success',
        message: `Excellent! You're saving ${savingsRate.toFixed(1)}% of your income`,
        icon: <EmojiEvents />,
      }
    } else if (savingsRate >= 15) {
      return {
        severity: 'info',
        message: `Good job! You're saving ${savingsRate.toFixed(1)}% of your income`,
        icon: <AttachMoney />,
      }
    } else {
      return {
        severity: 'warning',
        message: `Try to increase your savings rate (currently ${savingsRate.toFixed(1)}%)`,
        icon: <LocalFireDepartment />,
      }
    }
  }

  const monthlyComparison = getMonthlyComparisonMessage()
  const savingsMessage = getSavingsMessage()

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Smart Insights
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          AI-powered analysis of your finances
        </Typography>

        <Grid container spacing={2} sx={{ mt: 1 }}>
          {/* Highest Spending Category */}
          {insights.highestCategory && (
            <Grid item xs={12}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Alert severity="info" icon={<LocalFireDepartment />}>
                  <AlertTitle>Highest Spending Category</AlertTitle>
                  You've spent <strong>${insights.highestCategory.amount?.toFixed(2) || '0.00'}</strong> on{' '}
                  <strong>{insights.highestCategory.name}</strong>. Consider budgeting this category.
                </Alert>
              </motion.div>
            </Grid>
          )}

          {/* Monthly Comparison */}
          {monthlyComparison && (
            <Grid item xs={12}>
              <motion.div whileHover={{ scale: 1.02 }}>
                <Alert severity={monthlyComparison.severity} icon={monthlyComparison.icon}>
                  <AlertTitle>Monthly Comparison</AlertTitle>
                  {monthlyComparison.message}
                </Alert>
              </motion.div>
            </Grid>
          )}

          {/* Savings Rate */}
          <Grid item xs={12}>
            <motion.div whileHover={{ scale: 1.02 }}>
              <Alert severity={savingsMessage.severity} icon={savingsMessage.icon}>
                <AlertTitle>Savings Rate</AlertTitle>
                {savingsMessage.message}
              </Alert>
            </motion.div>
          </Grid>

          {/* Quick Stats */}
          <Grid item xs={12}>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mt: 2 }}>
              <Chip
                label={`${insights.totalTransactions || 0} Total Entries`}
                color="primary"
                variant="outlined"
              />
              <Chip
                label={`Avg: $${(insights.avgTransaction || 0).toFixed(2)} per entry`}
                color="secondary"
                variant="outlined"
              />
              <Chip
                label={`Income/Expense Ratio: ${((revenueSum / (costSum || 1)) || 0).toFixed(1)}x`}
                color="info"
                variant="outlined"
              />
            </Box>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

export default Analytics
