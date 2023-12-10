import { useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { 
    Grid,
    Paper,
    Typography,
    Divider,
    CardMedia,
    Chip,
    Stack } from '@mui/material'

//import no image
import noImage from '../../style/img/no-image.png'

// import context
import { PublicContext } from '../../context/publicContext'
import { AuthContext } from '../../context/authContext'

//import format
import { formatTanggalWaktu } from "../../utility/format"

const DetailGame = () => {
    const { authAction } = useContext(AuthContext)
    const { cekLogin } = authAction
    const { selectedPublicGame, action } = useContext(PublicContext)
	const { selectPublicDataGame } = action
    const { id } = useParams()

    useEffect(() => {
        selectPublicDataGame(id)
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

    return (
        selectedPublicGame !== undefined ? (
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
                    image={selectedPublicGame.image !== undefined && selectedPublicGame.image !== null && selectedPublicGame.image !== '' && selectedPublicGame.image.indexOf('http') !== -1 ? selectedPublicGame.image : noImage}
                />
                </Grid>
                <Divider orientation="vertical" flexItem sx={{ marginLeft: '10px' }} />
                <Grid item xs={12} sm container>
                    <Grid item xs container direction="column" spacing={2}>
                        <Grid item xs>
                            <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'left'}}>
                                {selectedPublicGame.name !== undefined && selectedPublicGame.name !== null && selectedPublicGame.name !== '' ? selectedPublicGame.name : 'No Title'}
                            </Typography>
                            <Typography gutterBottom variant="body1" component="div" sx={{ textAlign: 'left', marginBottom: '10px' }}>
                                {selectedPublicGame.release !== undefined && selectedPublicGame.release !== null && selectedPublicGame.release !== '' ? selectedPublicGame.release : 0}
                            </Typography>
                            <Divider sx={{ marginBottom: '10px' }} />
                            <Grid item xs container>
                                <Grid item xs container direction="column" spacing={2}>
                                    <Grid item>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                            Platform
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                            Genre
                                        </Typography>
                                        <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                            Type
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid item>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                        {selectedPublicGame.platform !== undefined && selectedPublicGame.platform !== null && selectedPublicGame.platform !== '' ? selectedPublicGame.platform : '-'}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                        {selectedPublicGame.genre !== undefined && selectedPublicGame.genre !== null && selectedPublicGame.genre !== '' ? genre(selectedPublicGame.genre) : '-'}
                                    </Typography>
                                    <Typography gutterBottom variant="subtitle1" component="div" sx={{ textAlign: 'left' }}>
                                        {selectedPublicGame.singlePlayer !== undefined && selectedPublicGame.singlePlayer !== null && selectedPublicGame.singlePlayer !== '' && selectedPublicGame.multiplayer !== undefined && selectedPublicGame.multiplayer !== null && selectedPublicGame.multiplayer !== '' ? gameType(selectedPublicGame.singlePlayer, selectedPublicGame.multiplayer) : '-'}
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Divider sx={{ marginLeft: '15px' }} />
                        <Grid item>
                            <Typography sx={{ textAlign: 'justify' }} variant="body2">
                                Update : <Chip label={selectedPublicGame.updated !== undefined && selectedPublicGame.updated !== null && selectedPublicGame.updated !== '' ? formatTanggalWaktu(selectedPublicGame.updated) : '-'} color="primary" variant="outlined" />
                            </Typography>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Paper>
        ) : null
    )
}

export default DetailGame