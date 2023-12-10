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

const ListGames = () => {
    const { authAction } = useContext(AuthContext)
    const { cekLogin } = authAction
    const { dataPublicGames, action } = useContext(PublicContext)
	const { fetchPublicDataGames } = action

    const [currentPage, setCurrentPage] = useState(1)
    const [rowsPerPage, setRowsPerPage] = useState(8)

  useEffect(() => {

    fetchPublicDataGames()
    cekLogin()

  }, []) // eslint-disable-next-line

  const handlePagination = (event, value) => {
    setCurrentPage(value)
  }

  const paginateArray = (array, perPage, page) => array.slice((page - 1) * perPage, page * perPage)
  const gameType = (a, b) => {
    if (a === 1 && b === 1) {
        return 'Single & Multi Player'
    } else if (a === 1) {
        return 'Single Player'
    } else if (b === 1) {
        return 'Multi Player'
    } else {
        return '-'
    }
  }

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

  const LoopingCardGames = () => {
    const arrCard = []

    if (dataPublicGames.length > 0) {
      const tmpData = []
      dataPublicGames.map(item => {
        return tmpData.push(
          {
            id: item.id,
            name: item.name,
            genre: item.genre,
            singlePlayer: item.singlePlayer,
            multiplayer: item.multiplayer,
            platform: item.platform,
            release: item.release,
            image: item.image,
            created: item.created,
            updated: item.updated
          }
        )
      })
      const descData = tmpData.sort(sortCompareDesc('updated'))
      const top8 = paginateArray(descData, rowsPerPage, currentPage)
      top8.map(item => {
        return arrCard.push(
          <Grid item lg={3} md={4} sm={6} xs={12} key={item.id}>
            <Link to={`/games/detail/${item.id}`} className='link'>
            <Paper elevation={3} sx={{
              cursor: 'pointer',
              marginBottom: '15px',
              '&:hover': {
                backgroundColor: '#002984',
                opacity: [0.9, 0.8, 0.8],
                color: '#fff'
              },
            }}>
              <CardMedia
                component="img"
                alt="Image Game"
                height="200"
                image={item.image !== null && item.image !== '' && item.image.indexOf('http') !== -1 ? item.image : noImage}
              />
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="h6" gutterBottom component="div">
                    {item.name !== null && item.name !== '' ? item.name : 'No Name'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                  <Typography variant="body1" gutterBottom>
                    {item.release !== null && item.release !== '' ? item.release : 0}
                  </Typography>
                </Box>
                <Divider sx={{ marginBottom: '15px' }} />
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Genre : {item.genre !== null && item.genre !== '' ? `${item.genre.slice(0, 17)} ${item.genre.length > 17 ? '...' : ''}` : '-'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Platform : {item.platform !== null && item.platform !== '' ? item.platform : '-'}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'left' }}>
                  <Typography variant="body2" gutterBottom>
                    Type : {gameType(item.singlePlayer, item.multiplayer)}
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
          <Chip label="LATEST GAMES" />
      </Divider>
      <Grid container spacing={2}>
        <LoopingCardGames />
      </Grid>
      <Stack spacing={2} sx={{ width: '98%', margin: '20px auto' }}>
            <Pagination count={dataPublicGames.length < 8 ? 1 : dataPublicGames.length % 8 === 0 ? parseInt(dataPublicGames.length / 8) : (parseInt(dataPublicGames.length / 8) + 1)} page={currentPage} onChange={handlePagination} color="primary" sx={{ margin: '0 auto' }} />
        </Stack>
    </>
  )
}

export default ListGames