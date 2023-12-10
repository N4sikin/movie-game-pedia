import { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { 
    AppBar, 
    Box, 
    Toolbar, 
    IconButton, 
    Typography, 
    Container, 
    Button, 
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemText,
    InputBase,
    Dialog,
    DialogContent,
    Paper,
    TextField,
    CardMedia } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import SearchIcon from '@mui/icons-material/Search';
import { styled } from '@mui/material/styles';
import { AuthContext } from '../context/authContext';

import logo from '../style/img/logo.png'

const pages = [
  {
    id: 'page1',
    label: 'Home',
    link: '/'
  },
  {
    id: 'page2',
    label: 'Movies',
    link: '/movies'
  },
  {
    id: 'page3',
    label: 'Games',
    link: '/games'
  }
];
const loginReg = [
  {
    id: 'action1',
    label: 'Registration',
    link: '/registration'
  },
  {
    id: 'action2',
    label: 'Login',
    link: '/login'
  }
];
const drawerWidth = 240;

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

const Navbar = () => {
  const { loginStatus } = useContext(AuthContext)
  const history = useHistory()
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleModalSearch = () => {
    setSearchOpen(!searchOpen)
  }

  const handleSubmitPC = e => {
		e.preventDefault()
		const search = e.target.searchPC.value
		if (search !== '') {
			history.push(`/search/${search}`)
		} else {
			history.push("/")
		}
	}

  const handleSubmitMobile = e => {
		e.preventDefault()
		const search = e.target.searchMobile.value
		if (search !== '') {
			history.push(`/search/${search}`)
		} else {
			history.push("/")
		}
    setSearchOpen(!searchOpen)
	}

  const drawer = (
    <div>
      <Divider />
      <List>
        {pages.map(item => (
          <Link key={item.id} to={item.link} className='navbar-menu' style={{ color: '#263238'}} onClick={handleDrawerToggle}>
            <ListItem button>
              <ListItemText primary={item.label} />
            </ListItem>
          </Link>
        ))}
      </List>
      {loginStatus === false ? (
        <>
        <Divider />
          <List>
            {loginReg.map(item => (
              <Link key={item.id} to={item.link} className='navbar-menu' style={{ color: '#263238'}} onClick={handleDrawerToggle}>
                <ListItem button>
                  <ListItemText primary={item.label} />
                </ListItem>
              </Link>
            ))}
          </List>
        </>
      ) : null}
    </div>
  );

  return (
    <AppBar position="fixed" color='default'>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}>
            <img
              src={logo}
              alt=''
              width='80'
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleDrawerToggle}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
              <Drawer
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true, // Better open performance on mobile.
                }}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                }}
              >
                <DrawerHeader>
                  <IconButton onClick={handleDrawerToggle}>
                    <ChevronLeftIcon />
                  </IconButton>
                </DrawerHeader>
                {drawer}
              </Drawer>
          </Box>
          {/* <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            LOGO
          </Typography> */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <img
              src={logo}
              alt=''
              width='80'
            />
          </Box>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map(item => (
              <Link key={item.id} to={item.link} className='navbar-menu' style={{ color: '#263238'}}>
                <Button
                  sx={{ my: 2, color: 'inherit', display: 'block' }}
                >
                    {item.label}
                </Button>
              </Link>
            ))}
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none'} }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleModalSearch}
              color="inherit"
            >
              <SearchIcon />
            </IconButton>
            <Dialog open={searchOpen} onClose={handleModalSearch}>
              <DialogContent>
                <Paper
                  component="form"
                  onSubmit={handleSubmitMobile}
                  sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', minWidth: {md: '400px', sm: '400px', xs: '200px'}, maxWidth: '400px' }}
                >
                  <TextField fullWidth label="Search" name='searchMobile'/>
                  <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
                    <SearchIcon />
                  </IconButton>
                </Paper>
              </DialogContent>
            </Dialog>
          </Box>
          <Box sx={{display: { xs: 'none', md: 'block' }, marginRight: '15px'}}>
            <Paper
              component="form"
              onSubmit={handleSubmitPC}
              sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 400 }}
            >
              <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="Search"
                name='searchPC'
              />
              <IconButton type='submit' sx={{ p: '10px' }} aria-label="search">
                <SearchIcon />
              </IconButton>
            </Paper>
          </Box>
          {loginStatus === false ? (
            <Box sx={{display: { xs: 'none', md: 'flex' }}}>
              {loginReg.map(item => (
                <Link key={item.id} to={item.link} className='navbar-menu' style={{ color: '#263238'}}>
                  <Button
                    sx={{ my: 2, color: 'inherit', display: 'block' }}
                  >
                    {item.label}
                  </Button>
                </Link>
              ))}
            </Box>
          ) : null}
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Navbar;
