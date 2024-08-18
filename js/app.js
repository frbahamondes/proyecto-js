// app.js

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
    const nombreJugador = document.getElementById('nombre-jugador').value.trim();
    
    if (jugadores.length >= 10) {
        mostrarMensaje('No se pueden agregar más de 10 jugadores.', 'error');
        return;
    }
    if (jugadores.some(jugador => jugador.nombre.toLowerCase() === nombreJugador.toLowerCase())) {
        mostrarMensaje('Ya existe un jugador con ese nombre.', 'error');
        return;
    }

    const nuevoJugador = {
        nombre: nombreJugador,
        puntajes: Array(10).fill(null) // Inicializar 10 rondas con null para permitir puntajes de 0
    };
    jugadores.push(nuevoJugador);
    document.getElementById('nombre-jugador').value = '';
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarMensaje(`Jugador ${nombreJugador} agregado.`, 'success');
});

// Función para eliminar jugador
const eliminarJugador = (index) => {
    const nombre = jugadores[index].nombre;
    jugadores.splice(index, 1);
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    mostrarMensaje(`Jugador ${nombre} eliminado.`, 'success');
};

// Inicializar la página mostrando jugadores y totales
document.addEventListener('DOMContentLoaded', () => {
    mostrarJugadores();
    mostrarTotalesAcumulados();
});