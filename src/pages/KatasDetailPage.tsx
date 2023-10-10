import { Box, Button, Paper } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Dashboard } from '../components/dashboard/Dashboard'
import { Editor } from '../components/editor/Editor'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { getKataById } from '../services/katasService'
import { IKata } from '../utils/types/Katas.type'

export default function KatasDetailPage () {
  const { id } = useParams<string>()
  const [kata, setKata] = useState<IKata>()
  const [showSolution, setShowSolution] = useState(false)

  const navigate = useNavigate()
  const loggedIn = useSessionStorage('sessionToken')
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    } else if (id) {
      getKataById(loggedIn, id)
        .then(res => {
          if (res.status === 200) {
            setKata(res.data)
          } else {
            navigate('/katas')
            throw new Error(`Error obtaining kata by id: ${JSON.stringify(res)}`)
          }
        })
        .catch(err => console.log(`[GET KATA BY ID ERROR]: ${err.message}`))
    }
  }, [loggedIn, id, navigate])
  return (
    <Dashboard>
      <Box mb={2}>
            <Button variant="contained" href="/katas">
              Go back
            </Button>
          </Box>
      <Paper
        square={false}
        sx={{
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 200
        }}>

        {
          kata
            ? (
            <div>
                <h3>{kata.name}</h3>
                <h4>{kata.description}</h4>
                <h5>Creator: {kata.creator}</h5>
                <p>Rating: {kata.stars}/5</p>
              </div>
              )
            : <p>Loading data...</p>
            }

        <button onClick={() => setShowSolution(!showSolution)}>
          {!showSolution ? 'Show Solution' : 'Hide Solution'}
        </button>

        { showSolution &&
            <Editor language='js'>
              {kata?.solution}
            </Editor> }
    </Paper>
    </Dashboard>
  )
}
