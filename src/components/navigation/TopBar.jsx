import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Badge,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material'
import {
  NotificationsNone,
  Brightness4,
  Brightness7,
  Person,
  Settings,
  Logout,
} from '@mui/icons-material'
import { useFinance } from '../../context/FinanceContext.jsx'

const TopBar = ({ darkMode, setDarkMode, currentPage }) => {
  const { accessLevel } = useFinance()
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const getPageTitle = () => {
    switch(currentPage) {
      case 'overview': return 'Financial Overview'
      case 'records': return 'Entry Management'
      default: return 'Personal Finance'
    }
  }

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        backgroundColor: 'background.paper',
        borderBottom: '1px solid',
        borderColor: 'divider',
        color: 'text.primary',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Typography variant="h5" sx={{ fontWeight: 700 }}>
            {getPageTitle()}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            Welcome back! Here's your financial overview
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
            <IconButton onClick={() => setDarkMode(!darkMode)} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Notifications">
            <IconButton color="inherit">
              <Badge badgeContent={3} color="error">
                <NotificationsNone />
              </Badge>
            </IconButton>
          </Tooltip>

          <Box sx={{ ml: 2 }}>
            <Tooltip title="Account settings">
              <IconButton onClick={handleMenuOpen} size="small">
                <Avatar
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'primary.main',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  }}
                >
                  {accessLevel === 'owner' ? 'O' : 'G'}
                </Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleMenuClose}>
                <Person sx={{ mr: 1 }} /> Profile
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Settings sx={{ mr: 1 }} /> Settings
              </MenuItem>
              <MenuItem onClick={handleMenuClose}>
                <Logout sx={{ mr: 1 }} /> Logout
              </MenuItem>
            </Menu>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  )
}

export default TopBar
