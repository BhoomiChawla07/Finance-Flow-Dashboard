import React from 'react'
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  Divider,
  Chip,
  Avatar,
  Tooltip,
  IconButton,
} from '@mui/material'
import {
  Dashboard,
  Receipt,
  TrendingUp,
  ChevronLeft,
  ChevronRight,
  AccountBalanceWallet,
} from '@mui/icons-material'
import AccessToggle from '../shared/AccessToggle.jsx'
import { useFinance } from '../../context/FinanceContext.jsx'

const NavPanel = ({ currentPage, setCurrentPage, sidebarOpen, setSidebarOpen }) => {
  const { accessLevel } = useFinance()

  const menuItems = [
    { name: 'Overview', icon: <Dashboard />, value: 'overview' },
    { name: 'Entries', icon: <Receipt />, value: 'records' },
  ]

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sidebarOpen ? 280 : 80,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? 280 : 80,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          overflowX: 'hidden',
          background: 'linear-gradient(180deg, #1a1a2e 0%, #16213e 100%)',
          color: 'white',
          borderRight: 'none',
        },
      }}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {sidebarOpen ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: 'primary.main' }}>
              <AccountBalanceWallet />
            </Avatar>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>
              FinanceFlow
            </Typography>
          </Box>
        ) : (
          <Avatar sx={{ bgcolor: 'primary.main', mx: 'auto' }}>
            <AccountBalanceWallet />
          </Avatar>
        )}
        <IconButton onClick={() => setSidebarOpen(!sidebarOpen)} sx={{ color: 'white' }}>
          {sidebarOpen ? <ChevronLeft /> : <ChevronRight />}
        </IconButton>
      </Box>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.name} disablePadding sx={{ mb: 1 }}>
            <Tooltip title={!sidebarOpen ? item.name : ''} placement="right">
              <ListItemButton
                onClick={() => setCurrentPage(item.value)}
                sx={{
                  borderRadius: 2,
                  justifyContent: sidebarOpen ? 'initial' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  py: 1.5,
                  bgcolor: currentPage === item.value ? 'rgba(99,102,241,0.2)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    color: currentPage === item.value ? 'primary.main' : 'rgba(255,255,255,0.7)',
                    minWidth: sidebarOpen ? 40 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <ListItemText
                    primary={item.name}
                    sx={{
                      '& .MuiTypography-root': {
                        color: currentPage === item.value ? 'primary.main' : 'rgba(255,255,255,0.7)',
                        fontWeight: currentPage === item.value ? 600 : 400,
                      },
                    }}
                  />
                )}
              </ListItemButton>
            </Tooltip>
          </ListItem>
        ))}
      </List>

      <Divider sx={{ bgcolor: 'rgba(255,255,255,0.1)', my: 2 }} />

      <Box sx={{ mt: 'auto', p: 2 }}>
        {sidebarOpen ? (
          <>
            <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.5)', display: 'block', mb: 1 }}>
              Access Level
            </Typography>
            <AccessToggle />
            <Chip
              label={accessLevel === 'owner' ? '✏️ Owner Access' : '👀 Guest View'}
              size="small"
              sx={{
                mt: 2,
                width: '100%',
                bgcolor: accessLevel === 'owner' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)',
                color: 'white',
                border: `1px solid ${accessLevel === 'owner' ? 'rgba(16,185,129,0.5)' : 'rgba(59,130,246,0.5)'}`,
              }}
            />
          </>
        ) : (
          <Tooltip title={`Access: ${accessLevel === 'owner' ? 'Owner' : 'Guest'}`} placement="right">
            <Chip
              label={accessLevel === 'owner' ? 'O' : 'G'}
              size="small"
              sx={{
                width: '100%',
                bgcolor: accessLevel === 'owner' ? 'rgba(16,185,129,0.2)' : 'rgba(59,130,246,0.2)',
                color: 'white',
              }}
            />
          </Tooltip>
        )}
      </Box>
    </Drawer>
  )
}

export default NavPanel
