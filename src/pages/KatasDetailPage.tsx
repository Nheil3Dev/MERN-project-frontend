import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'

export default function KatasDetailPage () {
  const { id } = useParams()
  const navigate = useNavigate()
  const loggedIn = useSessionStorage('sessionToken')
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])
  return (
    <>
      <h4>Katas Detail: {id}</h4>
    </>
  )
}
