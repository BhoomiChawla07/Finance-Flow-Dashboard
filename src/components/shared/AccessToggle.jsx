
import {
  ToggleButton,
  ToggleButtonGroup,
  Box,
  Typography,
  Tooltip,
} from '@mui/material'
import { AdminPanelSettings, Visibility } from '@mui/icons-material'
import { useFinance } from '../../context/FinanceContext.jsx'

const AccessToggle = () => {
  const { accessLevel, setAccessLevel } = useFinance()

  const handleAccessChange = (event, newAccess) => {
    if (newAccess !== null) {
      setAccessLevel(newAccess)
    }
  }

  return (
    <Box>
  <ToggleButtonGroup
    value={accessLevel}
    exclusive
    onChange={handleAccessChange}
        sx={{
          width: '100%',
'& .MuiToggleButton-root': {
            color: 'white',
            '&.Mui-selected': {
              color: 'white',
            },
              '&:hover': {
                backgroundColor: accessLevel === 'owner' ? 'rgba(16,185,129,0.4)' : 'rgba(59,130,246,0.4)',
              },
            '&:hover': {
              backgroundColor: 'rgba(255,255,255,0.1)',
            },
          },
        }}
      >
        <Tooltip title="Owner - Full access">
          <ToggleButton value="owner" sx={{ flex: 1, gap: 1 }}>
            <AdminPanelSettings fontSize="small" />
            Owner
          </ToggleButton>
        </Tooltip>
        <Tooltip title="Guest - Read only">
          <ToggleButton value="guest" sx={{ flex: 1, gap: 1 }}>
            <Visibility fontSize="small" />
            Guest
          </ToggleButton>
        </Tooltip>
      </ToggleButtonGroup>
    </Box>
  )
}

export default AccessToggle
