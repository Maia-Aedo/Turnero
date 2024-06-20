const socket = io();

// crear nuevo ticket
function nuevoTicket() {
    socket.emit('nuevoTicket');
}

// Avanzar al siguiente ticket
function siguienteTicket() {
    socket.emit('siguienteTicket');
}

// cambiar numero de ticket
function cambiarNumero() {
    const newNumero = document.querySelector('#number').value;
    if (newNumero) {
        socket.emit('cambiarNumero', { ticket: 'principal', numero: newNumero });
    }
}

// cambiar indice de ticket
function cambiarIndice() {
    const newIndice = document.querySelector('#indice').value;
    if (newIndice) {
        socket.emit('cambiarIndice', { ticket: 'principal', indice: newIndice });
    }
}