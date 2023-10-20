document.addEventListener("DOMContentLoaded", function () {

    // Tu código JavaScript aquí
});
let productosEnCarrito = localStorage.getItem("productos-en-carrito");
productosEnCarrito = JSON.parse(productosEnCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".trash-btn");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");

contenedorCarritoProductos.innerHTML = "";

function cargarProductosCarrito() {
    // Vacía el contenido actual del contenedor
    contenedorCarritoProductos.innerHTML = "";

    if (productosEnCarrito && productosEnCarrito.length > 0) {
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <div class="cardCarrito" id="${producto.nombre}">
                    <img src=".${producto.imagen}" alt="${producto.nombre}">
                    <div class="card-texto">
                        <p>${producto.nombre}</p>
                        <p>$${producto.precio}</p>
                    </div>
                    
                    <div class="card-iconos">
                        <div>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <div class="contador">
                            <img src="../imagenes/iconos/basura/trash.png" alt="trash" class="trash-btn" id="${producto.nombre}">
                            <p>${producto.cantidad}</p>
                        </div>
                    </div>
                </div>
            `;
            contenedorCarritoProductos.append(div);
        });
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }

    // Actualiza los botones eliminar y el total
    actualizarBotonesEliminar();
    actualizarTotal();
}
cargarProductosCarrito();




function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll(".trash-btn");

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito)
    });
}



function eliminarDelCarrito(e) {
    Toastify({
        text: "Producto eliminado",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true,
        offset: {
            x: 70, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        }, // Prevents dismissing of toast on hover
        style: {
            background: "linear-gradient(to right, #000000, #EB5757)",
            borderRadius: ".5rem",
            textTransform: "uppercase",
            fontSize: ".75rem"
        },
        onClick: function () { } // Callback after click
    }).showToast();
    e.stopPropagation(); // Detiene la propagación del evento
    const idBoton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.nombre === idBoton);

    if (index !== -1) {
        const productoEnCarrito = productosEnCarrito[index];
        if (productoEnCarrito.cantidad > 1) {
            productoEnCarrito.cantidad--;
        } else {
            productosEnCarrito.splice(index, 1);
        }

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }
}



botonVaciar.addEventListener("click", vaciarCarrito);

function vaciarCarrito() {
    Swal.fire({
        title: '¿Estás seguro?',
        icon: 'question',
        html:
            `Se van a borrar ${productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonColor: 'red',
        confirmButtonText:
            'Si',
        cancelButtonText:
            'No',
        cancelButtonAriaLabel: 'Thumbs down'
    }).then((result) => {
        if (result.isConfirmed) {
            productosEnCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito();
        }
    })


}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`;
}


botonComprar.addEventListener("click", comprarCarrito);

function comprarCarrito() {
    Swal.fire({
        position: 'center',
        icon: 'success',
        title: 'Tu compra a sido exitosa',
        showConfirmButton: false,
        timer: 1500
      })

    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
}

