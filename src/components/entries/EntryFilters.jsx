import React from 'react'
import {
  Paper,
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material'
import { Search, FilterList, Clear } from '@mui/icons-material'
import { useFinance } from '../../context/FinanceContext.jsx'

const EntryFilters = () => {
  const {
    filterType,
    setFilterType,
    searchQuery,
    setSearchQuery,
    sortBy,
    setSortBy,
    dateRange,
    setDateRange,
  } = useFinance()

  const handleClearFilters = () => {
    setFilterType('all')
    setSearchQuery('')
    setSortBy('date-desc')
    setDateRange('all')
  }

  return (
    <Paper sx={{ p: 2, mb: 3 }}>
      <Grid container spacing={2} alignItems="center">
        <Grid item xs={12} md={4}>
          <TextField
            fullWidth
            placeholder="Search by category, note, or amount..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: <Search sx={{ mr: 1, color: 'text.secondary' }} />,
            }}
            size="small"
          />
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Type</InputLabel>
            <Select
              value={filterType}
              label="Type"
              onChange={(e) => setFilterType(e.target.value)}
            >
              <MenuItem value="all">All</MenuItem>
              <MenuItem value="income">Income Only</MenuItem>
              <MenuItem value="expense">Expense Only</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={6} md={2}>
          <FormControl fullWidth size="small">
            <InputLabel>Sort By</InputLabel>
            <Select
              value={sortBy}
              label="Sort By"
              onChange={(e) => setSortBy(e.target.value)}
            >
              <MenuItem value="date-desc">Newest First</MenuItem>
              <MenuItem value="date-asc">Oldest First</MenuItem>
              <MenuItem value="amount-desc">Highest Amount</MenuItem>
              <MenuItem value="amount-asc">Lowest Amount</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12} md={3}>
          <ToggleButtonGroup
            value={dateRange}
            exclusive
            onChange={(e, value) => value && setDateRange(value)}
            size="small"
            sx={{ width: '100%' }}
          >
            <ToggleButton value="all" sx={{ flex: 1 }}>All</ToggleButton>
            <ToggleButton value="week" sx={{ flex: 1 }}>Week</ToggleButton>
            <ToggleButton value="month" sx={{ flex: 1 }}>Month</ToggleButton>
          </ToggleButtonGroup>
        </Grid>

        <Grid item xs={12} md={1}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleClearFilters}
            startIcon={<Clear />}
            size="small"
          >
            Clear
          </Button>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default EntryFilters
