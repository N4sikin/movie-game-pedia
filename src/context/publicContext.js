import { createContext, useState } from "react"
import axios from 'axios'
import Cookies from "js-cookie"

export const PublicContext = createContext()

export const PublicProvider = props => {

	const [dataPublicMovies, setDataPublicMovies] = useState([])
    const [errorFetchPublicMovies, setErrorFetchPublicMovies] = useState("")
    const [selectedPublicMovie, setSelectedPublicMovie] = useState(
        {
            id: '',
            title: '',
            description: '',
            year: '',
            duration: '',
            genre: '',
            rating: '',
            image: '',
            created: '', 
            updated: '',
            review: ''
        })
    const [errorSelectedPublicMovie, setErrorSelectedPublicMovie] = useState("")

    const [dataPublicGames, setDataPublicGames] = useState([])
    const [errorFetchPublicGames, setErrorFetchPublicGames] = useState("")
    const [selectedPublicGame, setSelectedPublicGame] = useState({})
    const [errorSelectedPublicGame, setErrorSelectedPublicGame] = useState("")
    const [fetchStatus, setFetchStatus] = useState(true)

    const [errorLogin, setErrorLogin] = useState('')
    const [errorRegistration, setErrorRegistration] = useState('')

    const fetchPublicDataMovies = async() => {
        setErrorFetchPublicMovies("")
        try {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-movie`)
            setDataPublicMovies(result.data.map(x=>{ return {id: x.id, title: x.title, description: x.description, year: x.year, duration: x.duration, genre: x.genre, rating: x.rating, image: x.image_url, review: x.review, created: x.created_at, updated: x.updated_at, key: x.id}}))
        } catch(err) {
            setErrorFetchPublicMovies(err.message)
        }
    }

    const selectPublicDataMovie = id => {
        setSelectedPublicMovie({})
        setErrorSelectedPublicMovie("")
        axios.get(`https://backendexample.sanbersy.com/api/data-movie/${id}`)
            .then(res => {
                //console.log(res)
                let data = res.data
                setSelectedPublicMovie(
                    {
                        id: data.id,
                        title: data.title,
                        description: data.description,
                        year: data.year,
                        duration: data.duration,
                        genre: data.genre,
                        rating: data.rating,
                        image: data.image_url,
                        created: data.created_at, 
                        updated: data.updated_at,
                        review: data.review
                    }
                )

            })
            .catch((err) => {
                setErrorSelectedPublicMovie(err.message)
            })
    }

    const fetchPublicDataGames = async () => {
        setErrorFetchPublicGames("")
        try {
            const result = await axios.get(`https://backendexample.sanbersy.com/api/data-game`)
            setDataPublicGames(result.data.map(x=>{ return {id: x.id, name: x.name, genre: x.genre, singlePlayer: x.singlePlayer, multiplayer: x.multiplayer, platform: x.platform, release: x.release, image: x.image_url, created: x.created_at, updated: x.updated_at, key: x.id}}))
        } catch(err) {
            setErrorFetchPublicGames(err.message)
        }
    }

    const selectPublicDataGame = id => {
        setSelectedPublicGame({})
        setErrorSelectedPublicGame("")
        axios.get(`https://backendexample.sanbersy.com/api/data-game/${id}`)
            .then(res => {
                //console.log(res)
                let data = res.data
                setSelectedPublicGame(
                    {
                        id: data.id,
                        name: data.name,
                        genre: data.genre,
                        singlePlayer: data.singlePlayer,
                        multiplayer: data.multiplayer,
                        platform: data.platform,
                        release: data.release,
                        image: data.image_url,
                        created: data.created_at, 
                        updated: data.updated_at
                    }
                )

            })
            .catch((err) => {
                setErrorSelectedPublicGame(err.message)
            })
    }

    const login = (data) => {
        setErrorLogin('')
        return new Promise( function (resolve, reject){
            axios.post(`https://backendexample.sanbersy.com/api/user-login`, {
                email: data.email, 
                password: data.password
             })
            .then(res => {
                const tmpData = res.data.user
                const tmpToken = res.data.token
                Cookies.set('user', tmpData.name, {expires: 1})
                Cookies.set('email', tmpData.email, {expires: 1})
                Cookies.set('token', tmpToken, {expires: 1})
                resolve("success")
            })
            .catch((err) => {
                setErrorLogin(err.message)
                reject("error")
            })
        })
    }

    const registration = (data) => {
        setErrorRegistration('')
        return new Promise( function (resolve, reject){
            axios.post(`https://backendexample.sanbersy.com/api/register`, {
                name: data.name,
                email: data.email, 
                password: data.password
             })
            .then(() => {
                resolve("success")
            })
            .catch((err) => {
                setErrorRegistration(err.message)
                reject("error")
            })
        })
    }

    const action = {
        fetchPublicDataMovies,
        selectPublicDataMovie,
        fetchPublicDataGames,
        selectPublicDataGame,
        login,
        registration
    }

    return (
        <PublicContext.Provider value={{
            dataPublicMovies,
            setDataPublicMovies,
            errorFetchPublicMovies,
            setErrorFetchPublicMovies,
            selectedPublicMovie,
            setSelectedPublicMovie,
            errorSelectedPublicMovie,
            setErrorSelectedPublicMovie,
            dataPublicGames,
            setDataPublicGames,
            errorFetchPublicGames,
            setErrorFetchPublicGames,
            selectedPublicGame,
            setSelectedPublicGame,
            errorSelectedPublicGame,
            setErrorSelectedPublicGame,
            errorLogin,
            setErrorLogin,
            errorRegistration,
            setErrorRegistration,
            action
        }}>
            {props.children}
        </PublicContext.Provider>
    )
}