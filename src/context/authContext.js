import { createContext, useState, useContext } from "react"
import Cookies from "js-cookie"
import axios from 'axios'

export const AuthContext = createContext()

export const AuthProvider = props => {

    const [loginStatus, setLoginStatus] = useState(false)
    const [loginName, setLoginName] = useState('')
    const [errorChangePassword, setErrorChangePassword] = useState()

    const [errorAddMovie, setErrorAddMovie] = useState('')
    const [errorUpdateMovie, setErrorUpdateMovie] = useState('')
    const [errorDeleteMovie, setErrorDeleteMovie] = useState('')
    const [success, setSuccess] = useState(false)
    const [successMsg, setSuccessMsg] = useState('')

    const [errorAddGame, setErrorAddGame] = useState('')
    const [errorUpdateGame, setErrorUpdateGame] = useState('')
    const [errorDeleteGame, setErrorDeleteGame] = useState('')
    const [successGame, setSuccessGame] = useState(false)
    const [successMsgGame, setSuccessMsgGame] = useState('')

    const cekLogin = () => {
        if (Cookies.get('token') !== undefined) {
            setLoginStatus(true)
            setLoginName(Cookies.get('user'))
        } else {
            setLoginStatus(false)
            setLoginName('')
        }
    }

    const changePassword = (data) => {
        setErrorChangePassword('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.post(`https://backendexample.sanbersy.com/api/change-password`, {
                current_password: data.currentPassword,
                new_password: data.newPassword, 
                new_confirm_password: data.confirmPassword
             }, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                resolve("success")
            })
            .catch((err) => {
                setErrorChangePassword(err.message)
                reject("error")
            })
        })
    }

    const addMovie = (data) => {
        setErrorAddMovie('')
        setSuccess(false)
        setSuccessMsg('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.post(`https://backendexample.sanbersy.com/api/data-movie`, {
                title: data.title,
                year: Number(data.year),
                description: data.description, 
                duration: Number(data.duration),
                genre: data.genre,
                image_url: data.image,
                rating: Number(data.rating),
                review: data.review
             }, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccess(true)
                setSuccessMsg('Data has been added successfully')
                resolve("success")
            })
            .catch((err) => {
                setErrorAddMovie(err.message)
                reject("error")
            })
        })
    }

    const updateMovie = (data, id) => {
        setErrorUpdateMovie('')
        setSuccess(false)
        setSuccessMsg('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.put(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {
                title: data.title,
                year: Number(data.year),
                description: data.description, 
                duration: Number(data.duration),
                genre: data.genre,
                image_url: data.image,
                rating: Number(data.rating),
                review: data.review
             }, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccess(true)
                setSuccessMsg('Data has been updated')
                resolve("success")
            })
            .catch((err) => {
                setErrorUpdateMovie(err.message)
                reject("error")
            })
        })
    }

    const deleteDataMovie = id => {
        setErrorDeleteMovie('')
        setSuccess(false)
        setSuccessMsg('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.delete(`https://backendexample.sanbersy.com/api/data-movie/${id}`, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccess(true)
                setSuccessMsg('Data has been deleted')
                resolve("success")
            })
            .catch((err) => {
                setErrorDeleteMovie(err.message)
                reject("error")
            })
        })
    }

    const addGame = (data) => {
        setErrorAddGame('')
        setSuccessGame(false)
        setSuccessMsgGame('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.post(`https://backendexample.sanbersy.com/api/data-game`, {
                name: data.name,
                genre: data.genre,
                singlePlayer: data.singlePlayer,
                multiplayer: data.multiplayer,
                platform: data.platform,
                release: data.release,
                image_url: data.image,
             }, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccessGame(true)
                setSuccessMsgGame('Data has been added successfully')
                resolve("success")
            })
            .catch((err) => {
                setErrorAddGame(err.message)
                reject("error")
            })
        })
    }

    const updateGame = (data, id) => {
        setErrorUpdateGame('')
        setSuccessGame(false)
        setSuccessMsgGame('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.put(`https://backendexample.sanbersy.com/api/data-game/${id}`, {
                name: data.name,
                genre: data.genre,
                singlePlayer: data.singlePlayer,
                multiplayer: data.multiplayer,
                platform: data.platform,
                release: data.release,
                image_url: data.image,
             }, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccessGame(true)
                setSuccessMsgGame('Data has been added successfully')
                resolve("success")
            })
            .catch((err) => {
                setErrorUpdateGame(err.message)
                reject("error")
            })
        })
    }

    const deleteDataGame = id => {
        setErrorDeleteGame('')
        setSuccessGame(false)
        setSuccessMsgGame('')
        const token = Cookies.get('token')
        return new Promise( function (resolve, reject){
            axios.delete(`https://backendexample.sanbersy.com/api/data-game/${id}`, {headers: {"Authorization" : "Bearer "+ token}})
            .then(() => {
                setSuccessGame(true)
                setSuccessMsgGame('Data has been deleted')
                resolve("success")
            })
            .catch((err) => {
                setErrorDeleteGame(err.message)
                reject("error")
            })
        })
    }

    const authAction = {
        cekLogin,
        changePassword,
        addMovie,
        updateMovie,
        deleteDataMovie,
        addGame,
        updateGame,
        deleteDataGame
    }

    return (
        <AuthContext.Provider value={{
            loginStatus,
            setLoginStatus,
            errorChangePassword,
            setErrorChangePassword,
            loginName,
            setLoginName,
            errorAddMovie,
            setErrorAddMovie,
            errorUpdateMovie,
            setErrorUpdateMovie,
            errorDeleteMovie,
            setErrorDeleteMovie,
            success,
            setSuccess,
            successMsg,
            setSuccessMsg,
            errorAddGame,
            setErrorAddGame,
            errorUpdateGame,
            setErrorUpdateGame,
            errorDeleteGame,
            setErrorDeleteGame,
            successGame,
            setSuccessGame,
            successMsgGame,
            setSuccessMsgGame,
            authAction
        }}>
            {props.children}
        </AuthContext.Provider>
    )
}