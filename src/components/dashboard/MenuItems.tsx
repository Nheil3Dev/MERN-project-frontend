import {
  Dashboard,
  EmojiEvents,
  Home,
  People
} from '@mui/icons-material'
import { Link, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

export function MenuItems () {
  return (
    <>
    <Link href='/' underline='none' color='inherit'>
        <ListItemButton>
          <ListItemIcon>
            <Home />
          </ListItemIcon>
          <ListItemText primary="Home" />
        </ListItemButton>
      </Link>
      <Link href='/katas' underline='none' color='inherit'>
        <ListItemButton>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Katas" />
        </ListItemButton>
      </Link>
      <ListItemButton>
        <ListItemIcon>
          <People />
        </ListItemIcon>
        <ListItemText primary="Users" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <EmojiEvents />
        </ListItemIcon>
        <ListItemText primary="Ranking" />
      </ListItemButton>
    </>
  )
}
