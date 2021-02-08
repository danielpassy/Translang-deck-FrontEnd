import Cookies from 'js-cookie'
export const API_URL = "http://localhost:3000/"

export const API = {
    csfr: API_URL + 'api/csrf_token/',
    post: (method) => API_URL + `api/upload_${method}/`,
    correct: API_URL + `correct/`
}

export function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
}


