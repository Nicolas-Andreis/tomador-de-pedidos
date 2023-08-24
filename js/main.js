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





document.addEventListener('DOMContentLoaded', () => {
    let totalCompra = 0;
    const contenedores = document.querySelectorAll('.card');
    const productosEnPedido = {};

    contenedores.forEach(contenedor => {
        const cantidadElement = contenedor.querySelector('.contador p');
        const imgTrash = contenedor.querySelector('.contador .trash-btn');
        const imgSum = contenedor.querySelector('.contador .sum-btn');
        const nombreProducto = contenedor.querySelector('.card-texto p:first-child').textContent;
        const precioProducto = parseInt(contenedor.querySelector('.card-texto p:last-child').textContent.replace('$', ''));
        const imagenProducto = contenedor.querySelector('img').getAttribute('src');

        imgTrash.addEventListener('click', () => {
            totalCompra -= parseInt(cantidadElement.textContent) * precioProducto;
            cantidadElement.textContent = '0';
            actualizarCantidadTotal();
            eliminarProductoDePedido(nombreProducto);
            actualizarModalPedido();
        });

        imgSum.addEventListener('click', () => {
            let cantidad = parseInt(cantidadElement.textContent);
            cantidad++;
            totalCompra += precioProducto;
            cantidadElement.textContent = cantidad.toString();
            actualizarCantidadTotal();
            agregarProductoAPedido(nombreProducto, cantidad, precioProducto, imagenProducto);
            actualizarModalPedido();
        });
    });

    function actualizarCantidadTotal() {
        const cantidades = document.querySelectorAll('.card .contador p');
        const cantidadTotalElement = document.getElementById('cantidad-total');

        let cantidadTotal = 0;
        cantidades.forEach(cantidadElement => {
            cantidadTotal += parseInt(cantidadElement.textContent);
        });

        cantidadTotalElement.textContent = cantidadTotal.toString();
    }

    function agregarProductoAPedido(nombre, cantidad, precio, imagen) {
        if (!productosEnPedido[nombre]) {
            productosEnPedido[nombre] = {
                cantidad: 0,
                precio: precio,
                imagen: imagen
            };
        }

        productosEnPedido[nombre].cantidad += cantidad;
    }

    // Función para eliminar un producto del pedido
    function eliminarProductoDePedido(nombre) {
        if (productosEnPedido[nombre]) {
            totalCompra -= productosEnPedido[nombre].cantidad * productosEnPedido[nombre].precio;
            delete productosEnPedido[nombre];
        }
    }

    // Función para actualizar el modal de pedido con los detalles de los productos
// Función para actualizar el modal de pedido con los detalles de los productos
function actualizarModalPedido() {
    const pedidoDetalleElement = document.getElementById('pedido-detalle');
    const cantidadTotalElement = document.getElementById('cantidad-total');
    const totalCompraElement = document.getElementById('total-compra');

    pedidoDetalleElement.innerHTML = '';
    let cantidadTotal = 0;
    for (const nombre in productosEnPedido) {
        const producto = productosEnPedido[nombre];
        const detalleProducto = `
            <div class="detalle-producto">
                <div class="producto-info">
                    <img src="${producto.imagen}" alt="${nombre}" class="producto-imagen">
                    <div class="producto-detalle">
                        <p class="productoModal">${producto.cantidad}x ${nombre}</p>
                        <div class="containerPrecioBotones">
                        <p>$${producto.cantidad * producto.precio}</p>
                        <div class="cantidad-buttons">
                            <button class="restar-cantidad" data-producto="${nombre}">-</button>
                            <p>${producto.cantidad}</p>
                            <button class="sumar-cantidad" data-producto="${nombre}">+</button>
                        </div>
                        </div>
                        
                        <button class="eliminar-producto" data-producto="${nombre}">&times;</button>
                    </div>
                </div>
            </div>
        `;
        pedidoDetalleElement.innerHTML += detalleProducto;
        cantidadTotal += producto.cantidad;
    }

    cantidadTotalElement.textContent = cantidadTotal.toString();
    totalCompraElement.textContent = `$${totalCompra}`;

    // Agregar eventos a los botones de eliminar, sumar y restar cantidad
    const eliminarBotones = document.querySelectorAll('.eliminar-producto');
    const sumarBotones = document.querySelectorAll('.sumar-cantidad');
    const restarBotones = document.querySelectorAll('.restar-cantidad');

    eliminarBotones.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const nombreProducto = event.target.getAttribute('data-producto');
            eliminarProductoDePedido(nombreProducto);
            actualizarModalPedido();
            actualizarCantidadTotal();
        });
    });

    sumarBotones.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const nombreProducto = event.target.getAttribute('data-producto');
            const producto = productosEnPedido[nombreProducto];
            producto.cantidad++;
            totalCompra += producto.precio;
            actualizarModalPedido();
            actualizarCantidadTotal();
        });
    });

    restarBotones.forEach(btn => {
        btn.addEventListener('click', (event) => {
            const nombreProducto = event.target.getAttribute('data-producto');
            const producto = productosEnPedido[nombreProducto];
            if (producto.cantidad > 0) {
                producto.cantidad--;
                totalCompra -= producto.precio;
                actualizarModalPedido();
                actualizarCantidadTotal();
            }
        });
    });
}

    const comprarBtn = document.getElementById('comprar-btn');

    comprarBtn.addEventListener('click', () => {
        // Lógica para procesar la compra
        alert('¡Compra realizada con éxito!');
        
        // Limpia el detalle del pedido y el total de la compra
        const pedidoDetalleElement = document.getElementById('pedido-detalle');
        const totalCompraElement = document.getElementById('total-compra');
        pedidoDetalleElement.innerHTML = '';
        totalCompraElement.textContent = '$0';
        totalCompra = 0;
        productosEnPedido = {};
    });

    // Código para el modal "Ver pedido"
    const verPedidoButton = document.querySelector('.ver-pedido');
    const modalVerPedido = document.getElementById('modal-1');
    const closeVerPedido = modalVerPedido.querySelector('.close');

    verPedidoButton.addEventListener('click', () => {
        actualizarModalPedido();
        modalVerPedido.style.display = 'block';
    });

    closeVerPedido.addEventListener('click', () => {
        modalVerPedido.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === modalVerPedido) {
            modalVerPedido.style.display = 'none';
        }
    });
});














