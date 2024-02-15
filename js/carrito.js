document.addEventListener("DOMContentLoaded", function () {

    //llamado a productos en carrito de localstorage
    let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito);

    //llamado de nodos
    const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
    const contenedorCarritoProductos = document.querySelector("#carrito-productos");
    const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
    const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
    let botonesEliminar = document.querySelectorAll(".trash-btn");
    const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
    const contenedorTotal = document.querySelector("#total");
    const botonComprar = document.querySelector("#carrito-acciones-comprar");
    const paso1 = document.querySelector("#paso1");
    const paso2 = document.querySelector("#paso2");
    const paso3 = document.querySelector("#paso3");
    const envio = document.querySelector("#envioForm");
    const retiro = document.querySelector("#retiroLocalForm");
    const radioEnvio = document.getElementById("envio");
    const radioRetiroLocal = document.getElementById("retiroLocal");
    const btnContinuarRetiro = document.getElementById("continuarPaso2Retiro");
    const btnContinuarEnvio = document.getElementById("continuarPaso2Envio");
    const btnContinuarPago = document.getElementById("siguientePasoPago");
    const titulo = document.getElementById("micarriTitle");
    const enviarPedido = document.getElementById("enviarPedido");

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
                    <div class="card-texto">
                        <p>${producto.nombre}</p>
                        <p>$${producto.precio}</p>
                    </div>
                    
                    <div class="card-iconos">
                        <div>
                            <p>$${producto.precio * producto.cantidad}</p>
                        </div>
                        <div class="contador">
                            <img src="../imagenes/iconos/basura/minus.png" alt="trash" class="trash-btn" id="${producto.nombre}">
                            <p>${producto.cantidad}</p>
                            <img src="../imagenes/iconos/shopping cart/sum.png" alt="sum" class="sum-btn" id="${producto.nombre}">
                        </div>
                    </div>
                </div>
            `;
                contenedorCarritoProductos.append(div);
            });
        } else {
            contenedorCarritoVacio.classList.remove("disabled"); //si no hay productos en el carritos, que se muestre
            contenedorCarritoProductos.classList.add("disabled"); //ocultar
            contenedorCarritoAcciones.classList.add("disabled"); //ocultar
            contenedorCarritoComprado.classList.add("disabled"); //ocultar
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


        const botonesSumar = document.querySelectorAll(".sum-btn");
        botonesSumar.forEach(boton => {
            boton.addEventListener("click", sumarProducto);
        });
    }

    function eliminarDelCarrito(e) {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })

        Toast.fire({
            icon: 'error',
            title: 'Producto eliminado',
            color: 'white',
            background: "linear-gradient(to right, #000000, #EB5757)",
            borderRadius: ".5rem",
            textTransform: "uppercase",
            fontSize: ".75rem",
            timerProgressBarColor: 'white',
        })

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

    function sumarProducto(e) {

        e.stopPropagation();
        const idBoton = e.currentTarget.id;
        const index = productosEnCarrito.findIndex(producto => producto.nombre === idBoton);

        if (index !== -1) {
            const productoEnCarrito = productosEnCarrito[index];
            productoEnCarrito.cantidad++;
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
    // Variable para mantener un contador de pedidos
    let numeroDeOrden = 1;
    let infoEnvio;
    function comprarCarrito() {
        // Swal.fire({
        //     position: 'center',
        //     icon: 'success',
        //     title: 'Tu compra a sido exitosa',
        //     showConfirmButton: false,
        //     timer: 1500
        // })

        // productosEnCarrito.length = 0; esto lo oculte
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        titulo.classList.add("disabled");
        // contenedorCarritoComprado.classList.remove("disabled");
        paso1.classList.remove("disabled");

        radioEnvio.addEventListener("change", function () {
            if (radioEnvio.checked) {
                document.getElementById("envioForm").classList.remove("disabled");
                document.getElementById("retiroLocalForm").classList.add("disabled");
            }
        });

        radioRetiroLocal.addEventListener("change", function () {
            if (radioRetiroLocal.checked) {
                document.getElementById("retiroLocalForm").classList.remove("disabled");
                document.getElementById("envioForm").classList.add("disabled");
            }
        });
        btnContinuarRetiro.addEventListener("click", function () {

            document.getElementById("paso1").classList.add("disabled");
        });

        btnContinuarEnvio.addEventListener("click", function () {

            document.getElementById("paso1").classList.add("disabled");
        });

        function resumenDelPedido() {
            const resumenDatos = document.querySelector("#resumen-datos");
            const productosComprados = document.querySelector("#productos-comprados");
            const pagoTotal = document.querySelector("#pago-total");
            const metodoDePago = document.querySelector("#metodo-de-pago");
            const infoAdicional = document.querySelector("#info-adicional");

            let costoEnvio = 0;
            let descuento = 0;

            // Obtener la información de envío o retiro según la selección del usuario
            const infoEnvio = radioEnvio.checked
                ? {
                    tipo: "Envío",
                    direccion: document.querySelector("#direccion").value,
                    telefono: document.querySelector("#telefono").value,
                }
                : {
                    tipo: "Retiro en el Local",
                    nombre: document.querySelector("#nombre").value,
                    telefonoRetiro: document.querySelector("#telefonoRetiro").value,
                };

            // Calcular el costo de envío o el descuento
            if (radioEnvio.checked) {
                costoEnvio = 470;
            } else {
                descuento = 0; // 10% de descuento
            }

            // Crear una lista de productos comprados en formato de lista HTML
            const listaProductosHTML = productosEnCarrito.map(producto => `
                <li>${producto.cantidad} x ${producto.nombre} - $${producto.cantidad * producto.precio}</li>
            `).join("<br>"); // Usamos join para convertir la lista en una cadena separada por saltos de línea

            // Calcular el total de la compra
            let totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

            // Actualizar los elementos HTML con la información del resumen
            resumenDatos.innerHTML = `
                <h3>${infoEnvio.tipo} </h3>
                <p>Dirección: ${infoEnvio.direccion || ""}</p>
                <p>Cliente: ${infoEnvio.nombre || ""}</p>
                <p>Teléfono: ${infoEnvio.telefono || infoEnvio.telefonoRetiro || ""}</p>
            `;

            productosComprados.innerHTML = `
                ${listaProductosHTML}
            `;

            // // Obtener el método de pago seleccionado
            // const metodoPagoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked');

            // if (metodoPagoSeleccionado) {
            //     metodoDePago.innerHTML = `
            //         <p>${metodoPagoSeleccionado.value}</p>
            //     `;
            // }

            // Mostrar la información adicional
            infoAdicional.innerHTML = '';
            if (radioEnvio.checked) {
                infoAdicional.innerHTML += `<p>Costo de envío: $${costoEnvio}</p>`;
            }

            // Agregar costo de envío y aplicar descuento al total
            totalCalculado += costoEnvio;
            totalCalculado -= totalCalculado * descuento;

            pagoTotal.innerHTML = `
                <p>Total: $${totalCalculado}</p>
            `;
            console.log("Total Calculado: " + totalCalculado);
        }

        btnContinuarRetiro.addEventListener("click", function () {
            document.getElementById("paso3").classList.remove("disabled");
            document.getElementById("paso1").classList.add("disabled");
            resumenDelPedido();
        });
        btnContinuarEnvio.addEventListener("click", function () {
            document.getElementById("paso3").classList.remove("disabled");
            document.getElementById("paso1").classList.add("disabled");

            resumenDelPedido();
        });

       
        enviarPedido.addEventListener("click", function () {
            // Obtener los valores del formulario de envío o retiro local según la elección del usuario
            const infoEnvio = radioEnvio.checked
                ? {
                    tipo: "Envío",
                    direccion: document.querySelector("#direccion").value,
                    telefono: document.querySelector("#telefono").value,
                    nombre: document.querySelector("#nombre").value,
                    // Agrega el costo del envío según tus necesidades
                    precio: 470, // ¡Ajusta el costo del envío según tus requerimientos!
                }
                : {
                    tipo: "Retiro en el Local",
                    nombre: document.querySelector("#nombre").value,
                    telefonoRetiro: document.querySelector("#telefonoRetiro").value,
                };
        
            // Crear una orden con la información relevante y asignar un número de orden
            const orden = {
                numeroOrden: numeroDeOrden++,
                fecha: new Date(),
                productos: productosEnCarrito,
                total: calcularTotal(productosEnCarrito, infoEnvio),
                envio: infoEnvio,
                // Puedes incluir más detalles según tus necesidades
            };
        
            // Guardar la orden en el localStorage
            const ordenesGuardadas = localStorage.getItem("ordenes") || "[]";
            const ordenes = JSON.parse(ordenesGuardadas);
            ordenes.push(orden);
            localStorage.setItem("ordenes", JSON.stringify(ordenes));
        
            // Mostrar un mensaje de éxito con el número de orden
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: `Tu compra ha sido exitosa.`,
                showConfirmButton: false,
                timer: 1500
            });
        
            // Esperar un momento antes de vaciar el carrito y actualizar la vista
            setTimeout(function () {
                productosEnCarrito = [];
                localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
                cargarProductosCarrito(); // Actualizar la vista del carrito
                document.getElementById("paso3").classList.add("disabled");
            }, 1000);
        });
        
        // Ajusta la firma de la función para incluir infoEnvio
        function calcularTotal(productos, infoEnvio) {
            // Implementa la lógica para calcular el total
            let totalCalculado = productos.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);
        
            // Agrega el costo del envío al total si es una orden con envío
            if (infoEnvio && infoEnvio.tipo === "Envío") {
                totalCalculado += infoEnvio.precio || 0;
            }
        
            // Puedes agregar más lógica aquí según tus necesidades
        
            return totalCalculado;
        }
        

    }

});
