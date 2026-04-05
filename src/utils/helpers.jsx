export const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(amount)
}

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getCategoryColor = (category) => {
  const colors = {
    Food: '#10b981',
    Transport: '#3b82f6',
    Shopping: '#8b5cf6',
    Bills: '#f59e0b',
    Entertainment: '#ec4899',
  }
  return colors[category] || '#6366f1'
}

export const getCategoryIcon = (category) => {
  const icons = {
    Food: '🍔',
    Transport: '🚗',
    Shopping: '🛍️',
    Bills: '💡',
    Entertainment: '🎬',
  }
  return icons[category] || '💰'
}