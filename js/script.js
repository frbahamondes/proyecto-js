let nombre = prompt ('Ingresa tu nombre');
let apellido = prompt ('Ingresa tu apellido');
let confirmarNombreApellido = confirm ('Confirmas que tu nombre es '+nombre +" " +apellido);
let nombreCompleto = nombre + " " + apellido;
console.log("Bienvenido/a", nombreCompleto);

let platoElegido = prompt ('¿Qué quieres comer?');

alert ('Hoy es un día lindo para comer ' +platoElegido +", " +nombre);

let platoPrincipal = 1000;
let bebida = 400;
let totalPedido = platoPrincipal+bebida;

let confirmar = confirm ('El precio total de este pedido es de ' +totalPedido + " " +"¿Confirmas tu pedido?");

let edadMinima= parseInt (prompt("Ingrese su edad"))

if (edadMinima<18){
    console.warn("Vuelve a tu casa");
    alert ('Eres un un bebé, vuelve cuando tengas 18...')
} else if (edadMinima>40){
    console.warn("Estás un poco mayor...");
    alert ('¿No estás un poco grande para venir a la disco?')
}else{
    console.log("Bienvenido a la disco!")
    alert ('¡Bienvenido a la disco más cool!')
}