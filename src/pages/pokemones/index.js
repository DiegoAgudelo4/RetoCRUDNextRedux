import React, { useState, useEffect } from 'react'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import CircularProgress from '@mui/material/CircularProgress'
import { useSelector, useDispatch } from 'react-redux'
import { Box } from '@mui/system'
import { obtenerPokemonesAccion, siguientePokemonAccion, anteriorPokemonAccion } from '../../features/reduxDucks/pokeDucks'

const Pokemones = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredPokemones, setFilteredPokemones] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [page, setPage] = useState(1)

  const dispatch = useDispatch()
  const PokemonesState = useSelector(state => state.pokemones)

  const getPokemones = async () => {
    try {
      dispatch(obtenerPokemonesAccion())
    } catch (error) {
      setError(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getPokemones()
  }, [])

  useEffect(() => {
    setFilteredPokemones(PokemonesState)
  }, [PokemonesState])

  const handleSearch = searchTerm => {
    const filtered = PokemonesState.filter(user => user.name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchTerm(searchTerm)
    setFilteredPokemones(filtered)
  }

  const handleClearSearch = () => {
    setFilteredPokemones(PokemonesState)
    setSearchTerm('')
  }

  const handleNextPage = () => {
    setPage(page + 1)
    dispatch(siguientePokemonAccion())
  }

  const handlePreviousPage = () => {
    setPage(page - 1)
    dispatch(anteriorPokemonAccion())
  }

  if (loading) {
    return <CircularProgress align='center' />
  }

  if (error) {
    return <Typography color='error'>Error fetching data: {error.message}</Typography>
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            label='Search'
            variant='outlined'
            value={searchTerm}
            onChange={e => handleSearch(e.target.value)}
            size='small'
            fullWidth
            margin="normal"
          />
          {searchTerm && (
            <IconButton onClick={handleClearSearch}>
              {/* Icono de limpiar búsqueda */}
              <svg xmlns='http://www.w3.org/2000/svg' height='24px' viewBox='0 0 24 24' width='24px' fill='#000000'>
                <path d='M0 0h24v24H0V0z' fill='none' />
                <path d='M18.3 5.71a.996.996 0 00-1.41 0L12 10.59 7.11 5.7a.996.996 0 10-1.41 1.41L10.59 12l-4.89 4.89a.996.996 0 101.41 1.41L12 13.41l4.89 4.89a.996.996 0 101.41-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.41z' />
              </svg>
            </IconButton>
          )}
        </Grid>

        {filteredPokemones && filteredPokemones.array.map(poke => (
          <Grid item xs={12} sm={6} md={4} key={poke.name}>

            <Card>
              <Box
                component="img"
                sx={{
                  height: 400,
                  width: 300,
                  maxHeight: { xs: 233, md: 250 },
                  maxWidth: { xs: 350, md: 400 },
                  margin: '0 auto', // Centra horizontalmente la imagen
                  display: 'block'
                }}
                alt={poke.name}
                src={`https://img.pokemondb.net/artwork/${poke.name}.jpg`}
              />

              <CardContent sx={{ textAlign: 'center' }}> {/* Centra el texto horizontalmente */}
                <Typography variant="h6" component="div">
                  {poke.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}

        <Grid item xs={12} display="flex" justifyContent="space-between" marginTop={2}>
          <Button variant="contained" onClick={handlePreviousPage} disabled={page === 0}>
            Anterior
          </Button>
          <Button variant="contained" onClick={handleNextPage}>
            Siguiente
          </Button>
        </Grid>
      </Grid>
    </>
  )
}

export default Pokemones
