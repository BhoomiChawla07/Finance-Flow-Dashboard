import React from 'react'
import { Card, CardContent, Typography, Box } from '@mui/material'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { useFinance } from '../../context/FinanceContext.jsx'

const TrendChart = () => {
  const { getTrendData } = useFinance()
  const monthlyData = getTrendData()

  return (
    <Card>
      <CardContent>
<Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
          Money Trends
        </Typography>
        <Typography variant="body2" color="textSecondary" gutterBottom>
          Monthly income vs expenses comparison
        </Typography>
        <Box sx={{ height: 350, mt: 2 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="colorIncome" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorExpense" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8}/>
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area
                type="monotone"
                dataKey="income"
                stroke="#10b981"
                fillOpacity={1}
                fill="url(#colorIncome)"
                name="Income"
              />
              <Area
                type="monotone"
                dataKey="expense"
                stroke="#ef4444"
                fillOpacity={1}
                fill="url(#colorExpense)"
                name="Expenses"
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      </CardContent>
    </Card>
  )
}

export default TrendChart
