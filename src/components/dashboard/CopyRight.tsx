import { Link, Typography } from '@mui/material'

export function CopyRight (props: any) {
  return (
    <Typography variant="body2" color='text.secondary' align="center" {...props}>
      {'CopyRight © '}
      <Link color='inherit' href='https://github.com/Nheil3Dev/MERN-project-frontend'>
        Nheil3Dev's Repo
      </Link>
      {' '}
      {new Date().getFullYear()}
    </Typography>
  )
}