//corazon card


//corazon card


//card
const productosPizzas = [
    { id: 1, nombre: "muzzarella", precio: 2910, imagen: "./imagenes/pizzas/muzzarella.jpg" },
    { id: 2, nombre: "fugazza", precio: 3230, imagen: "./imagenes/pizzas/fuggazza.jpg" },
    { id: 3, nombre: "napolitana", precio: 3300, imagen: "./imagenes/pizzas/napolitana.jpg" },
    { id: 4, nombre: "provolone", precio: 3490, imagen: "./imagenes/pizzas/provolone.jpg" },
    { id: 5, nombre: "roquefort", precio: 3490, imagen: "./imagenes/pizzas/roquefort.jpg" },
    { id: 6, nombre: "aceitunas", precio: 3240, imagen: "./imagenes/pizzas/aceitunas.jpg" },
    { id: 7, nombre: "muzza y jamon", precio: 3300, imagen: "./imagenes/pizzas/muzzayjamon.jpg" },
    { id: 8, nombre: "especial", precio: 3620, imagen: "./imagenes/pizzas/especial.jpg" },
    { id: 9, nombre: "estacione", precio: 3620, imagen: "./imagenes/pizzas/estacione.jpg" },
    { id: 10, nombre: "j. crudo y rucula", precio: 4080, imagen: "./imagenes/pizzas/jamoncrudoyrucula.jpg" },
    { id: 11, nombre: "champinones", precio: 3720, imagen: "./imagenes/pizzas/champignones.jpg" },
    { id: 12, nombre: "alla cardille", precio: 4010, imagen: "./imagenes/pizzas/allacardille.jpg" },
    { id: 13, nombre: "alla matioli", precio: 3880, imagen: "./imagenes/pizzas/allamattioli.jpg" },
    { id: 14, nombre: "huevo y cebolla", precio: 3880, imagen: "./imagenes/pizzas/huevoycebolla.jpg" },
    { id: 15, nombre: "palmitos", precio: 4010, imagen: "./imagenes/pizzas/palmitos.jpg" },
    { id: 16, nombre: "primavera", precio: 3820, imagen: "./imagenes/pizzas/primavera.jpg" },
    { id: 17, nombre: "calabresa", precio: 3880, imagen: "./imagenes/pizzas/calabresa.jpg" },
    { id: 18, nombre: "wok de verduras", precio: 3880, imagen: "./imagenes/pizzas/wokdeverduras.jpg" },
    { id: 19, nombre: "giuseppe", precio: 3620, imagen: "./imagenes/pizzas/giussepe.jpg" },
    { id: 20, nombre: "hawaiana", precio: 3880, imagen: "./imagenes/pizzas/hawaiana.jpg" },
    { id: 21, nombre: "margarita", precio: 3880, imagen: "./imagenes/pizzas/margarita.jpg" },
    { id: 22, nombre: "alla reina", precio: 4010, imagen: "./imagenes/pizzas/allareina.jpg" },
    { id: 23, nombre: "cantimpalo", precio: 3880, imagen: "./imagenes/pizzas/cantimpalo.jpg" },
    { id: 24, nombre: "del mar", precio: 4470, imagen: "./imagenes/pizzas/delmar.jpg" },
    { id: 25, nombre: "apio y nuez", precio: 3880, imagen: "./imagenes/pizzas/apioynuez.jpg" },
    { id: 26, nombre: "pollo", precio: 4530, imagen: "./imagenes/pizzas/pollo.jpg" },
    { id: 27, nombre: "a tu gusto", precio: 4730, imagen: "./imagenes/pizzas/atugusto.jpg" },
    { id: 28, nombre: "roque y panceta", precio: 4080, imagen: "./imagenes/pizzas/roquefortypanceta.jpg" },
    { id: 29, nombre: "panceta y huevo", precio: 4470, imagen: "./imagenes/pizzas/pancetayhuevo.jpg" },
    { id: 30, nombre: "americana", precio: 4730, imagen: "./imagenes/pizzas/americana.jpg" },
    { id: 31, nombre: "cuatro quesos", precio: 4400, imagen: "./imagenes/pizzas/cuatroquesos.jpg" },
    { id: 32, nombre: "alla pirata", precio: 4340, imagen: "./imagenes/pizzas/allapirata.jpg" },
];

