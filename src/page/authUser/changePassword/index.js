import { useState, useContext, useEffect } from "react"
import Cookies from "js-cookie"
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
import { useHistory } from "react-router-dom"
import KeyIcon from '@mui/icons-material/Key'
import { indigo } from '@mui/material/colors'
import CloseIcon from '@mui/icons-material/Close'

//import context
import { AuthContext } from "../../../context/authContext"

const ChangePassword = () => {
    const { loginStatus, errorChangePassword, authAction } = useContext(AuthContext)
    const { cekLogin, changePassword } = authAction

    const history = useHistory()

    useEffect(() => {
        cekLogin()
    },[])

    const [open, setOpen] = useState(false)

    const [inputPassword, setInputPassword] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    })
    const [errorCurrent, setErrorCurrent] = useState('')
    const [errorNew, setErrorNew] = useState('')
    const [errorConfirm, setErrorConfirm] = useState('')
    
    const handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name
        setInputPassword({ ...inputPassword, [name]: value })
        if (name === 'currentPassword') {
            if (value === '') {
                setErrorCurrent('Current password is required')
            } else {
                setErrorCurrent('')
            }
        } else if (name === 'newPassword') {
            if (value !== '') {
                if (value.length < 6) {
                    setErrorNew('Minimum 6 characters')
                } else {
                    setErrorNew('')
                }
            } else {
                setErrorNew('New password is required')
            }
        } else if (name === 'confirmPassword') {
            if (value !== inputPassword.newPassword) {
                setErrorConfirm('Confirm password not match')
            } else {
                setErrorConfirm('')
            }
        }
    }

    const handleRegistration = (e) => {
        e.preventDefault()
        setOpen(false)
        if (inputPassword.currentPassword === '') {
            setErrorCurrent('Current password is required')
        }
        if (inputPassword.newPassword === '') {
            setErrorNew('New password is required')
        }
        if (inputPassword.confirmPassword === '') {
            setErrorConfirm('Confirm password is required')
        }
        if (inputPassword.confirmPassword !== inputPassword.newPassword) {
            setErrorConfirm('Confirm password not match')
        }
        if (errorCurrent === '' && errorNew === '' && errorConfirm === '' && inputPassword.confirmPassword === inputPassword.newPassword) {
            changePassword(inputPassword).then(() => {
                if (loginStatus === true) {
                    Cookies.remove('user') 
                    Cookies.remove('email')
                    Cookies.remove('token')
                }
                cekLogin()
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
                {errorChangePassword}
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
            <Typography variant="h5">CHANGE PASSWORD</Typography>
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
                    <KeyIcon fontSize='large' />
                </Avatar>
                <div className="mb-1">
                {errorCurrent !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        value={inputPassword.currentPassword}
                        onChange={handleChange}
                        helperText={errorCurrent}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="currentPassword"
                        name="currentPassword"
                        label="Current Password"
                        type="password"
                        value={inputPassword.currentPassword}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorNew !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        value={inputPassword.newPassword}
                        onChange={handleChange}
                        helperText={errorNew}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="newPassword"
                        name="newPassword"
                        label="New Password"
                        type="password"
                        value={inputPassword.newPassword}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                {errorConfirm !== '' ? (
                    <TextField
                        required
                        error
                        fullWidth 
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={inputPassword.confirmPassword}
                        onChange={handleChange}
                        helperText={errorConfirm}
                    />
                ) : (
                    <TextField
                        required
                        fullWidth 
                        id="confirmPassword"
                        name="confirmPassword"
                        label="Confirm Password"
                        type="password"
                        value={inputPassword.confirmPassword}
                        onChange={handleChange}
                    />
                )}
                </div>
                <div className="mb-1">
                    <Button type="submit" sx={{ width: '100%', padding: '10px' }} variant="contained">SEND</Button>
                </div>
            </CardContent>
        </Paper>
        </>
    )
}

export default ChangePassword