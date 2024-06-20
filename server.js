// creamos app con express
const express = require('express');
const app = express();
// la pasamos a servidor http
const server = require('http').Server(app);
//servidor de websocket
const io = require('socket.io')(server)
// indicamos donde se alojan los ficheros estaticos
app.use(express.static('public'));

// lista vacía para almacenar los tickets
let tickets = []; 
let ticketActual = null;
// let atendidosPorDia = {};

io.on('connection', (socket) => {
    console.log('Nuevo cliente conectado');

    // envia el estado actual al nuevo cliente conectado
    const estadoActual = tickets.map(ticket => ({
        numero: ticket.numero,
        indice: ticket.indice
    }));
    socket.emit('estado-actual', estadoActual);

    // evento generar nuevo ticket
    socket.on('nuevoTicket', () => {
        const nuevoTicket = { numero: tickets.length + 1, indice: `${tickets.length + 1}` };
        tickets.push(nuevoTicket);
        const estadoActual = tickets.map(ticket => ({
            numero: ticket.numero,
            indice: ticket.indice
        }));
        io.emit('estado-actual', estadoActual);
    });

    // cambiar numero de ticket
    socket.on('cambiarNumero', (data) => {
        if (data.ticket === 'principal' && tickets[0]) {
            tickets[0].numero = data.numero;
            const estadoActual = tickets.map(ticket => ({
                numero: ticket.numero,
                indice: ticket.indice
            }));
            io.emit('estado-actual', estadoActual);
        }
    });

    // evento cambiar indice de ticket
    socket.on('cambiarIndice', (data) => {
        if (data.ticket === 'principal' && tickets[0]) {
            tickets[0].indice = data.indice;
            const estadoActual = tickets.map(ticket => ({
                numero: ticket.numero,
                indice: ticket.indice
            }));
            io.emit('estado-actual', estadoActual);
        }
    });

    // evento cambiar al sig ticket
    socket.on('siguienteTicket', () => {
        if (tickets.length > 0) {
            ticketActual = tickets.shift();
            // const fechaHoy = new Date().toLocaleDateString();
            // atendidosPorDia[fechaHoy] = (atendidosPorDia[fechaHoy] || 0) + 1;
            tickets.push(ticketActual);
            io.emit('siguienteTicket', ticketActual);
            const estadoActual = tickets.map(ticket => ({
                numero: ticket.numero,
                indice: ticket.indice
            }));
            io.emit('estado-actual', estadoActual);
        }
    });

    socket.on('disconnect', () => {
        console.log('Cliente desconectado');
    });
});

// servidor en puerto 8080
server.listen(8080, () => {
    console.log('servidor corriendo en http://localhost:8080')
})
