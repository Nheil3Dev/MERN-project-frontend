import { AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dashboard } from '../components/dashboard/Dashboard'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { getAllKatas } from '../services/katasService'
import { IKata } from '../utils/types/Katas.type'

export default function KatasPage () {
  const navigate = useNavigate()
  const navigateToKataDetail = (id: string) => {
    navigate(`/katas/${id}`)
  }
  const loggedIn = useSessionStorage('sessionToken')
  const [katas, setKatas] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    } else {
      getAllKatas(loggedIn)
        .then((res: AxiosResponse) => {
          if (res.status === 200) {
            const { katas, totalPages, currentPage } = res.data
            setKatas(katas)
            setTotalPages(totalPages)
            setCurrentPage(currentPage)
          } else {
            throw new Error(`Error obtaining katas: ${JSON.stringify(res)}`)
          }
        })
        .catch(err => console.log(`[GET ALL KATAS ERROR]: ${err.message}`))
    }
  }, [loggedIn, navigate])
  return (
    <Dashboard>
      <h1>Katas</h1>
        {
          katas.length > 0
            ? (
            <ul>
              {
                katas.map((kata: IKata) => (
                  <li key={kata._id}>
                    <h3 onClick={() => navigateToKataDetail(kata._id)}>{kata.name}</h3>
                    <h4>{kata.description}</h4>
                    <h5>Creator: {kata.creator}</h5>
                    <p>Rating: {kata.stars}/5</p>
                  </li>
                ))
              }
          </ul>)
            : <p>No hay katas de momento</p>
        }
    </Dashboard>
  )
}
