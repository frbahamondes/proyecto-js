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
        mostrarInputsPuntajes(); // Mostrar inputs de puntajes al cargar jugadores
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
    mostrarInputsPuntajes(); // Actualizar inputs de puntajes al mostrar jugadores
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
        puntajes: Array(10).fill(null) // Inicializar 10 rondas con null para permitir puntajes de 0
    };
    jugadores.push(nuevoJugador);
    document.getElementById('nombre-jugador').value = '';
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarInputsPuntajes(); // Mostrar inputs de puntajes al agregar jugador
});

// Función para registrar puntajes de una ronda
document.getElementById('form-puntaje').addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroRonda = parseInt(document.getElementById('numero-ronda').value, 10) - 1; // Rondas empiezan en 0 en el array
    if (numeroRonda < 0 || numeroRonda >= 10) {
        alert('Número de ronda inválido.');
        return;
    }
    const inputsPuntajes = document.querySelectorAll('#inputs-puntajes input');
    inputsPuntajes.forEach((input, index) => {
        const puntaje = parseInt(input.value, 10);
        if (!isNaN(puntaje)) {
            jugadores[index].puntajes[numeroRonda] = puntaje;
        } else {
            alert(`Por favor, ingresa un puntaje válido para ${jugadores[index].nombre}.`);
        }
        input.value = ''; // Limpiar el input después de registrar el puntaje
    });
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
});

// Función para mostrar inputs de puntajes para cada jugador
const mostrarInputsPuntajes = () => {
    const inputsPuntajes = document.getElementById('inputs-puntajes');
    inputsPuntajes.innerHTML = '';
    jugadores.forEach((jugador, index) => {
        const input = document.createElement('input');
        input.type = 'number';
        input.placeholder = `Puntaje de ${jugador.nombre}`;
        input.id = `puntaje-${index}`;
        inputsPuntajes.appendChild(input);
    });
};

// Función para eliminar jugador
const eliminarJugador = (index) => {
    jugadores.splice(index, 1);
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarInputsPuntajes(); // Actualizar inputs de puntajes
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
cargarDesdeLocalStorage();
mostrarTotalesAcumulados();
