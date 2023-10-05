import {
  Dashboard,
  EmojiEvents,
  People
} from '@mui/icons-material'
import { ListItemButton, ListItemIcon, ListItemText } from '@mui/material'

export function MenuItems () {
  return (
    <>
      <ListItemButton>
        <ListItemIcon>
          <Dashboard />
        </ListItemIcon>
        <ListItemText primary="Katas" />
      </ListItemButton>

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
