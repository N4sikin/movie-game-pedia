import Cookies from 'js-cookie'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect } from 'react-router-dom'
//import components
import Navbar from '../components/Navbar'
import Layout from '../components/Layout' 

//import context
import { PublicProvider } from '../context/publicContext'
import { AuthProvider } from '../context/authContext'

// import public page
import Home from '../page/home'
import ListMovies from '../page/movies/listMovies'
import ListGames from '../page/games/listGames'
import Login from '../page/login'
import Registration from '../page/registration'
import DetailMovie from '../page/movies/detailMovie'
import DetailGame from '../page/games/detailGame'
import SearchList from '../page/search'

// Auth page
import ChangePassword from '../page/authUser/changePassword'
import TableMovies from '../page/authUser/movies/tableMovies'
import CreateMovie from '../page/authUser/movies/createMovie'
import EditMovie from '../page/authUser/movies/editMovie'
import TableGames from '../page/authUser/games/tableGames'
import CreateGame from '../page/authUser/games/createGame'
import EditGame from '../page/authUser/games/editGame'

 const Routes = () => {
        const AuthRoute = ({ ...props }) => { 
            if(Cookies.get('user') !== undefined) { return <Route {...props} /> }
            else if( Cookies.get('user') === undefined ) { return <Redirect to='/login' /> } 
        }
        const MustLogout = ({ ...props }) => { 
            if(Cookies.get('user') !== undefined) { return <Redirect to='/' />  }
            else if( Cookies.get('user') === undefined ) { return <Route {...props} /> } 
        }
     return (
        <Router>
            <PublicProvider>
                <AuthProvider>
                    <Navbar />
                    <Layout>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/movies" component={ListMovies} />
                            <Route exact path="/movies/detail/:id" component={DetailMovie} />
                            <Route exact path="/games" component={ListGames} />
                            <Route exact path="/games/detail/:id" component={DetailGame} />
                            <Route exact path="/search/:valueOfSearch" component={SearchList} />
                            <MustLogout exact path="/login" component={Login} />
                            <MustLogout exact path="/registration" component={Registration} />
                            <AuthRoute exact path="/changepassword" component={ChangePassword} />
                            <AuthRoute exact path="/table-movies" component={TableMovies} />
                            <AuthRoute exact path="/table-movies/create" component={CreateMovie} />
                            <AuthRoute exact path="/table-movies/edit/:id" component={EditMovie} />
                            <AuthRoute exact path="/table-games" component={TableGames} />
                            <AuthRoute exact path="/table-games/create" component={CreateGame} />
                            <AuthRoute exact path="/table-games/edit/:id" component={EditGame} />
                        </Switch>
                    </Layout>
                </AuthProvider>
            </PublicProvider>
        </Router>
     )
 }

 export default Routes