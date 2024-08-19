// app.js

let currentSlide = 0; // Índice de la tarjeta actual

// Función para mostrar los jugadores en la página
const mostrarJugadores = () => {
    const jugadoresContainer = document.getElementById('jugadores-container');
    jugadoresContainer.innerHTML = ''; // Limpiar el contenedor antes de agregar los jugadores

    jugadores.forEach((jugador, index) => {
        const jugadorDiv = document.createElement('div');
        jugadorDiv.classList.add('jugador-card'); // Clase para estilizar cada jugador

        const jugadorNombre = document.createElement('h3');
        jugadorNombre.textContent = jugador.nombre;

        const jugadorPuntajes = document.createElement('ul');
        jugador.puntajes.forEach((puntaje, ronda) => {
            const li = document.createElement('li');
            li.textContent = `Ronda ${ronda + 1}: `;

            const input = document.createElement('input');
            input.type = 'number';
            input.value = puntaje !== null ? puntaje : '';
            input.addEventListener('change', () => {
                const nuevoPuntaje = parseInt(input.value, 10);
                
                if (!isNaN(nuevoPuntaje) && nuevoPuntaje >= 0) {
                    jugador.puntajes[ronda] = nuevoPuntaje;
                    guardarEnLocalStorage();
                    mostrarTotalesAcumulados();
                    mostrarMensaje(`Puntaje actualizado para la Ronda ${ronda + 1}.`, 'success');
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Por favor, ingresa un puntaje válido.',
                        footer: '<a href="agregar-jugadores.html">¿Por qué tengo este problema?</a>'
                    });
                }
            });           

            li.appendChild(input);
            jugadorPuntajes.appendChild(li);
        });

        const eliminarButton = document.createElement('button');
        eliminarButton.textContent = 'Eliminar';
        eliminarButton.addEventListener('click', () => eliminarJugador(index));

        jugadorDiv.appendChild(jugadorNombre);
        jugadorDiv.appendChild(jugadorPuntajes);
        jugadorDiv.appendChild(eliminarButton);

        jugadoresContainer.appendChild(jugadorDiv); // Agregar la tarjeta del jugador al contenedor principal
    });

    actualizarCarrusel(); // Asegura que el carrusel se actualice correctamente
};

// Función para actualizar la posición del carrusel
const actualizarCarrusel = () => {
    const jugadoresContainer = document.querySelector('.carrusel');
    jugadoresContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
};

document.getElementById('prev-btn').addEventListener('click', () => {
    if (currentSlide > 0) {
        currentSlide--;
        actualizarCarrusel();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (currentSlide < jugadores.length - 1) {
        currentSlide++;
        actualizarCarrusel();
    }
});

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

// Función para mostrar un mensaje en la interfaz (anteriormente)
// Reemplazada por SweetAlert en los casos específicos
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

    // Validar si el nombre está vacío o contiene solo espacios
    if (nombreJugador === '') {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre del jugador no puede estar vacío.',
            footer: '<a href="agregar-jugadores.html">¿Por qué tengo este problema?</a>'
        });
        return;
    }

    // Validar si el nombre contiene números
    const contieneNumeros = /\d/;
    if (contieneNumeros.test(nombreJugador)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El nombre del jugador no puede contener números.',
            footer: '<a href="agregar-jugadores.html">¿Por qué tengo este problema?</a>'
        });
        return;
    }

    // Validar si ya existen 10 jugadores
    if (jugadores.length >= 10) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No se pueden agregar más de 10 jugadores.',
            footer: '<a href="agregar-jugadores.html">¿Por qué tengo este problema?</a>'
        });
        return;
    }

    // Validar si ya existe un jugador con el mismo nombre
    if (jugadores.some(jugador => jugador.nombre.toLowerCase() === nombreJugador.toLowerCase())) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Ya existe un jugador con ese nombre.',
            footer: '<a href="agregar-jugadores.html">¿Por qué tengo este problema?</a>'
        });
        return;
    }

    // Si pasa todas las validaciones, agregar el nuevo jugador
    const nuevoJugador = {
        nombre: nombreJugador,
        puntajes: Array(10).fill(null) // Inicializar 10 rondas con null para permitir puntajes de 0
    };
    jugadores.push(nuevoJugador);
    document.getElementById('nombre-jugador').value = ''; // Limpiar el campo de entrada
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `Jugador ${nombreJugador} agregado.`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    });
});

// Función para eliminar jugador individual
const eliminarJugador = (index) => {
    const nombre = jugadores[index].nombre;
    jugadores.splice(index, 1);
    mostrarJugadores();
    guardarEnLocalStorage();
    mostrarTotalesAcumulados();
    Swal.fire({
        icon: 'success',
        title: '¡Jugador Eliminado!',
        text: `Jugador ${nombre} ha sido eliminado.`,
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6'
    });
};

// Función para eliminar todos los jugadores usando SweetAlert
document.getElementById('eliminar-todos').addEventListener('click', () => {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "¡No podrás revertir esto!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Sí, bórralos!",
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma, elimina todos los jugadores
            jugadores = [];
            guardarEnLocalStorage(); // Limpia el localStorage
            mostrarJugadores(); // Refresca la vista para mostrar que no hay jugadores
            mostrarTotalesAcumulados(); // Actualiza los totales acumulados
            Swal.fire({
                title: "¡Eliminados!",
                text: "Todos los jugadores han sido eliminados.",
                icon: "success"
            });
        }
    });
});

// Inicializar la página mostrando jugadores y totales
mostrarJugadores();
mostrarTotalesAcumulados();