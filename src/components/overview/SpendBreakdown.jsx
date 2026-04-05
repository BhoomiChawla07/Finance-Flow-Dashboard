import React from 'react'
import { Card, CardContent, Typography, Box, Avatar } from '@mui/material'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { useFinance } from '../../context/FinanceContext.jsx'

const COLORS = ['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#8b5cf6', '#ec4899', '#06b6d4']

const SpendBreakdown = () => {
  const { getExpenseSummary } = useFinance()
  const breakdown = getExpenseSummary()
  
  const pieData = Object.entries(breakdown).map(([name, value]) => ({
    name,
    value,
  }))

  return (
    <Card>
      <CardContent>
        <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Spending Breakdown
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Expenses by category
        </Typography>
        <Box sx={{ height: 350, mt: 2 }}>
          {pieData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
              <Typography color="textSecondary">No expense data available</Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  )
}

export default SpendBreakdown
