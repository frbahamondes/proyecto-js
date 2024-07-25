// Estructura inicial de datos
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
        mostrarJugadores();
        mostrarTotalesAcumulados();
    }
};

// Función para mostrar los jugadores en la página
const mostrarJugadores = () => {
    const jugadoresContainer = document.getElementById('jugadores-container');
    jugadoresContainer.innerHTML = '';
    jugadores.forEach((jugador, index) => {
        const jugadorDiv = document.createElement('div');
        jugadorDiv.innerHTML = `
            <h3>${jugador.nombre}</h3>
            <ul>
                ${jugador.puntajes.map((puntaje, ronda) => `<li>Ronda ${ronda + 1}: ${puntaje !== null ? puntaje : 'N/A'} puntos</li>`).join('')}
            </ul>
            <button onclick="eliminarJugador(${index})">Eliminar</button>
        `;
        jugadoresContainer.appendChild(jugadorDiv);
    });
};

// Función para agregar un jugador
document.getElementById('form-jugador').addEventListener('submit', (event) => {
    event.preventDefault();
    if (jugadores.length >= 10) {
        alert('No se pueden agregar más de 10 jugadores.');
        return;
    }
    const nombreJugador = document.getElementById('nombre-jugador').value;
    const nuevoJugador = {
        nombre: nombreJugador,
        puntajes: Array(12).fill(null) // Inicializar 12 rondas con null para permitir puntajes de 0
    };
    jugadores.push(nuevoJugador);
    document.getElementById('nombre-jugador').value = '';
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
});

// Función para registrar puntajes de una ronda
document.getElementById('form-puntaje').addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroRonda = parseInt(document.getElementById('numero-ronda').value, 10) - 1; // Rondas empiezan en 0 en el array
    if (numeroRonda < 0 || numeroRonda >= 12) {
        alert('Número de ronda inválido.');
        return;
    }
    jugadores.forEach((jugador) => {
        const puntaje = parseInt(prompt(`Ingresa el puntaje de ${jugador.nombre} para la ronda ${numeroRonda + 1}:`), 10);
        if (!isNaN(puntaje)) {
            jugador.puntajes[numeroRonda] = puntaje;
        } else {
            alert(`Por favor, ingresa un puntaje válido para ${jugador.nombre}.`);
        }
    });
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
});

// Función para eliminar jugador
const eliminarJugador = (index) => {
    jugadores.splice(index, 1);
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
};

// Función para mostrar totales acumulados y quién va ganando
const mostrarTotalesAcumulados = () => {
    const listaTotales = document.getElementById('lista-totales');
    listaTotales.innerHTML = '';

    // Calcular los totales acumulados
    const totalJugadores = jugadores.map(jugador => {
        return {
            nombre: jugador.nombre,
            total: jugador.puntajes.reduce((acumulado, puntaje) => acumulado + (puntaje !== null ? puntaje : 0), 0)
        };
    });

    totalJugadores.forEach(jugador => {
        const li = document.createElement('li');
        li.textContent = `${jugador.nombre}: ${jugador.total} puntos`;
        listaTotales.appendChild(li);
    });
};

// Cargar datos desde localStorage al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    cargarDesdeLocalStorage();
    mostrarTotalesAcumulados();
});
