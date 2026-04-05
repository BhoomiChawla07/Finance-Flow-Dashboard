import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Box,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar,
} from '@mui/material'
import {
  Edit,
  Delete,
  Add,
  Download,
  Restaurant,
  DirectionsCar,
  ShoppingBag,
  Bolt,
  Movie,
  ShoppingBag as ShoppingBagIcon,
} from '@mui/icons-material'
import { motion, AnimatePresence } from 'framer-motion'
import { useFinance } from '../../context/FinanceContext.jsx'

const categoryIcons = {
  Food: <Restaurant fontSize="small" />,
  Transport: <DirectionsCar fontSize="small" />,
  Shopping: <ShoppingBag fontSize="small" />,
  Bills: <Bolt fontSize="small" />,
  Entertainment: <Movie fontSize="small" />,
}

const EntryList = () => {
  const {
    getProcessedEntries,
    accessLevel,
    createEntry,
    updateEntry,
  removeEntry,
  } = useFinance()

  const [openDialog, setOpenDialog] = useState(false)
  const [editingEntry, setEditingEntry] = useState(null)
  const [formData, setFormData] = useState({
    amount: '',
    category: 'Food',
    type: 'expense',
    note: '',
  })
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' })

  const entries = getProcessedEntries()

  const handleOpenDialog = (entry = null) => {
    if (accessLevel === 'guest') {
      setSnackbar({ open: true, message: 'Guests cannot add or edit entries', severity: 'warning' })
      return
    }
    if (entry) {
      setEditingEntry(entry)
      setFormData({
        amount: entry.amount.toString(),
        category: entry.category,
        type: entry.type,
        note: entry.note,
      })
    } else {
      setEditingEntry(null)
      setFormData({
        amount: '',
        category: 'Food',
        type: 'expense',
        note: '',
      })
    }
    setOpenDialog(true)
  }

  const handleCloseDialog = () => {
    setOpenDialog(false)
    setEditingEntry(null)
  }

  const handleSubmit = () => {
    if (!formData.amount || !formData.note) {
      setSnackbar({ open: true, message: 'Please fill all fields', severity: 'error' })
      return
    }

    if (editingEntry) {
      updateEntry(editingEntry.id, {
        ...formData,
        amount: parseFloat(formData.amount),
      })
      setSnackbar({ open: true, message: 'Entry updated successfully', severity: 'success' })
    } else {
      createEntry({
        ...formData,
        amount: parseFloat(formData.amount),
      })
      setSnackbar({ open: true, message: 'Entry added successfully', severity: 'success' })
    }
    handleCloseDialog()
  }

  const handleDelete = (id) => {
    if (accessLevel === 'guest') {
      setSnackbar({ open: true, message: 'Guests cannot delete entries', severity: 'warning' })
      return
    }
    if (window.confirm('Are you sure you want to delete this entry?')) {
      removeEntry(id)
      setSnackbar({ open: true, message: 'Entry deleted successfully', severity: 'success' })
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Category', 'Type', 'Amount', 'Note']
    const csvData = entries.map(e => [
      e.date, e.category, e.type, e.amount, e.note
    ])
    const csvContent = [headers, ...csvData].map(row => row.join(',')).join('\\n')
    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `entries_${new Date().toISOString().split('T')[0]}.csv`
    a.click()
    URL.revokeObjectURL(url)
    setSnackbar({ open: true, message: 'Export successful!', severity: 'success' })
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Showing {entries.length} entries
        </Typography>
        <Box>
          <Button
            startIcon={<Download />}
            onClick={exportToCSV}
            size="small"
            sx={{ mr: 1 }}
          >
            Export CSV
          </Button>
          {accessLevel === 'owner' && (
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => handleOpenDialog()}
              size="small"
            >
              Add Entry
            </Button>
          )}
        </Box>
      </Box>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Note</TableCell>
              <TableCell align="right">Amount</TableCell>
              <TableCell align="center">Type</TableCell>
              {accessLevel === 'owner' && <TableCell align="center">Actions</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            <AnimatePresence>
              {entries.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={accessLevel === 'owner' ? 6 : 5} align="center">
                    <Box sx={{ py: 8 }}>
                      <Typography variant="body1" color="textSecondary">
                        No entries found
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Try adjusting your filters or add a new entry
                      </Typography>
                    </Box>
                  </TableCell>
                </TableRow>
              ) : (
                entries.map((entry, index) => (
                  <TableRow
                    key={entry.id}
                    component={motion.tr}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ delay: index * 0.05 }}
                    sx={{ '&:hover': { bgcolor: 'action.hover' } }}
                  >
                    <TableCell>{entry.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        {categoryIcons[entry.category] || <ShoppingBagIcon fontSize="small" />}
                        {entry.category}
                      </Box>
                    </TableCell>
                    <TableCell>{entry.note}</TableCell>
                    <TableCell align="right" sx={{ fontWeight: 600 }}>
                      ${entry.amount.toFixed(2)}
                    </TableCell>
                    <TableCell align="center">
                      <Chip
                        label={entry.type}
                        size="small"
                        color={entry.type === 'income' ? 'success' : 'error'}
                        variant="outlined"
                      />
                    </TableCell>
                    {accessLevel === 'owner' && (
                      <TableCell align="center">
                        <IconButton
                          size="small"
                          onClick={() => handleOpenDialog(entry)}
                          color="primary"
                        >
                          <Edit fontSize="small" />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => handleDelete(entry.id)}
                          color="error"
                        >
                          <Delete fontSize="small" />
                        </IconButton>
                      </TableCell>
                    )}
                  </TableRow>
                ))
              )}
            </AnimatePresence>
          </TableBody>
        </Table>
      </TableContainer>

      {/* Add/Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingEntry ? 'Edit Entry' : 'Add New Entry'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <FormControl fullWidth>
              <InputLabel>Type</InputLabel>
              <Select
                value={formData.type}
                label="Type"
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
              >
                <MenuItem value="expense">Expense</MenuItem>
                <MenuItem value="income">Income</MenuItem>
              </Select>
            </FormControl>

            <FormControl fullWidth>
              <InputLabel>Category</InputLabel>
              <Select
                value={formData.category}
                label="Category"
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                <MenuItem value="Food">Food</MenuItem>
                <MenuItem value="Transport">Transport</MenuItem>
                <MenuItem value="Shopping">Shopping</MenuItem>
                <MenuItem value="Bills">Bills</MenuItem>
                <MenuItem value="Entertainment">Entertainment</MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Amount"
              type="number"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              fullWidth
            />

            <TextField
              label="Note"
              value={formData.note}
              onChange={(e) => setFormData({ ...formData, note: e.target.value })}
              fullWidth
              multiline
              rows={2}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editingEntry ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  )
}

export default EntryList
