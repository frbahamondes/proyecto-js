Proyecto de Gestión de Jugadores - Juego de Carioca

Descripción del Proyecto
Este proyecto es una aplicación web diseñada para gestionar los jugadores y sus puntajes en el juego de cartas Carioca. La aplicación permite agregar, eliminar, y actualizar jugadores, además de visualizar sus puntajes acumulados a lo largo de varias rondas. La interfaz es amigable y fácil de usar, con un diseño responsivo y una funcionalidad optimizada para manejar los datos de forma persistente.

Funcionalidades Principales
Agregar Jugadores: Puedes agregar hasta 10 jugadores a la partida. Cada jugador tiene un nombre único y 10 rondas de puntajes.
Eliminar Jugadores: Es posible eliminar un jugador individualmente o todos los jugadores de una sola vez.
Actualizar Puntajes: Los puntajes de cada ronda se pueden actualizar directamente desde la interfaz.
Visualización de Puntajes: Los puntajes acumulados se calculan y muestran automáticamente para cada jugador.
Carrusel de Jugadores: La aplicación incluye un carrusel que permite navegar entre los jugadores de manera intuitiva.
Persistencia de Datos: Los jugadores y sus puntajes se almacenan en localStorage, lo que permite mantener los datos incluso después de refrescar la página.
Cumplimiento de la Consigna del Profesor
Este proyecto cumple con todos los requisitos y recomendaciones del profesor:

Uso de Múltiples Archivos JS: El proyecto está modularizado en dos archivos JavaScript (app.js y data.js), donde se manejan las operaciones de interfaz y datos respectivamente.
Array de Objetos en JSON: Se utiliza un archivo jugadores.json para cargar jugadores predefinidos mediante un fetch.
Uso de fetch: El proyecto realiza una petición fetch para cargar el archivo JSON con los datos de los jugadores.
Manipulación del DOM y Eventos: Se manejan los eventos de usuario y se actualiza dinámicamente el DOM para reflejar los cambios en la interfaz.
Persistencia de Datos con localStorage: Los jugadores y sus puntajes se guardan en localStorage, permitiendo que los datos persistan entre sesiones.
Mejora de la Experiencia del Usuario con SweetAlert: Todas las alertas y mensajes de validación se muestran de manera estilizada utilizando SweetAlert, lo que mejora la experiencia del usuario.
Remoción de DOMContentLoaded: El código ahora utiliza el atributo defer en los scripts para cargar el JavaScript de manera correcta y evitar problemas comunes con el evento DOMContentLoaded.

INSTRUCCIONES DE USO
----------------------
Abre el Proyecto en tu Navegador:
Navega al archivo index.html y ábrelo en tu navegador preferido.

Interacción con la Aplicación:

Agregar Jugadores: Introduce un nombre en el campo "Nombre del jugador" y haz clic en "Agregar Jugador".
Eliminar Jugadores: Utiliza el botón "Eliminar" para eliminar un jugador específico, o el botón "Eliminar Todos los Jugadores" para reiniciar la lista.
Actualizar Puntajes: Introduce los puntajes en las rondas correspondientes. Los cambios se guardarán automáticamente.
Visualizar Puntajes: Los puntajes acumulados se muestran al final de la página en la sección correspondiente.
Comentarios Adicionales
Experiencia del Usuario: La aplicación se ha diseñado para ser intuitiva y fácil de usar, con un enfoque en la claridad y la simplicidad.
Diseño Responsivo: La interfaz se adapta a diferentes tamaños de pantalla, haciendo que la aplicación sea accesible en dispositivos móviles y de escritorio.
Código Limpio y Modular: El código está organizado de manera que sea fácil de mantener y extender en el futuro, con una clara separación de responsabilidades entre los archivos JS.