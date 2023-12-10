import { useEffect, useContext, useState } from "react"
import { Link } from "react-router-dom"
import { 
    CardContent,
    CardMedia,
    Button,
    Typography,
    Grid,
    Rating,
    Box,
    Divider,
    Chip,
    Paper,
    Stack,
    Pagination } from "@mui/material"

// import context
import { PublicContext } from "../../context/publicContext"
import { AuthContext } from "../../context/authContext"

//import format
import { formatTanggalWaktu } from "../../utility/format"

//import no image
import noImage from '../../style/img/no-image.png'

const ListMovies = () => {
    const { authAction } = useContext(AuthContext)
    const { cekLogin } = authAction
    const { dataPublicMovies, action } = useContext(PublicContext)
	const { fetchPublicDataMovies } = action

    
    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {

    fetchPublicDataMovies()
    cekLogin()

  }, []) // eslint-disable-next-line

  const handlePagination = (event, value) => {
    setCurrentPage(value)
  }

  const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)
  const sortCompareDesc = key => (a, b) => {
    const fieldA = a[key]
    const fieldB = b[key]
  
    let comparison = 0
    if (fieldA < fieldB) {
      comparison = 1
    } else if (fieldA > fieldB) {
      comparison = -1
    }
    return comparison
  }

  const LoopingCardMovie = () => {
    const arrCard = []

    if (dataPublicMovies.length > 0) {
      const tmpData = []
      dataPublicMovies.map(item => {
        return tmpData.push(
          {
            id: item.id,
            title: item.title,
            description: item.description,
            year: item.year,
            duration: item.duration,
            genre: item.genre,
            rating: item.rating,
            image: item.image,
            created: item.created,
            updated: item.updated
          }
        )
      })
      const descData = tmpData.sort(sortCompareDesc('rating'))
      const top8 = paginateArray(descData, rowsPerPage, currentPage)
      top8.map(item => {
        return arrCard.push(
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <Link to={`/movies/detail/${item.id}`} className='link'>
            <Paper elevation={3} sx={{
              cursor: 'pointer',
              marginBottom: '15px',
              '&:hover': {
                backgroundColor: '#002984',
                opacity: [0.9, 0.8, 0.8],
                color: '#fff'
              },
            }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <Button variant="outline" disabled sx={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}>
                    <Rating name="half-rating-read" defaultValue={1} max={1} readOnly /> 
                    <Typography gutterBottom variant="subtitle1" sx={{ marginTop: '6px', marginLeft: '10px', color: '#fff', zIndex: '1' }}>({item.rating}/10)</Typography>
                  </Button>
                </Box>
              <CardMedia
                component="img"
                alt="Image Movie"
                height="200"
                image={item.image !== null && item.image !== '' && item.image.indexOf('http') !== -1 ? item.image : noImage}
                sx={{ marginTop: '-52px' }}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {item.title !== null && item.title !== '' ? item.title : 'No Data'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body1" gutterBottom>
                    {item.year !== null && item.year !== '' ? item.year : 0}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: '15px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                  {item.description !== null && item.description !== '' ? `${item.description.slice(0, 25)} ${item.description.length > 25 ? '...' : ''}` : 'No Description'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Duration : {item.duration !== null && item.duration !== '' ? item.duration : 0} Minute
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Genre : {item.genre !== null && item.genre !== '' ? `${item.genre.slice(0, 17)} ${item.genre.length > 17 ? '...' : ''}` : '-'}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: '15px', marginTop: '15px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Update : {formatTanggalWaktu(item.updated)}
                  </Typography>
                </Box>
              </CardContent>
            </Paper>
          </Link>
          </Grid>
        )
      })
    }
    return arrCard
  }

  return (
    <>
      <Divider sx={{ marginBottom: '20px' }}>
          <Chip label="POPULAR MOVIE" />
      </Divider>
      <Grid container spacing={2}>
        <LoopingCardMovie />
      </Grid>
      <Stack spacing={2} sx={{ width: '98%', margin: '20px auto' }}>
            <Pagination count={dataPublicMovies.length < 8 ? 1 : dataPublicMovies.length % 8 === 0 ? parseInt(dataPublicMovies.length / 8) : (parseInt(dataPublicMovies.length / 8) + 1)} page={currentPage} onChange={handlePagination} color="primary" sx={{ margin: '0 auto' }} />
        </Stack>
    </>
  )
}

export default ListMovies