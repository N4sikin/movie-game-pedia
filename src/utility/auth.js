import Cookies from "js-cookie"
export const auth = () => {
    if (Cookies.get('token') !== undefined) {
        return true
    } else {
        return false
    }
}