// Estructura inicial de datos
let jugadores = [];

// Función para guardar los jugadores en localStorage
const guardarEnLocalStorage = () => {
    localStorage.setItem('jugadores', JSON.stringify(jugadores));
}; // ESTA INFO PODRÍA LLEVARLA A UN ARCHIVO.JSON?

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
        
        // Crear el contenido del jugador
        const jugadorNombre = document.createElement('h3');
        jugadorNombre.textContent = jugador.nombre;

        const jugadorPuntajes = document.createElement('ul');
        jugador.puntajes.forEach((puntaje, ronda) => {
            const li = document.createElement('li');
            li.textContent = `Ronda ${ronda + 1}: `;
            
            // Crear un input para editar el puntaje
            const input = document.createElement('input');
            input.type = 'number';
            input.value = puntaje !== null ? puntaje : '';
            
            // Manejar el cambio de valor en el input
            input.addEventListener('change', () => {
                const nuevoPuntaje = parseInt(input.value, 10);
                if (!isNaN(nuevoPuntaje) && nuevoPuntaje >= 0) {
                    jugador.puntajes[ronda] = nuevoPuntaje; // Actualizar el puntaje
                    guardarEnLocalStorage(); // Guardar en localStorage
                    mostrarTotalesAcumulados(); // Actualizar totales
                    mostrarMensaje(`Puntaje actualizado para la Ronda ${ronda + 1}.`, 'success');
                } else {
                    mostrarMensaje('Por favor, ingresa un puntaje válido.', 'error');
                }
            });
            
            li.appendChild(input);
            jugadorPuntajes.appendChild(li);
        });

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.addEventListener('click', () => eliminarJugador(index));

        // Agregar elementos al contenedor del jugador
        jugadorDiv.appendChild(jugadorNombre);
        jugadorDiv.appendChild(jugadorPuntajes);
        jugadorDiv.appendChild(eliminarButton);

        // Agregar el contenedor del jugador al contenedor principal
        jugadoresContainer.appendChild(jugadorDiv);
    });
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
    if (jugadores.some(jugador => jugador.nombre.toLowerCase() === (document.getElementById('nombre-jugador').value.trim()).toLowerCase())) {
        mostrarMensaje('Ya existe un jugador con ese nombre.', 'error');
        return;
    }

    const nuevoJugador = {
        nombre: document.getElementById('nombre-jugador').value.trim(),
        puntajes: Array(10).fill(null) // Inicializar 10 rondas con null para permitir puntajes de 0
    };
    jugadores.push(nuevoJugador);
    document.getElementById('nombre-jugador').value = '';
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarInputsPuntajes(); // Mostrar inputs de puntajes al agregar jugador
    mostrarMensaje(`Jugador ${document.getElementById('nombre-jugador').value.trim()} agregado.`, 'success');
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