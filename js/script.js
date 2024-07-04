//Dar la bienvenida al juego
alert('Esta es la app para registrar los puntajes de tu juego de carioca 😊♠️♥️♣️♦️')

// Inicializar las variables de los jugadores
let nombreJugador1 = prompt('¿Cómo se llama el primer jugador?');
let nombreJugador2 = prompt('¿Cómo se llama el segundo jugador?');

// Confirmar los nombres
for (let i = 0; i < 3; i++) {
    if (confirm('Los jugadores son ' + nombreJugador1 + " y " + nombreJugador2 + ". ¿Es correcto?")) {
        alert('¡Que empiece el juego!');
        console.log('Los jugadores ' + nombreJugador1 + ' y ' + nombreJugador2 + ' han comenzado un juego nuevo.');
        break; // Salir del ciclo si los nombres son confirmados
    } else {
        alert('Reigresa los nombres de los jugadores. Intento ' + (i + 1) + '/3.')
        console.log('Reigresa los nombres de los jugadores. Intento ' + (i + 1) + '/3.')
        nombreJugador1 = prompt('Reingresa el nombre del primer jugador:');
        nombreJugador2 = prompt('Reingresa el nombre del segundo jugador:');
        if (i == 2) {
            alert('La tercera es la vencida... ¡Comencemos el juego!')
            console.log('Los jugadores que quedaron definido son: ' + nombreJugador1 + ' y ' + nombreJugador2 + '. Hora de empezar el juego.')
        }
    }
}
// Inicializar los puntajes
let puntosJugador1 = 0;
let puntosJugador2 = 0;
console.log('Puntajes iniciales: ' + nombreJugador1 + ' = ' + puntosJugador1 + ' // ' + nombreJugador2 + ' = ' + puntosJugador2)

// Definir las rondas
console.log('El carioca tiene varias rondas. Ejemplo: Un Trio (3), una escala(4), dos tríos (6), un trío y una escala (7), dos escalas (8), tres tríos (9), dos tríos y una escala (10), un trío y dos escalas (11), tres escalas (12) y escala real (12). Aunque en este juego no utilizaremos la escala real para no alargarlo tanto.')

//PRUEBA CODIGO
// Procesar las rondas en orden usando un bucle y switch
for (let ronda = 1; ronda <= 9; ronda++) {
    switch (ronda) {
        case 1:
            alert('Primera ronda: un trío.');
            break;
        case 2:
            alert('Segunda ronda: una escala.');
            break;
        case 3:
            alert('Tercera ronda: dos tríos.');
            break;
        case 4:
            alert('Cuarta ronda: un trío y una escala.');
            break;
        case 5:
            alert('Quinta ronda: dos escalas.');
            break;
        case 6:
            alert('Sexta ronda: tres tríos.');
            break;
        case 7:
            alert('Septima ronda: dos tríos y una escala.');
            break;
        case 8:
            alert('Octava ronda: un trío y dos escalas.');
            break;
        case 9:
            alert('Novena ronda: tres escalas.');
            break;
    }
    let puntajeJugador1 = parseInt(prompt('Ingresa el puntaje de ' + nombreJugador1 + ' para esta ronda:'), 10);
    let puntajeJugador2 = parseInt(prompt('Ingresa el puntaje de ' + nombreJugador2 + ' para esta ronda:'), 10);

    puntosJugador1 += puntajeJugador1; //agregué el igual para guardar el resultado de la variable.
    puntosJugador2 += puntajeJugador2;

    console.log('Puntajes después de la ronda ' + ronda + '.');
    console.log(nombreJugador1 + ': ' + puntosJugador1 + ' puntos.');
    console.log(nombreJugador2 + ': ' + puntosJugador2 + ' puntos.');

    alert('Puntajes actualizados: ' + nombreJugador1 + ' tiene ' + puntosJugador1 + ' puntos. ' + nombreJugador2 + ' tiene ' + puntosJugador2 + ' puntos.');
}

// Finalizar el juego
alert('Puntaje final: ' + nombreJugador1 + ': ' + puntosJugador1 + ', ' + nombreJugador2 + ': ' + puntosJugador2 + '.');

let ganador;
let perdedor;

if (puntosJugador1 > puntosJugador2) {
    perdedor = nombreJugador1;
    ganador = nombreJugador2;
} else {
    perdedor = nombreJugador2;
    ganador = nombreJugador1;
}

let puntajePerdedor
if (puntosJugador1 > puntosJugador2) {
    puntajePerdedor = puntosJugador1
} else if (puntosJugador2>puntosJugador1) {
    puntajePerdedor=puntosJugador2
} else{
    puntajePerdedor='empate'
}

if (puntosJugador1 == puntosJugador2) {
alert ('¡Empate!')
console.log('Los puntajes son los mismos para ambos jugadores: '+puntajePerdedor)
} else {
alert('¡'+ganador+' ha ganado el juego! El jugador con más puntos y por lo tanto el perdedor es: '+perdedor);
console.log('Juego finalizado. '+perdedor+' ha perdido con '+puntajePerdedor+' puntos.');}