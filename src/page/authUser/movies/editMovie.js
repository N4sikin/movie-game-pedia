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
    Collapse} from "@mui/material"
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

const EditMovie = () => {
    const { errorUpdateMovie, authAction } = useContext(AuthContext)
    const { cekLogin, updateMovie } = authAction

    const { selectedPublicMovie, setSelectedPublicMovie, action} = useContext(PublicContext)
    const { selectPublicDataMovie } = action

    const history = useHistory()
    const { id } = useParams()

    const [open, setOpen] = useState(false)

    const [errorTitle, setErrorTitle] = useState('')
    const [errorYear, setErrorYear] = useState('')
    const [errorDescription, setErrorDescription] = useState('')
    const [errorDuration, setErrorDuration] = useState('')
    const [errorGenre, setErrorGenre] = useState('')
    const [errorImage, setErrorImage] = useState('')
    const [errorRating, setErrorRating] = useState('')
    const [errorReview, setErrorReview] = useState('')

    useEffect(() => {
        cekLogin()
        selectPublicDataMovie(id)
    },[])
    
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setSelectedPublicMovie({ ...selectedPublicMovie, [name]: value })
        if (name === 'title') {
            if (value === '') {
                setErrorTitle('Title is required')
            } else {
                setErrorTitle('')
            }
        } else if (name === 'year') {
            if (Number(value) > 2021 || Number(value) < 1980) {
                setErrorYear('Year must be between 1980 to 2021')
            } else {
                setErrorYear('')
            }
        } else if (name === 'description') {
            if (value === '') {
                setErrorDescription('Description is required')
            } else {
                setErrorDescription('')
            }
        } else if (name === 'duration') {
            if (value === '') {
                setErrorDuration('Duration is required')
            } else {
                setErrorDuration('')
            }
        } else if (name === 'genre') {
            if (value === '') {
                setErrorGenre('Genre is required')
            } else {
                setErrorGenre('')
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
        } else if (name === 'rating') {
            if (Number(value) > 10 || Number(value) < 0) {
                setErrorRating('Rating must be between 0 to 10')
            } else if (value === '') {
                setErrorRating('Rating is required')
            } else {
                setErrorRating('')
            }
        } else if (name === 'review') {
            if (value === '') {
                setErrorReview('Review is required')
            } else {
                setErrorReview('')
            }
        }
    }

    const handleAddMovie = (e) => {
        e.preventDefault()
        setOpen(false)
        if (errorTitle === '' && errorYear === '' && errorDescription === '' && errorDuration === '' && errorGenre === '' && errorImage === '' && errorRating === '' && errorReview === '') {
            updateMovie(selectedPublicMovie, id).then(() => {
                history.push('/table-movies')
            }).catch(() => {
                setOpen(true)
            })
        }
    }

    const handleBack = () => {
        history.push('/table-movies')
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
                {errorUpdateMovie}
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
            <Typography variant="h4">Create Movie</Typography>
        </Paper>
        <Paper
            component="form" 
            elevation={3} 
            onSubmit={handleAddMovie}
            sx={{ 
                minWidth: {md: '400px', sm: '400px', xs: '300px'}, 
                maxWidth: '100%', 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '-40px auto' }}>
            <CardContent sx={{ textAlign: 'left', width: '100%', marginTop: '40px' }}>
                <div className="mb-1">
                {errorTitle !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="title"
                        name="title"
                        label="Title"
                        value={selectedPublicMovie.title}
                        onChange={handleChange}
                        helperText={errorTitle}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="title"
                        name="title"
                        label="Title"
                        value={selectedPublicMovie.title}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorYear !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="year"
                        name="year"
                        label="Year"
                        type='number'
                        value={selectedPublicMovie.year}
                        onChange={handleChange}
                        helperText={errorYear}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="year"
                        name="year"
                        label="Year"
                        type='number'
                        value={selectedPublicMovie.year}
                        onChange={handleChange}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorDescription !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={selectedPublicMovie.description}
                        onChange={handleChange}
                        helperText={errorDescription}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="description"
                        name="description"
                        label="Description"
                        multiline
                        rows={4}
                        value={selectedPublicMovie.description}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1 flex-justify">
                    {errorDuration !== '' ? (
                        <TextField
                            required
                            error
                            id="duration"
                            name="duration"
                            label="Duration"
                            type='number'
                            value={selectedPublicMovie.duration}
                            onChange={handleChange}
                            helperText={errorDuration}
                            sx={{ width: { md: '300px', sm: '80%', xs: '80%' } }}
                        />
                    ) : (
                        <TextField
                            required
                            fullWidth 
                            id="duration"
                            name="duration"
                            label="Duration"
                            type='number'
                            value={selectedPublicMovie.duration}
                            onChange={handleChange}
                            sx={{ width: { md: '300px', sm: '80%', xs: '80%' } }}
                        />
                    )} <Typography variant="body1" sx={{ marginLeft: '7px', marginTop: '10px' }}>Minute</Typography>
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
                        value={selectedPublicMovie.genre}
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
                        value={selectedPublicMovie.genre}
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
                        value={selectedPublicMovie.image}
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
                        value={selectedPublicMovie.image}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorRating !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="rating"
                        name="rating"
                        label="Rating"
                        type="number"
                        value={selectedPublicMovie.rating}
                        onChange={handleChange}
                        helperText={errorRating}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="rating"
                        name="rating"
                        label="Rating"
                        type="number"
                        value={selectedPublicMovie.rating}
                        onChange={handleChange}
                        sx={{ width: { md: '300px', sm: '300px', xs: '100%' } }}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorReview !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="review"
                        name="review"
                        label="Review"
                        value={selectedPublicMovie.review}
                        onChange={handleChange}
                        helperText={errorReview}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="review"
                        name="review"
                        label="Review"
                        value={selectedPublicMovie.review}
                        onChange={handleChange}
                    />
                )}
                </div>
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

export default EditMovie