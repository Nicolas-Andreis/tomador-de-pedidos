// codigo para cambiar retiro a delivery
const deliveryButton = document.getElementById('delivery-button');
const retiroButton = document.getElementById('retiro-button');
const deliveryContenido = document.getElementById('delivery-contenido');
const retiroContenido = document.getElementById('retiro-contenido');

deliveryButton.addEventListener('click', () => {
    deliveryButton.classList.add('active');
    retiroButton.classList.remove('active');
    deliveryContenido.classList.add('active');
    retiroContenido.classList.remove('active');
});

retiroButton.addEventListener('click', () => {
    retiroButton.classList.add('active');
    deliveryButton.classList.remove('active');
    retiroContenido.classList.add('active');
    deliveryContenido.classList.remove('active');
}); 
// codigo para cambiar retiro a delivery


//horario de apertura 
const abiertoDiv = document.querySelector('.abierto');
const horaActual = new Date();
const horaActualNumero = horaActual.getHours() + horaActual.getMinutes() / 60;

const horariosAbierto = [
    { inicio: 11.9833, fin: 14.25 }, // 11:59 am - 2:15 pm
    { inicio: 19.5, fin: 23.25 }    // 7:30 pm - 11:15 pm
];

let abierto = false;

for (const horario of horariosAbierto) {
    if (horaActualNumero >= horario.inicio && horaActualNumero <= horario.fin) {
        abierto = true;
        break;
    }
}

if (abierto) {
    abiertoDiv.innerHTML = '<p>abierto</p>';
} else {
    abiertoDiv.innerHTML = '<p>cerrado</p>';
}

// horario de apertura


//modal de horarios
const verHorariosButton = document.getElementById('ver-horarios-button');
const horariosModal = document.getElementById('horariosModal');
const closeBtn = horariosModal.querySelector('.close');

verHorariosButton.addEventListener('click', () => {
  horariosModal.style.display = 'block';
});

closeBtn.addEventListener('click', () => {
  horariosModal.style.display = 'none';
});

window.addEventListener('click', (event) => {
  if (event.target === horariosModal) {
    horariosModal.style.display = 'none';
  }
});

//modal de horarios


//corazon card


//corazon card




//prentrega coderhouse  //////////////////////////////////////
// Función para obtener el nombre del cliente
function obtenerNombreCliente() {
    let nombre = prompt(`Ingrese su nombre`);
    return nombre;
}

// Función para mostrar el mensaje de despedida
function mostrarDespedida(nombre) {
    alert(`Gracias por visitarnos, ${nombre}. ¡Esperamos verte pronto nuevamente!`);
}

// Función para mostrar el total de la compra
function mostrarTotalCompra(total) {
    alert(`El total de su compra es: ${total}`);
}

// Función para realizar el proceso de compra de pizzas
function realizarCompra(pizzas) {
    let totalCompra = 0;
    let detalleCompra = '';
    let seguirComprando = true;

    do {
        let compra = parseInt(prompt(`Qué pizza quiere comprar?\nIndique un número 1, 2, 3, 4 (solo números)
        \n1 Pizza Muzzarella $2530 \n2 Pizza Especial $3150 \n3 Pizza Napolitana $2870 \n4 Pizza Fuggazza $2810`));

        // Recorremos el array de pizzas utilizando un bucle for...of
        for (let pizza of pizzas) {
            if (compra === pizza.id) { // Si la compra coincide con el id de la pizza
                totalCompra += pizza.precio; // Sumamos el precio al total de la compra
                detalleCompra += `Tu compra de ${pizza.nombre} valor: $${pizza.precio} ha sido exitosa!\n`; // Agregamos el detalle de la compra
            }
        }

        // Validamos si el número de compra es inválido
        if (compra < 1 || compra > pizzas.length) {
            alert("No disponemos esa variedad o el número ingresado no es válido.");
        }

        // Preguntamos si el cliente desea seguir comprando
        seguirComprando = confirm("¿Desea comprar otra pizza?");
    } while (seguirComprando);

    // Llamamos a la función para mostrar el total de la compra
    mostrarTotalCompra("$" + totalCompra);

    // Mostramos el detalle de la compra
    alert(detalleCompra);
}

// Función para saludar al cliente y comenzar el flujo
function saludar() {
    let nombreCliente = obtenerNombreCliente(); // Obtener el nombre del cliente
    alert(`Hola ${nombreCliente}, Bienvenido a nuestra pizzeria`);

    let decision = prompt(`Indique 1 o 2 (solo números)\n1 Quiero hacer un pedido\n2 No quiero ver opciones`);

    if (decision === "1") { // Si el cliente decide hacer un pedido
        // Creamos un array de objetos que representan las pizzas disponibles
        let pizzas = [
            { id: 1, nombre: 'Pizza Muzzarella', precio: 2530 },
            { id: 2, nombre: 'Pizza Especial', precio: 3150 },
            { id: 3, nombre: 'Pizza Napolitana', precio: 2870 },
            { id: 4, nombre: 'Pizza Fuggazza', precio: 2810 }
        ];

        alert("Estas son nuestras pizzas:\n");

        // Mostramos las opciones de pizzas disponibles
        for (let pizza of pizzas) {
            alert(`${pizza.nombre}           $${pizza.precio}`);
        }

        // Llamamos a la función para que el cliente realice la compra
        realizarCompra(pizzas);

    } else if (decision === "2") { // Si el cliente no desea hacer un pedido
        alert(`Esperamos verte pronto.`);
    } else {
        alert("Error, no indicó 1 o 2"); // Si la opción ingresada es inválida
    }

    // Llamamos a la función para mostrar el mensaje de despedida
    mostrarDespedida(nombreCliente);
}

// Llamamos a la función para comenzar el flujo de interacción con el cliente
saludar();