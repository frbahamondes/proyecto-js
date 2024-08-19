// data.js

let jugadores = [];

// Función para guardar los jugadores en localStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
};

// Función para cargar los jugadores desde localStorage
const cargarDesdeLocalStorage = () => {
    const jugadoresGuardados = localStorage.getItem('jugadores');
    if (jugadoresGuardados) {
        jugadores = JSON.parse(jugadoresGuardados);
    }
};

// Función para cargar jugadores predefinidos desde un archivo JSON
const cargarJugadoresPredefinidos = async () => {
    try {
        const response = await fetch('data/jugadores.json');
        if (!response.ok) throw new Error('Error al cargar los datos');
        const jugadoresPredefinidos = await response.json();

        // Filtrar jugadores que no estén ya en localStorage
        const jugadoresFiltrados = jugadoresPredefinidos.filter(jugadorPredefinido => {
            return !jugadores.some(jugador => jugador.nombre.toLowerCase() === jugadorPredefinido.nombre.toLowerCase());
        });

        // Fusionar jugadores predefinidos filtrados con los del localStorage
        jugadores = [...jugadores, ...jugadoresFiltrados];
        guardarEnLocalStorage(); // Guardar la lista completa en localStorage
    } catch (error) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Hubo un problema al cargar los jugadores predefinidos. Por favor, inténtalo de nuevo.',
        });
    } finally {
        Swal.fire("Operación completada", "Los jugadores predefinidos han sido procesados. Si quieres comenzar con nuevos jugadores has clic en 'Eiminar Todos los Jugadores'", "success");
    }
};

// Llama a las funciones para cargar datos
cargarDesdeLocalStorage();
cargarJugadoresPredefinidos();

// Funciones relacionadas con la manipulación de datos

// Función para agregar un nuevo jugador
const agregarJugador = (nombre) => {
    if (jugadores.some(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase())) {
        throw new Error('El jugador ya existe.');
    }
    const nuevoJugador = {
        nombre: nombre,
        puntajes: Array(10).fill(null) // Inicializar 10 rondas con null
    };
    jugadores.push(nuevoJugador);
    guardarEnLocalStorage();
};

// Función para eliminar un jugador por su nombre
const eliminarJugadorPorNombre = (nombre) => {
    const index = jugadores.findIndex(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase());
    if (index === -1) {
        throw new Error('Jugador no encontrado.');
    }
    jugadores.splice(index, 1);
    guardarEnLocalStorage();
};

// Función para actualizar el puntaje de un jugador en una ronda específica
const actualizarPuntaje = (nombre, ronda, puntaje) => {
    const jugador = jugadores.find(jugador => jugador.nombre.toLowerCase() === nombre.toLowerCase());
    if (!jugador) {
        throw new Error('Jugador no encontrado.');
    }
    if (ronda < 1 || ronda > 10) {
        throw new Error('Ronda inválida.');
    }
    jugador.puntajes[ronda - 1] = puntaje;
    guardarEnLocalStorage();
};