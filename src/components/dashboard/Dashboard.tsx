// Theme personalization of MUI
import { ThemeProvider, createTheme, styled } from '@mui/material/styles'

// CSS & Drawer
import CssBaseline from '@mui/material/CssBaseline'
import MuiDrawer from '@mui/material/Drawer'

// Nav Bar
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'

// Grid & Box
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Divider from '@mui/material/Divider'
import List from '@mui/material/List'

// Icons
import { ChevronLeft, Logout, Menu, Notifications } from '@mui/icons-material'
import Badge from '@mui/material/Badge'
import IconButton from '@mui/material/IconButton'

// List for menu
import { ReactNode, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MenuItems } from './MenuItems'

// Width for Drawer Menu
const drawerWidth: number = 240

// Props form AppBar
interface AppBarProps extends MuiAppBarProps {
  open?: boolean
}

// App Bar
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => (
  {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      })
    })
  }
))

// Drawer Menu
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: prop => prop !== 'open'
})(({ theme, open }) => (
  {
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen
        }),
        width: theme.spacing(7),
        // Breakpoint to Media Queries of CSS in different display sizes
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9)
        }
      })
    }
  }
))

// Define Theme
const myTheme = createTheme()

interface IDashboard {
  children: ReactNode
}

// Dashboard content
// TODO: Refactor with Navigation Components
export const Dashboard = ({ children }: IDashboard) => {
  const [open, setOpen] = useState(true)
  const toogleDrawer = () => setOpen(!open)
  const navigate = useNavigate()

  return (
    <ThemeProvider theme={myTheme}>
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position='absolute' open={open}>
          <Toolbar sx={{ pr: '24px' }}>
            <IconButton
              edge='start'
              color='inherit'
              aria-label='open drawer'
              onClick={toogleDrawer}
              sx={{
                marginRight: '36px',
                ...(open && {
                  display: 'none'
                })
              }}>
                <Menu />
            </IconButton>

            <Typography
              component='h1'
              variant='h6'
              textAlign='center'
              color='inherit'
              noWrap
              sx={{ flexGrow: 1 }}>
              Code Verification Katas
            </Typography>

            <IconButton color='inherit'>
              <Badge badgeContent={10} color='secondary'>
                <Notifications />
              </Badge>
            </IconButton>

            <IconButton
              color='inherit'
              onClick={async () => {
                await sessionStorage.removeItem('sessionToken')
                navigate('/login')
              }}>
              <Logout />
            </IconButton>
          </Toolbar>
        </AppBar>

        <Drawer variant='permanent' open={open}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: 1
            }}
          >
            <IconButton color='inherit' onClick={toogleDrawer}>
              <ChevronLeft />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component='nav'>
            <MenuItems />
          </List>
        </Drawer>

        <Box component='main' sx={{
          backgroundColor: theme => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto'
        }}>
          <Toolbar />
          <Container maxWidth='lg' sx={{
            mg: 4,
            mt: 4
          }}>
            {/* <Grid item xs={12} md={8} lg={9}>
              <Paper sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200
              }}>
                {children}
              </Paper>
            </Grid> */}
            {children}
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  )
}
