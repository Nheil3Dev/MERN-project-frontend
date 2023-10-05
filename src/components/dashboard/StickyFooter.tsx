import { Box, Container, CssBaseline } from '@mui/material'
import { CopyRight } from './CopyRight'

export function StickyFooter () {
  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column'
    }}>
      <CssBaseline />
      <Box component='footer' sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) => theme.palette.mode === 'light' ? theme.palette.grey[200] : theme.palette.grey[800]
      }}>
        <Container>
          <CopyRight sx={{
            pt: 4
          }} />
        </Container>
      </Box>
    </Box>
  )
}
