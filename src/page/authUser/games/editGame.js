import { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { 
    TextField, 
    CardContent,
    Typography,
    Paper, 
    Button,
    Alert,
    Box,
    IconButton,
    Collapse,
    FormControl,
    FormLabel,
    FormGroup,
    FormControlLabel,
    Checkbox,
    FormHelperText } from "@mui/material"
import { styled } from '@mui/material/styles'
import { purple } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close'

//import validation
import { urlFormat } from "../../../utility/format"

//import context
import { AuthContext } from "../../../context/authContext"
import { PublicContext } from "../../../context/publicContext"

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(purple[500]),
    backgroundColor: purple[500],
    '&:hover': {
      backgroundColor: purple[700],
    },
  }))

const EditGame = () => {
    const { errorUpdateGame, authAction } = useContext(AuthContext)
    const { cekLogin, updateGame } = authAction

    const { selectedPublicGame, setSelectedPublicGame, action} = useContext(PublicContext)
    const { selectPublicDataGame } = action

    const history = useHistory()
    const { id } = useParams()

    const [open, setOpen] = useState(false)

    const [errorName, setErrorName] = useState('')
    const [errorRelease, setErrorRelease] = useState('')
    const [errorGenre, setErrorGenre] = useState('')
    const [errorPlatform, setErrorPlatform] = useState('')
    const [errorType, setErrorType] = useState('')
    const [errorImage, setErrorImage] = useState('')

    useEffect(() => {
        selectPublicDataGame(id)
        cekLogin()
    },[])
    
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setSelectedPublicGame({ ...selectedPublicGame, [name]: value })
        if (name === 'name') {
            if (value === '') {
                setErrorName('Name is required')
            } else {
                setErrorName('')
            }
        } else if (name === 'release') {
            if (Number(value) > 2021 || Number(value) < 2000) {
                setErrorRelease('Release must be between 2000 to 2021')
            } else {
                setErrorRelease('')
            }
        } else if (name === 'genre') {
            if (value === '') {
                setErrorGenre('Genre is required')
            } else {
                setErrorGenre('')
            }
        } else if (name === 'platform') {
            if (value === ''){
                setErrorPlatform('Platform is required')
            } else {
                setErrorPlatform('')
            }
        } else if (name === 'image') {
            if (value !== '') {
                if (urlFormat(value) === false) {
                    setErrorImage('Image must be url')
                } else {
                    setErrorImage('')
                }
            } else {
                setErrorImage('Image is required')
            }
        }
    }

    const handleChangeCheck = (e) => {
        let name = e.target.name
        let check = e.target.checked === true ? 1 : 0
        setSelectedPublicGame({ ...selectedPublicGame, [name]: check})
        if (name === 'singlePlayer') {
            if (selectedPublicGame.multiplayer === false && check === false) {
                setErrorType('Type is required')
            } else {
                setErrorType('')
            }
        } else {
            if (selectedPublicGame.singlePlayer === false && check === false) {
                setErrorType('Type is required')
            } else {
                setErrorType('')
            }
        }
    }

    const handleAddGame = (e) => {
        e.preventDefault()
        setOpen(false)
        if (selectedPublicGame.singlePlayer === false && selectedPublicGame.multiplayer === false) {
            setErrorType('Type is required')
        }
        if (errorName === '' && errorRelease === '' && errorGenre === '' && errorPlatform === '' && errorType === '' && errorImage === '' && (selectedPublicGame.singlePlayer !== false || selectedPublicGame.multiplayer !== false)) {
            updateGame(selectedPublicGame, id).then(() => {
                history.push('/table-games')
            }).catch(() => {
                setOpen(true)
            })
        }
    }

    const handleBack = () => {
        history.push('/table-games')
    }

    return (
        <>
        <Box sx={{ width: '100%' }}>
            <Collapse in={open}>
                <Alert
                action={
                    <IconButton
                    aria-label="close"
                    color="inherit"
                    size="small"
                    onClick={() => {
                        setOpen(false);
                    }}
                    >
                    <CloseIcon fontSize="inherit" />
                    </IconButton>
                }
                sx={{ mb: 2 }}
                severity="error"
                >
                {errorUpdateGame}
                </Alert>
            </Collapse>
        </Box>
        <Paper sx={{ 
            maxWidth: '300px', 
            minWidth: {md: '300px', sm: '300px', xs: '250px'},
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'center', 
            backgroundColor: 'primary.dark', 
            color: '#fff', 
            padding: '15px',
            position: 'relative' 
        }}>
            <Typography variant="h4">Edit Game</Typography>
        </Paper>
        <Paper
            component="form" 
            elevation={3} 
            onSubmit={handleAddGame}
            sx={{ 
                minWidth: {md: '400px', sm: '400px', xs: '300px'}, 
                maxWidth: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '-40px auto' }}>
            <CardContent sx={{ textAlign: 'left', width: '100%', marginTop: '40px' }}>
                <div className="mb-1">
                {errorName !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="name"
                        name="name"
                        label="Name"
                        value={selectedPublicGame.name}
                        onChange={handleChange}
                        helperText={errorName}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="name"
                        name="name"
                        label="Name"
                        value={selectedPublicGame.name}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorRelease !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="release"
                        name="release"
                        label="Release"
                        type='number'
                        value={selectedPublicGame.release}
                        onChange={handleChange}
                        helperText={errorRelease}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="release"
                        name="release"
                        label="Release"
                        type='number'
                        value={selectedPublicGame.release}
                        onChange={handleChange}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorGenre !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="genre"
                        name="genre"
                        label="Genre"
                        value={selectedPublicGame.genre}
                        onChange={handleChange}
                        helperText={errorGenre}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="genre"
                        name="genre"
                        label="Genre"
                        value={selectedPublicGame.genre}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorPlatform !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="platform"
                        name="platform"
                        label="Platform"
                        value={selectedPublicGame.platform}
                        onChange={handleChange}
                        helperText={errorPlatform}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="platform"
                        name="platform"
                        label="Platform"
                        value={selectedPublicGame.platform}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorImage !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="image"
                        name="image"
                        label="Image"
                        value={selectedPublicGame.image}
                        onChange={handleChange}
                        helperText={errorImage}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="image"
                        name="image"
                        label="Image"
                        value={selectedPublicGame.image}
                        onChange={handleChange}
                    />
                )}
                </div>
                {errorType !== '' ? (
                    <FormControl
                    required
                    error
                    component="fieldset"
                    variant="standard"
                  >
                    <FormLabel component="legend">Type Game</FormLabel>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Checkbox checked={selectedPublicGame.singlePlayer === 1 ? true : false} onChange={handleChangeCheck} name="singlePlayer" />
                        }
                        label="Single Player"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={selectedPublicGame.multiplayer === 1 ? true : false} onChange={handleChangeCheck} name="multiplayer" />
                        }
                        label="Multi Player"
                      />
                    </FormGroup>
                    <FormHelperText>{errorType}</FormHelperText>
                  </FormControl>
                ) : (
                    <FormControl
                        required
                        component="fieldset"
                        variant="standard"
                    >
                    <FormLabel component="legend">Type Game</FormLabel>
                    <FormGroup>
                    <FormControlLabel
                        control={
                          <Checkbox checked={selectedPublicGame.singlePlayer === 1 ? true : false} onChange={handleChangeCheck} name="singlePlayer" />
                        }
                        label="Single Player"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox checked={selectedPublicGame.multiplayer === 1 ? true : false} onChange={handleChangeCheck} name="multiplayer" />
                        }
                        label="Multi Player"
                      />
                    </FormGroup>
                  </FormControl>
                )}
                <div className="mb-1">
                    <Box>
                        <Button type="submit" sx={{ float: 'right', padding: '10px' }} variant="contained">SAVE</Button>
                        <ColorButton sx={{ float: 'left', padding: '10px' }} variant="contained" onClick={handleBack}>BACK</ColorButton>
                    </Box>
                </div>
            </CardContent>
        </Paper>
        </>
    )
}

export default EditGame