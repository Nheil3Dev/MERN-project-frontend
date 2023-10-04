import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSessionStorage } from '../hooks/useSessionStorage'

export default function KatasPage () {
  const navigate = useNavigate()
  const navigateToKataDetail = (id: number) => {
    navigate(`/katas/${id}`)
  }
  const loggedIn = useSessionStorage('sessionToken')
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    }
  }, [loggedIn])
  return (
    <>
      <h4>Katas</h4>
      <h5 onClick={() => navigateToKataDetail(1)}>Kata 1</h5>
    </>
  )
}
