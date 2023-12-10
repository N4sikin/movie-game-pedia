import { useState, useContext } from "react"
import { 
    TextField, 
    CardContent,
    Typography,
    Paper, 
    Button,
    Avatar,
    Alert,
    Box,
    IconButton,
    Collapse } from "@mui/material"
import { Link, useHistory } from "react-router-dom"
import PersonAddIcon from '@mui/icons-material/PersonAdd'
import { indigo } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close'

//import format
import { mailFormat } from "../../utility/format"

//import context
import { PublicContext } from "../../context/publicContext"

const Registration = () => {
    const { errorRegistration, action } = useContext(PublicContext)
    const { registration } = action

    const history = useHistory()

    const [open, setOpen] = useState(false)

    const [inputRegister, setInputRegister] = useState({
        email: '',
        name: '',
        password: ''
    })
    const [errorEmail, setErrorEmail] = useState('')
    const [errorName, setErrorName] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setInputRegister({ ...inputRegister, [name]: value })
        if (name === 'email') {
            if (value === '') {
                setErrorEmail('Email is required')
            } else if (mailFormat(value) === false) {
                setErrorEmail('Email not valid')
            } else {
                setErrorEmail('')
            }
        } else if (name === 'name') {
            if (value === '') {
                setErrorName('Name is required')
            } else {
                setErrorName('')
            }
        } else if (name === 'password') {
            if (value !== '') {
                if (value.length < 6) {
                    setErrorPassword('Minimum 6 characters')
                } else {
                    setErrorPassword('')
                }
            } else {
                setErrorPassword('Password is required')
            }
        }
    }

    const handleRegistration = (e) => {
        e.preventDefault()
        setOpen(false)
        if (inputRegister.name === '') {
            setErrorName('Name is required')
        }
        if (inputRegister.email === '') {
            setErrorEmail('Email is required')
        }
        if (inputRegister.password === '') {
            setErrorPassword('Password is required')
        }
        if (errorEmail === '' && errorName === '' && errorPassword === '') {
            registration(inputRegister).then(() => {
                history.push('/login')
            }).catch(() => {
                setOpen(true)
            })
        }
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
                {errorRegistration}
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
            <Typography variant="h4">REGISTRATION</Typography>
        </Paper>
        <Paper
            component="form" 
            elevation={3} 
            onSubmit={handleRegistration}
            sx={{ 
                minWidth: {md: '400px', sm: '400px', xs: '300px'}, 
                maxWidth: '400px', 
                display: 'flex', 
                justifyContent: 'center', 
                margin: '-40px auto' }}>
            <CardContent sx={{ width: '100%', marginTop: '40px' }}>
                <Avatar sx={{
                    height: '80px',
                    width: '80px',
                    margin: '0 auto',
                    marginBottom: '20px',
                    bgcolor: indigo[900]
                }}>
                    <PersonAddIcon fontSize='large' />
                </Avatar>
                <div className="mb-1 text-left">
                    <Link to='/login'>
                        <Typography variant="button" gutterBottom>
                            Already have an account ?
                        </Typography>
                    </Link>
                </div>
                <div className="mb-1">
                {errorName !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="nama"
                        name="name"
                        label="Name"
                        value={inputRegister.name}
                        onChange={handleChange}
                        helperText={errorName}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="nama"
                        name="name"
                        label="Name"
                        value={inputRegister.name}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorEmail !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="email"
                        name="email"
                        label="Email"
                        value={inputRegister.email}
                        onChange={handleChange}
                        helperText={errorEmail}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="email"
                        name="email"
                        label="Email"
                        value={inputRegister.email}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorPassword !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={inputRegister.password}
                        onChange={handleChange}
                        helperText={errorPassword}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="password"
                        name="password"
                        label="Password"
                        type="password"
                        value={inputRegister.password}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                    <Button type="submit" sx={{ width: '100%', padding: '10px' }} variant="contained">REGISTTRATION</Button>
                </div>
            </CardContent>
        </Paper>
        </>
    )
}

export default Registration