const productosMediasPizzas = [
    { id: 1, nombre: "muzzarella", precio: 1540, imagen: "./imagenes/pizzas/muzzarella.jpg" },
    { id: 2, nombre: "fugazza", precio: 1700, imagen: "./imagenes/pizzas/fuggazza.jpg" },
    { id: 3, nombre: "napolitana", precio: 1740, imagen: "./imagenes/pizzas/napolitana.jpg" },
    { id: 4, nombre: "provolone", precio: 1830, imagen: "./imagenes/pizzas/provolone.jpg" },
    { id: 5, nombre: "roquefort", precio: 1830, imagen: "./imagenes/pizzas/roquefort.jpg" },
    { id: 6, nombre: "aceitunas", precio: 1710, imagen: "./imagenes/pizzas/aceitunas.jpg" },
    { id: 7, nombre: "muzza y jamon", precio: 1740, imagen: "./imagenes/pizzas/muzzayjamon.jpg" },
    { id: 8, nombre: "especial", precio: 1900, imagen: "./imagenes/pizzas/especial.jpg" },
    { id: 9, nombre: "estacione", precio: 1900, imagen: "./imagenes/pizzas/estacione.jpg" },
    { id: 10, nombre: "j. crudo y rucula", precio: 2150, imagen: "./imagenes/pizzas/jamoncrudoyrucula.jpg" },
    { id: 11, nombre: "champinones", precio: 1950, imagen: "./imagenes/pizzas/champignones.jpg" },
    { id: 12, nombre: "alla cardille", precio: 2100, imagen: "./imagenes/pizzas/allacardille.jpg" },
    { id: 13, nombre: "alla matioli", precio: 2040, imagen: "./imagenes/pizzas/allamattioli.jpg" },
    { id: 14, nombre: "huevo y cebolla", precio: 2040, imagen: "./imagenes/pizzas/huevoycebolla.jpg" },
    { id: 15, nombre: "palmitos", precio: 2100, imagen: "./imagenes/pizzas/palmitos.jpg" },
    { id: 16, nombre: "primavera", precio: 2010, imagen: "./imagenes/pizzas/primavera.jpg" },
    { id: 17, nombre: "calabresa", precio: 2040, imagen: "./imagenes/pizzas/calabresa.jpg" },
    { id: 18, nombre: "wok de verduras", precio: 2040, imagen: "./imagenes/pizzas/wokdeverduras.jpg" },
    { id: 19, nombre: "giuseppe", precio: 1910, imagen: "./imagenes/pizzas/giussepe.jpg" },
    { id: 20, nombre: "hawaiana", precio: 2100, imagen: "./imagenes/pizzas/hawaiana.jpg" },
    { id: 21, nombre: "margarita", precio: 2040, imagen: "./imagenes/pizzas/margarita.jpg" },
    { id: 22, nombre: "alla reina", precio: 2100, imagen: "./imagenes/pizzas/allareina.jpg" },
    { id: 23, nombre: "cantimpalo", precio: 2040, imagen: "./imagenes/pizzas/cantimpalo.jpg" },
    { id: 24, nombre: "del mar", precio: 2340, imagen: "./imagenes/pizzas/delmar.jpg" },
    { id: 25, nombre: "apio y nuez", precio: 2040, imagen: "./imagenes/pizzas/apioynuez.jpg" },
    { id: 26, nombre: "pollo", precio: 2370, imagen: "./imagenes/pizzas/pollo.jpg" },
    { id: 27, nombre: "a tu gusto", precio: 2470, imagen: "./imagenes/pizzas/atugusto.jpg" },
    { id: 28, nombre: "roque y panceta", precio: 2150, imagen: "./imagenes/pizzas/roquefortypanceta.jpg" },
    { id: 29, nombre: "panceta y huevo", precio: 2340, imagen: "./imagenes/pizzas/pancetayhuevo.jpg" },
    { id: 30, nombre: "americana", precio: 2470, imagen: "./imagenes/pizzas/americana.jpg" },
    { id: 31, nombre: "cuatro quesos", precio: 2310, imagen: "./imagenes/pizzas/cuatroquesos.jpg" },
    { id: 32, nombre: "alla pirata", precio: 2280, imagen: "./imagenes/pizzas/allapirata.jpg" },
];

