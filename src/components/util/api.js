import Cookies from 'js-cookie'
export const API_URL = window.location.hostname

export const API = {
    csfr: 'api/csrf_token/',
    post: (method) => `api/upload_${method}/`,
    correct: '/' + `correct/`
}

export function getHeaders() {
    return {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'X-CSRFToken': Cookies.get('csrftoken')
    }
}


