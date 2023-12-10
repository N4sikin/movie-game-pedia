import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { 
    Grid,
    Paper,
    Typography,
    Divider,
    CardMedia,
    Box,
    Button,
    Rating,
    Chip,
    Stack } from '@mui/material'

//import no image
import noImage from '../../style/img/no-image.png'

// import context
import { PublicContext } from '../../context/publicContext'
import { AuthContext } from '../../context/authContext'

//import format
import { formatTanggalWaktu } from "../../utility/format"

const DetailMovie = () => {
    const { authAction } = useContext(AuthContext)
    const { cekLogin } = authAction
    const { selectedPublicMovie, action } = useContext(PublicContext)
	const { selectPublicDataMovie } = action
    const { id } = useParams()

    useEffect(() => {
        selectPublicDataMovie(id)
        cekLogin()
    },[])
    
    const genre = (data) => {
        const tmpData = []
        data.split(',').map((item, i) => {
            return tmpData.push(
                <Chip key={i} label={item} color="primary" variant="outlined" />
            )
        })
        return (
            <Stack direction='row' spacing={1}>
                {tmpData}
            </Stack>
        )
    }

    return (
        selectedPublicMovie !== undefined ? (
            <Paper
            elevation={3}
            sx={{
                p: 2,
                margin: 'auto',
                width: '90%',
                backgroundColor: '#fff',
            }}
            >
            <Grid container spacing={2}>
                <Grid item>
                    <CardMedia
                    component="img"
                    alt="Image Game"
                    height="200"
                    image={selectedPublicMovie.image !== undefined && selectedPublicMovie.image !== null && selectedPublicMovie.image !== '' && selectedPublicMovie.image.indexOf('http') !== -1 ? selectedPublicMovie.image : noImage}
                />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ marginLeft: '10px' }} />
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'left'}}>
                                {selectedPublicMovie.title !== undefined && selectedPublicMovie.title !== null && selectedPublicMovie.title !== '' ? selectedPublicMovie.title : 'No Title'}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'left', marginBottom: '10px' }}>
                                {selectedPublicMovie.year !== undefined && selectedPublicMovie.year !== null && selectedPublicMovie.year !== '' ? selectedPublicMovie.year : 0}
                            </Typography>
                            <Divider sx={{ marginBottom: '10px' }} />
                            <Grid item xs container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                            Duration
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                            Genre
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                        {selectedPublicMovie.duration !== undefined && selectedPublicMovie.duration !== null && selectedPublicMovie.duration !== '' ? selectedPublicMovie.duration : 0} Minute
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                        {selectedPublicMovie.genre !== undefined && selectedPublicMovie.genre !== null && selectedPublicMovie.genre !== '' ? genre(selectedPublicMovie.genre) : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginLeft: '15px' }} />
                        <Grid item>
                            <Typography sx={{ textAlign: 'justify', marginBottom: '10px' }} variant="body2">
                                Update : <Chip label={selectedPublicMovie.updated !== undefined && selectedPublicMovie.updated !== null && selectedPublicMovie.updated !== '' ? formatTanggalWaktu(selectedPublicMovie.updated) : '-'} color="primary" variant="outlined" />
                            </Typography>
                            <Typography sx={{ textAlign: 'justify' }} variant="body2">
                                {selectedPublicMovie.description !== undefined && selectedPublicMovie.description !== null && selectedPublicMovie.description !== '' ? selectedPublicMovie.description : '-'}
                            </Typography>
                        </Grid>
                    </Grid>
                    <Grid item>
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center'
                            }}
                        >
                            <Button variant="outline" disabled sx={{ backgroundColor: 'rgba(0, 0, 0, 0.52)' }}>
                                <Rating name="half-rating-read" defaultValue={1} max={1} readOnly /> 
                                <Typography gutterBottom variant="subtitle1" sx={{ marginTop: '6px', marginLeft: '10px', color: '#fff', zIndex: '1' }}>({selectedPublicMovie.rating !== undefined && selectedPublicMovie.rating !== null && selectedPublicMovie.rating !== '' ? selectedPublicMovie.rating : 0}/10)</Typography>
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Grid>
            <Divider sx={{ marginTop: '20px', marginBottom: '15px' }} textAlign='left'>
                <Chip label="REVIEW" />
            </Divider>
            <Typography sx={{ textAlign: 'left' }} variant="body2">
                {selectedPublicMovie.review !== undefined && selectedPublicMovie.review !== null && selectedPublicMovie.review !== '' ? selectedPublicMovie.review : '-'}
            </Typography>
        </Paper>
        ) : null
    )
}

export default DetailMovie