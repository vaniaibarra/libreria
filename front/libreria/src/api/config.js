export const URLBASE = 'http://localhost:3000/libreria'

export const ENDPOINT = {
    login: `${URLBASE}/login`,
    users: `${URLBASE}/usuarios`,
    register: `${URLBASE}/register`,
    edit: `${URLBASE}/edit`,
    editPublicacion: (id) => `${URLBASE}/editPublicacion/${id}`,
    upload: `${URLBASE}/upload`,
    tienda: `${URLBASE}/tienda`,
    generos: `${URLBASE}/generos`,
    librosUsuario: `${URLBASE}/librosUsuario`,
    filtros: `${URLBASE}/filtros`,
    librosFiltrados: `${URLBASE}/librosFiltrados`,
    detail: (id) => `${URLBASE}/tienda/${id}`,
    nuevaConversacion: `${URLBASE}/nuevaConversacion`,
    creacionMensaje: `${URLBASE}/mensajes`,
    obtenerMensajes: (conversacion_id) => `${URLBASE}/mensajes/${conversacion_id}`

}