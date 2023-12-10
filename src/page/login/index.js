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
import LockIcon from '@mui/icons-material/Lock'
import { indigo } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close'

//import format
import { mailFormat } from "../../utility/format"

//import context
import { PublicContext } from "../../context/publicContext"

const Login = () => {
    const { errorLogin, action } = useContext(PublicContext)
    const { login } = action

    const history = useHistory()

    const [open, setOpen] = useState(false)

    const [inputLogin, setInputLogin] = useState({
        email: '',
        password: ''
    })
    const [errorEmail, setErrorEmail] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setInputLogin({ ...inputLogin, [name]: value })
        if (name === 'email') {
            if (value === '') {
                setErrorEmail('Email is required')
            } else if (mailFormat(value) === false) {
                setErrorEmail('Email not valid')
            } else {
                setErrorEmail('')
            }
        } else if (name === 'password') {
            if (value === '') {
                setErrorPassword('Password is required')
            } else {
                setErrorPassword('')
            }
        }
    }
    const handleLogin = e => {
        e.preventDefault()
        setOpen(false)
        if (inputLogin.email === '') {
            setErrorEmail('Email is required')
        }
        if (inputLogin.password === '') {
            setErrorPassword('Password is required')
        }
        if(errorEmail === '' && errorPassword === '') {
            login(inputLogin).then(() => {
                history.push('/')
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
                {errorLogin}
                </Alert>
            </Collapse>
        </Box>
        <Paper sx={{ 
            maxWidth: '150px', 
            minWidth: {md: '150px', sm: '150px', xs: '130px'},
            margin: '0 auto', 
            display: 'flex', 
            justifyContent: 'center', 
            backgroundColor: 'primary.dark', 
            color: '#fff', 
            padding: '15px',
            position: 'relative' 
        }}>
            <Typography variant="h4">SIGN IN</Typography>
        </Paper>
        <Paper 
            component="form" 
            elevation={3} 
            onSubmit={handleLogin}
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
                    <LockIcon fontSize='large' />
                </Avatar>
                <div className="mb-1">
                    {errorEmail !== '' ? (
                        <TextField
                        error
                        required
                        fullWidth 
                        id="email"
                        label="Email"
                        name='email'
                        value={inputLogin.email}
                        onChange={handleChange}
                        helperText={errorEmail}
                        />
                    ) : (
                        <TextField
                        required
                        fullWidth 
                        id="email"
                        label="Email"
                        name='email'
                        value={inputLogin.email}
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
                        label="Password"
                        type="password"
                        name='password'
                        value={inputLogin.password}
                        onChange={handleChange}
                        helperText={errorPassword}
                        />
                    ) : (
                        <TextField 
                        required
                        fullWidth 
                        id="password"
                        label="Password"
                        type="password"
                        name='password'
                        value={inputLogin.password}
                        onChange={handleChange}
                        />
                    )}
                </div>
                <div className="mb-1 text-left">
                    <Link to='/registration'>
                        <Typography variant="button" gutterBottom>
                            Don't have an account ?
                        </Typography>
                    </Link>
                </div>
                <div className="mb-1">
                    <Button type='submit' sx={{ width: '100%', padding: '10px' }} variant="contained">LOGIN</Button>
                </div>
            </CardContent>
        </Paper>
        </>
    )
}

export default Login