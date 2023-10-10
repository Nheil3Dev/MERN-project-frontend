import { Button, Card, CardActions, CardContent, Typography } from '@mui/material'
import { IKata } from '../../utils/types/Katas.type'

interface KataProps {
  kata: IKata
}

export function Kata ({ kata }: KataProps) {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {kata.level}
        </Typography>
        <Typography variant="h5" component="div">
          {kata.name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {kata.creator}
        </Typography>
        <Typography variant="body2">
          {kata.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" href={`katas/${kata._id}`}>DETAILS</Button>
      </CardActions>
    </Card>
  )
}
