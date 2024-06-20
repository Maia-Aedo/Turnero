// buscamos los campos de la tabla en el html
const ticketPpal = document.querySelector('#ticketPpal');
const ticketSec2 = document.querySelector('#ticketSec2');
const ticketSec3 = document.querySelector('#ticketSec3');
const ticketSec4 = document.querySelector('#ticketSec4');
const lblindice1 = document.querySelector('#lblindice1');
const lblindice2 = document.querySelector('#lblindice2');
const lblindice3 = document.querySelector('#lblindice3');
const lblindice4 = document.querySelector('#lblindice4');

const socket = io();

// Verificar que los elementos existan
if (!ticketPpal || !ticketSec2 || !ticketSec3 || !ticketSec4 || !lblindice1 || !lblindice2 || !lblindice3 || !lblindice4) {
    console.error("No se encontraron todos los elementos necesarios en el DOM");
}

// evento estado actual del server
socket.on('estado-actual', (payload) => {
    console.log('Payload recibido:', payload);
    const audio = new Audio('../audio/new-ticket.mp3');
    audio.play();

    const [ticket1, ticket2, ticket3, ticket4] = payload;

    if (ticket1) {
        ticketPpal.innerText = ticket1.numero;
        lblindice1.innerText = ticket1.indice;
    }
    if (ticket2) {
        ticketSec2.innerText = ticket2.numero;
        lblindice2.innerText = ticket2.indice;
    }
    if (ticket3) {
        ticketSec3.innerText = ticket3.numero;
        lblindice3.innerText = ticket3.indice;
    }
    if (ticket4) {
        ticketSec4.innerText = ticket4.numero;
        lblindice4.innerText = ticket4.indice;
    }
});
