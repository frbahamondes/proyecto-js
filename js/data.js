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
        jugadores = [...jugadoresPredefinidos, ...jugadores]; // Fusionar con los que están en localStorage
        guardarEnLocalStorage(); // Guardar la lista completa en localStorage
    } catch (error) {
        console.error('Hubo un problema con la carga de los datos: ', error);
    }
};

// Llama a las funciones para cargar datos
cargarDesdeLocalStorage();
cargarJugadoresPredefinidos();