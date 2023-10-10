import { Paper } from '@mui/material'
import { Dashboard } from '../components/dashboard/Dashboard'
import { KataForm } from '../components/forms/KataMaterialForm'

export default function KataAddPage () {
  return (
    <Dashboard>
      <Paper
        square={false}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 200
        }}>
        <KataForm />
      </Paper>
    </Dashboard>
  )
}
