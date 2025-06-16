export const URLBASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/libreria'

export const ENDPOINT = {
    login: `${URLBASE}/login`,
    users: `${URLBASE}/usuarios`,
    register: `${URLBASE}/register`,
    edit: `${URLBASE}/edit`,
    upload: `${URLBASE}/upload`,
    tienda: `${URLBASE}/tienda`,
    librosPorUsuario: `${URLBASE}/librosPorUsuario`,

}