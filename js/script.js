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

// Función para mostrar un mensaje en la interfaz
const mostrarMensaje = (mensaje, tipo = 'info') => {
    const mensajeDiv = document.getElementById('mensaje');
    mensajeDiv.textContent = mensaje;
    mensajeDiv.className = tipo;
    setTimeout(() => {
        mensajeDiv.textContent = '';
        mensajeDiv.className = '';
    }, 3000);
};

// Función para agregar un jugador
document.getElementById('form-jugador').addEventListener('submit', (event) => {
    event.preventDefault();
    if (jugadores.length >= 10) {
        mostrarMensaje('No se pueden agregar más de 10 jugadores.', 'error');
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
    mostrarMensaje(`Jugador ${nombreJugador} agregado.`, 'success');
});

// Función para registrar puntajes de una ronda
document.getElementById('form-puntaje').addEventListener('submit', (event) => {
    event.preventDefault();
    const numeroRonda = parseInt(document.getElementById('numero-ronda').value, 10) - 1; // Rondas empiezan en 0 en el array
    if (numeroRonda < 0 || numeroRonda >= 10) {
        mostrarMensaje('Número de ronda inválido.', 'error');
        return;
    }
    const inputsPuntajes = document.querySelectorAll('#inputs-puntajes input');
    let puntajesValidos = true;
    inputsPuntajes.forEach((input, index) => {
        const puntaje = parseInt(input.value, 10);
        if (!isNaN(puntaje)) {
            jugadores[index].puntajes[numeroRonda] = puntaje;
        } else {
            puntajesValidos = false;
            mostrarMensaje(`Por favor, ingresa un puntaje válido para ${jugadores[index].nombre}.`, 'error');
        }
        input.value = ''; // Limpiar el input después de registrar el puntaje
    });
    if (puntajesValidos) {
        mostrarJugadores();
        guardarEnLocalStorage();
        mostrarTotalesAcumulados();
        mostrarMensaje('Puntajes de la ronda registrados.', 'success');
    }
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
    const nombre = jugadores[index].nombre;
    jugadores.splice(index, 1);
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarInputsPuntajes(); // Actualizar inputs de puntajes
    mostrarMensaje(`Jugador ${nombre} eliminado.`, 'success');
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