const productosCombos = [
    { id: 1, nombre: "combo pirata", precio: 2580, imagen: "./imagenes/burguers/burguerpirata.jpg" },
    { id: 2, nombre: "combo barbacoa", precio: 2680, imagen: "./imagenes/burguers/burguerbbq.jpg" },
    { id: 3, nombre: "combo corazon azul", precio: 2680, imagen: "./imagenes/burguers/burgurguercorazonazul.jpg" },
    { id: 4, nombre: "combo inmortal", precio: 3720, imagen: "./imagenes/burguers/burguerinmortal.jpg" },    
];

const productosBurguerSola = [
    { id: 1, nombre: "combo pirata", precio: 2580, imagen: "./imagenes/burguers/burguerpirata.jpg" },
    { id: 2, nombre: "combo barbacoa", precio: 2680, imagen: "./imagenes/burguers/burguerbbq.jpg" },
    { id: 3, nombre: "combo corazon azul", precio: 2680, imagen: "./imagenes/burguers/burgurguercorazonazul.jpg" },
    { id: 4, nombre: "combo inmortal", precio: 3720, imagen: "./imagenes/burguers/burguerinmortal.jpg" },    
];

function agregarTarjetas(container, productos) {
    for (const producto of productos) {
        let contenedor = document.createElement("div");
        contenedor.classList.add("card"); // Agregar la clase "card"
    
        // Definir el contenido HTML de la tarjeta
        contenedor.innerHTML = `
            <img src="${producto.imagen}" alt="">
            <div class="card-texto">
                <p>${producto.nombre}</p>
                <p>$${producto.precio}</p>
            </div>
            <div class="card-iconos">
                <img src="./imagenes/iconos/corazon/heart.png" alt="corazon" class="heart">
                
                <div class="contador">
                    <img src="./imagenes/iconos/basura/trash.png" alt="trash" class="trash-btn">
                    <p>0</p>
                    <img src="./imagenes/iconos/shopping cart/sum.png" alt="+" class="sum-btn">
                </div>
            </div>
        `;
    
        container.appendChild(contenedor); // Agregar la tarjeta al contenedor
    }
}

const containerPizzas = document.querySelector("#Pizzas");
const containerMediasPizzas = document.querySelector("#MediasPizzas");
const containerCombos = document.querySelector("#Combos");
const containerBurguersSolas = document.querySelector("#BurguersSolas");

agregarTarjetas(containerPizzas, productosPizzas);
agregarTarjetas(containerMediasPizzas, productosMediasPizzas);
agregarTarjetas(containerCombos, productosCombos);
agregarTarjetas(containerBurguersSolas, productosBurguerSola);