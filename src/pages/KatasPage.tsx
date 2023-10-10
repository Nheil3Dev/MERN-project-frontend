import { Box, Button, MenuItem, Pagination, Select, SelectChangeEvent, Stack, Typography } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { AxiosResponse } from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Dashboard } from '../components/dashboard/Dashboard'
import { Kata } from '../components/katas/Kata'
import { useSessionStorage } from '../hooks/useSessionStorage'
import { getAllKatas } from '../services/katasService'
import { IKata } from '../utils/types/Katas.type'

export default function KatasPage () {
  const navigate = useNavigate()
  const loggedIn = useSessionStorage('sessionToken')
  const [katas, setKatas] = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [limit, setLimit] = useState(1)

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setCurrentPage(value)
  }

  const handleChangeLimit = (event: SelectChangeEvent<string>) => {
    setLimit(Number(event.target.value))
  }

  useEffect(() => {
    if (!loggedIn) {
      navigate('/login')
    } else {
      getAllKatas(loggedIn, currentPage, limit)
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
  }, [loggedIn, navigate, currentPage, limit])
  return (
    <Dashboard>
      <Typography variant="h2" component="h2" textAlign='center' mb={4}>
        Katas
      </Typography>

      <Box mb={2} display='flex' alignItems='flex-start' justifyContent='space-between'>
        <Button variant="contained" href="/katas/add">
          Add new kata
        </Button>

          <Select
            displayEmpty
            value={String(limit)}
            onChange={handleChangeLimit}
            autoWidth
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value={1}>1</MenuItem>
            <MenuItem value={2}>2</MenuItem>
            <MenuItem value={4}>4</MenuItem>
          </Select>
      </Box>

        {
          katas.length > 0
            ? (
            <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
              {
                katas.map((kata: IKata) => (
                  <Grid xs={12} sm={4} md={4} key={kata._id}>
                    <Kata kata={kata} />
                  </Grid>
                ))
              }
          </Grid>)
            : <p>No hay katas de momento</p>
        }
        <Stack mt={4} spacing={2} alignItems='center'>
          <Pagination count={totalPages} page={currentPage} onChange={handleChangePage} color="primary" />
        </Stack>
    </Dashboard>
  )
}
