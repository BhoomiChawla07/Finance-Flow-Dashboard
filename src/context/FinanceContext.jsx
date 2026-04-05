import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockTransactions } from '../data/mockData'

const FinanceContext = createContext()

export const useFinance = () => {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within FinanceProvider')
  }
  return context
}

export const FinanceProvider = ({ children }) => {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem('financialEntries')
    return saved ? JSON.parse(saved) : mockTransactions
  })
  const [accessLevel, setAccessLevel] = useState('owner')
  const [filterType, setFilterType] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('date-desc')
  const [dateRange, setDateRange] = useState('all')

  useEffect(() => {
    localStorage.setItem('financialEntries', JSON.stringify(entries))
  }, [entries])

  const revenueSum = entries
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const costSum = entries
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const netWorth = revenueSum - costSum
  const savingsPercentage = revenueSum > 0 ? (netWorth / revenueSum) * 100 : 0

  const createEntry = (entryData) => {
    if (accessLevel === 'guest') return
    const newEntry = {
      ...entryData,
      id: Date.now(),
      date: new Date().toISOString().split('T')[0],
    }
    setEntries([newEntry, ...entries])
  }

  const updateEntry = (id, updatedData) => {
    if (accessLevel === 'guest') return
    setEntries(entries.map(e => e.id === id ? { ...e, ...updatedData } : e))
  }

  const removeEntry = (id) => {
    if (accessLevel === 'guest') return
    setEntries(entries.filter(e => e.id !== id))
  }




  const getProcessedEntries = () => {
    let filtered = [...entries]

    // Type filtering
    if (filterType !== 'all') {
      filtered = filtered.filter(t => t.type === filterType)
    }

    // Search filtering
    if (searchQuery) {
      filtered = filtered.filter(t => 
        t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.note.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.amount.toString().includes(searchQuery)
      )
    }

    // Data Range Filtering
    const now = new Date()
    if (dateRange === 'week') {
      const weekAgo = new Date(now.setDate(now.getDate() - 7))
      filtered = filtered.filter(t => new Date(t.date) >= weekAgo)
    } else if (dateRange === 'month') {
      const monthAgo = new Date(now.setMonth(now.getMonth() - 1))
      filtered = filtered.filter(t => new Date(t.date) >= monthAgo)
    }

    // Sorting
    switch(sortBy) {
      case 'date-desc':
        filtered.sort((a, b) => new Date(b.date) - new Date(a.date))
        break
      case 'date-asc':
        filtered.sort((a, b) => new Date(a.date) - new Date(b.date))
        break
      case 'amount-desc':
        filtered.sort((a, b) => b.amount - a.amount)
        break
      case 'amount-asc':
        filtered.sort((a, b) => a.amount - b.amount)
        break
      default:
        break
    }

    return filtered
  }


  const getExpenseSummary = () => {
    const expenses = entries.filter(t => t.type === 'expense')
    const breakdown = {}
    expenses.forEach(expense => {
      breakdown[expense.category] = (breakdown[expense.category] || 0) + expense.amount
    })
    return breakdown
  }

  const getTrendData = () => {
    const monthly = {}
    entries.forEach(t => {
      const month = t.date.substring(0, 7)
      if (!monthly[month]) {
        monthly[month] = { income: 0, expense: 0, month }
      }
      if (t.type === 'income') {
        monthly[month].income += t.amount
      } else {
        monthly[month].expense += t.amount
      }
    })
    return Object.values(monthly).sort((a, b) => a.month.localeCompare(b.month))
  }

  const generateAnalytics = () => {
    const expenseSummary = getExpenseSummary()
    const highestCategory = Object.entries(expenseSummary)
      .sort((a, b) => b[1] - a[1])[0]
    
    const trendData = getTrendData()
    const lastTwoMonths = trendData.slice(-2)
    let monthlyComparison = null
    if (lastTwoMonths.length === 2 && lastTwoMonths[0].expense > 0) {
      const change = ((lastTwoMonths[1].expense - lastTwoMonths[0].expense) / lastTwoMonths[0].expense) * 100
      monthlyComparison = change
    }

    const avgEntry = entries.length > 0 
      ? entries.reduce((sum, t) => sum + t.amount, 0) / entries.length 
      : 0

    return {
      highestCategory: highestCategory ? { name: highestCategory[0], amount: highestCategory[1] } : null,
      monthlyComparison,
      savingsPercentage,
      totalEntries: entries.length,
      avgEntry,
      revenueSum,
      costSum,
    }
  }

  return (
    <FinanceContext.Provider value={{
      entries,
      revenueSum,
      costSum,
      netWorth,
      savingsPercentage,
      accessLevel,
      setAccessLevel,
      filterType,
      setFilterType,
      searchQuery,
      setSearchQuery,
      sortBy,
      setSortBy,
      dateRange,
      setDateRange,
      createEntry,
      updateEntry,
      removeEntry,
      getProcessedEntries,
      getExpenseSummary,
      getTrendData,
      generateAnalytics,
    }}>
      {children}
    </FinanceContext.Provider>
  )
}