import React, { useState, useEffect } from 'react'
import { Box, CssBaseline } from '@mui/material'
import { motion, AnimatePresence } from 'framer-motion'
import TopBar from './components/navigation/TopBar.jsx'
import NavPanel from './components/navigation/NavPanel.jsx'
import HomeView from './views/HomeView.jsx'
import RecordsView from './views/RecordsView.jsx'
import { FinanceProvider } from './context/FinanceContext.jsx'

function App() {
  const [currentPage, setCurrentPage] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark-mode')
    } else {
      document.documentElement.classList.remove('dark-mode')
    }
  }, [darkMode])

  return (
    <FinanceProvider>
      <Box sx={{ display: 'flex', minHeight: '100vh' }}>
        <CssBaseline />
        <NavPanel 
  currentPage={currentPage} 
  setCurrentPage={setCurrentPage}
  sidebarOpen={sidebarOpen}
  setSidebarOpen={setSidebarOpen}
 />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            transition: 'margin 0.3s ease',
            marginLeft: sidebarOpen ? '280px' : '80px',
            width: sidebarOpen ? 'calc(100% - 280px)' : 'calc(100% - 80px)',
          }}
        >
          <TopBar 
  darkMode={darkMode} 
  setDarkMode={setDarkMode}
  currentPage={currentPage}
 />
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Box sx={{ p: 3 }}>
                {currentPage === 'overview' && <HomeView />}
                {currentPage === 'records' && <RecordsView />}
              </Box>
            </motion.div>
          </AnimatePresence>
        </Box>
      </Box>
    </FinanceProvider>
  )
}

export default App