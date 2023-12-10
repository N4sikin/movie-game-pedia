import { useContext, forwardRef, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Cookies from 'js-cookie';
import { 
    Container, 
    Grid, 
    CardContent, 
    List, 
    ListItem,
    ListItemText,
    Divider,
    Avatar,
    Box,
    Typography, 
    Paper,
    AppBar,
    Toolbar,
    IconButton,
    Fab,
    Slide,
    Dialog,
    Button } from '@mui/material';

import MenuIcon from '@mui/icons-material/Menu'
import CloseIcon from '@mui/icons-material/Close'
import { styled } from '@mui/material/styles'
import Footer from './Footer'
import { AuthContext } from '../context/authContext'

const StyledHoverMenu = styled('div')(({ theme }) => ({
    '&:hover': {
        backgroundColor: '#002984',
        opacity: [0.9, 0.8, 0.7],
        color: '#fff'
      },
    }));

const stringToColor = (string) => {
    let hash = 0;
    let i;
    
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
        hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    let color = '#';
    
    for (i = 0; i < 3; i += 1) {
        const value = (hash >> (i * 8)) & 0xff;
        color += `00${value.toString(16)}`.substr(-2);
    }
    /* eslint-enable no-bitwise */
    
    return color;
}

const StyledFab = styled(Fab)({
    position: 'absolute',
    zIndex: 1,
    top: -30,
    left: 0,
    right: 0,
    margin: '0 auto',
  });

const stringAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: '2rem',
        height: '80px',
        width: '80px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const stringBottomAvatar = (name) => {
    return {
      sx: {
        bgcolor: stringToColor(name),
        fontSize: '1rem',
        height: '50px',
        width: '50px'
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }

  const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  })

const Layout = (props) => {
    const { loginStatus, loginName, authAction } = useContext(AuthContext)
    const { cekLogin } = authAction
    const history = useHistory()

    const [openMobileSidebar, setOpenMobileSidebar] = useState(false)

    const sidebarWidth = loginStatus === true ? 240 : 0;
    const col = loginStatus === true ? 9 : 12
    const sidebarMenu = [
        {
            id: 1,
            label: 'Data Movies',
            link: '/table-movies'
        },
        {
            id: 2,
            label: 'Data Games',
            link: '/table-games'
        }
    ]

    const handleLogout = () => {
        if (loginStatus === true) {
            Cookies.remove('user') 
            Cookies.remove('email')
            Cookies.remove('token')
        }
        cekLogin()
        history.push('/')
    }

    const handleClickOpen = () => {
        setOpenMobileSidebar(true);
      }
    
      const handleClose = () => {
        setOpenMobileSidebar(false);
      }

    return (
        <>
        <Container maxWidth="xl" sx={{ bgcolor: '#f8f8f8', minHeight: '80vh', paddingTop: '100px', marginBottom: '150px' }}>
                <Grid container sx={{ display:'block', alignItems: 'center' }}>
                    {loginStatus === true ? (
                        <Grid item md={3} sx={{ display: { md: 'block', sm: 'block', xs: 'none' }, position: 'fixed', width: `${sidebarWidth - 25}px` }}>
                            <Paper elevation={3}>
                                <CardContent>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Avatar {...stringAvatar(loginName)} />
                                    </Box>
                                    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                        <Typography gutterBottom variant="subtitle1" sx={{ marginBottom: '15px' }}>{loginName}</Typography>
                                    </Box>
                                    <Divider />
                                    <List>
                                    {sidebarMenu.map(item => (
                                        <Link key={item.id} to={item.link} className='navbar-menu' style={{ color: '#263238' }}>
                                            <StyledHoverMenu>
                                                <ListItem button>
                                                    <ListItemText primary={item.label} />
                                                </ListItem>
                                            </StyledHoverMenu>
                                        </Link>
                                    ))}
                                    </List>
                                    <Divider />
                                    <List>
                                        <Link to='/changepassword' className='navbar-menu' style={{ color: '#263238' }}>
                                            <StyledHoverMenu>
                                                <ListItem button>
                                                    <ListItemText primary='Change Password' />
                                                </ListItem>
                                            </StyledHoverMenu>
                                        </Link>
                                        <StyledHoverMenu>
                                            <ListItem button onClick={handleLogout}>
                                                <ListItemText primary='Logout' />
                                            </ListItem>
                                        </StyledHoverMenu>
                                    </List>
                                </CardContent>
                            </Paper>
                        </Grid>
                    ) : null}
                    <Grid item md={col} sx={{ position: {md : 'relative', sm: 'relative', xs: 'static'}, marginLeft: { md: `${sidebarWidth}px`, sm: `${sidebarWidth}px`, xs: '0' }}}>{props.children}</Grid>
                </Grid>
        </Container>
        <Footer />
        {loginStatus === true ? (
            <>
        <AppBar position="fixed" color="primary" sx={{ top: 'auto', bottom: 0, display: { md: 'none', sm: 'none', xs: 'block' } }}>
            <Toolbar>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleClickOpen}>
                <MenuIcon />
            </IconButton>
            <StyledFab color="default" aria-label="add">
                <Avatar {...stringBottomAvatar(loginName)} />
            </StyledFab>
            <Box sx={{ flexGrow: 1 }} />
            </Toolbar>
        </AppBar>
        <Dialog
        fullScreen
        open={openMobileSidebar}
        onClose={handleClose}
        TransitionComponent={Transition}
        >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Hallo, {loginName}
            </Typography>
          </Toolbar>
        </AppBar>
        <List>
          <ListItem button>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar {...stringBottomAvatar(loginName)} />
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <Typography gutterBottom variant="subtitle1" sx={{ marginLeft: '10px', marginTop: '7px' }}>{loginName}</Typography>
            </Box>
          </ListItem>
          <Divider />
          {sidebarMenu.map(item => (
                <Link key={`a${item.id}`} to={item.link} onClick={handleClose} className='navbar-menu' style={{ color: '#263238' }}>
                    <StyledHoverMenu>
                        <ListItem button>
                            <ListItemText primary={item.label} />
                        </ListItem>
                    </StyledHoverMenu>
                </Link>
            ))}
            <Divider />
            <List>
                <Link to='/changepassword' onClick={handleClose} className='navbar-menu' style={{ color: '#263238' }}>
                    <StyledHoverMenu>
                        <ListItem button>
                            <ListItemText primary='Change Password' />
                        </ListItem>
                    </StyledHoverMenu>
                </Link>
                <StyledHoverMenu>
                    <ListItem button onClick={handleLogout}>
                        <ListItemText primary='Logout' />
                    </ListItem>
                </StyledHoverMenu>
            </List>
        </List>
      </Dialog>
      </>
        ) : null}
        </>
    )
}

export default Layout