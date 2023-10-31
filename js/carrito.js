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
        Toastify({
            text: "Producto eliminado",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true,
            offset: {
                x: "4rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
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

    function sumarProducto(e) {
        Toastify({
            text: "Producto agregado",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true,
            offset: {
                x: "4rem", // horizontal axis - can be a number or a string indicating unity. eg: '2em'
                y: "2rem" // vertical axis - can be a number or a string indicating unity. eg: '2em'
            }, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #000000, #EB5757)",
                borderRadius: ".5rem",
                textTransform: "uppercase",
                fontSize: ".75rem"
            },
            onClick: function () { } // Callback after click
        }).showToast();
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
            document.getElementById("paso2").classList.remove("disabled");
            document.getElementById("paso1").classList.add("disabled");
        });

        btnContinuarEnvio.addEventListener("click", function () {
            document.getElementById("paso2").classList.remove("disabled");
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
                costoEnvio = 250;
            } else {
                descuento = 0.1; // 10% de descuento
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

            // Obtener el método de pago seleccionado
            const metodoPagoSeleccionado = document.querySelector('input[name="metodo-pago"]:checked');

            if (metodoPagoSeleccionado) {
                metodoDePago.innerHTML = `
                    <p>${metodoPagoSeleccionado.value}</p>
                `;
            }

            // Mostrar la información adicional
            infoAdicional.innerHTML = '';
            if (radioEnvio.checked) {
                infoAdicional.innerHTML += `<p>Costo de envío: $${costoEnvio}</p>`;
            } else {
                infoAdicional.innerHTML += `<p>Descuento: ${descuento * 100}%</p>`;
            }

            // Agregar costo de envío y aplicar descuento al total
            totalCalculado += costoEnvio;
            totalCalculado -= totalCalculado * descuento;

            pagoTotal.innerHTML = `
                <p>Total: $${totalCalculado}</p>
            `;
            console.log("Total Calculado: " + totalCalculado);
        }

        btnContinuarPago.addEventListener("click", function () {
            document.getElementById("paso3").classList.remove("disabled");
            document.getElementById("paso1").classList.add("disabled");
            document.getElementById("paso2").classList.add("disabled");
            resumenDelPedido();
        });

        enviarPedido.addEventListener("click", function () {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'Tu compra a sido exitosa',
                showConfirmButton: false,
                timer: 1500
            });

            // Vaciar el carrito
            productosEnCarrito = [];
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            cargarProductosCarrito(); // Actualizar la vista del carrito

            document.getElementById("paso3").classList.add("disabled");
        });
    }


    // validar direccion/////////////////////////////////////////////////////////////
    document.getElementById("continuarPaso2Envio").addEventListener("click", function () {
        var direccion = document.getElementById("direccion").value;
        var coordenadas = [
            { lat: -38.72877920047321, lng: -62.28279604771731 },
            { lat: -38.72724418581539, lng: -62.28126944034737 },
            { lat: -38.72439338377408, lng: -62.28456629531017 },
            { lat: -38.719829733075294, lng: -62.288181070153136 },
            { lat: -38.71491256835326, lng: -62.28851823182839 },
            { lat: -38.71330567180822, lng: -62.286457483253095 },
            { lat: -38.70980308025898, lng: -62.28624201456476 },
            { lat: -38.70774645072307, lng: -62.28455180475309 },
            { lat: -38.704186410743894, lng: -62.28845501375812 },
            { lat: -38.699640082565196, lng: -62.28451578374901 },
            { lat: -38.692709348251356, lng: -62.27569925981683 },
            { lat: -38.69581959087023, lng: -62.271341525418 },
            { lat: -38.697962289218815, lng: -62.2676874400408 },
            { lat: -38.69771938106904, lng: -62.26361792614513 },
            { lat: -38.69771938106904, lng: -62.26361792614513 },
            { lat: -38.69323975654183, lng: -62.251728887268264 },
            { lat: -38.69510226762035, lng: -62.24803643428165 },
            { lat: -38.69437616965158, lng: -62.246071359577975 },
            { lat: -38.696613520565045, lng: -62.24047222788343 },
            { lat: -38.70368344219037, lng: -62.24616696491019 },
            { lat: -38.70792536814638, lng: -62.243684681114516 },
            { lat: -38.709675124240114, lng: -62.24551147186648 },
            { lat: -38.712169700405354, lng: -62.24223092012662 },
            { lat: -38.71204240385786, lng: -62.23907258884102 },
            { lat: -38.72517622940475, lng: -62.22259487199366 },
            { lat: -38.74122809516418, lng: -62.242073824650234 },
            { lat: -38.73367212864735, lng: -62.25129266235875 },
            { lat: -38.73895055886765, lng: -62.25903341763549 },
            { lat: -38.736511181340255, lng: -62.262439799520415 },
            { lat: -38.73624481714682, lng: -62.26617627113095 },
            { lat: -38.73430035730841, lng: -62.26873980774614 },
            { lat: -38.73716614618817, lng: -62.272388941593555 },
            { lat: -38.72877920047321, lng: -62.28279604771731 }
            
        ];

          // Crear un objeto Geocoder
    var geocoder = new google.maps.Geocoder();

    // Configurar las restricciones para buscar solo en Bahía Blanca, Buenos Aires, Argentina
    var componentRestrictions = {
        country: "AR", // Código del país (Argentina)
        locality: "Bahía Blanca", // Ciudad o localidad (Bahía Blanca)
        administrativeArea: "B", // Provincia (Buenos Aires)
    };

    // Usar el Geocoder para validar la dirección con restricciones
    geocoder.geocode({
        'address': direccion,
        'componentRestrictions': componentRestrictions
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            var direccionLatLng = results[0].geometry.location;

            // Verificar si la dirección está dentro del polígono
            var dentroDelPolígono = google.maps.geometry.poly.containsLocation(direccionLatLng, new google.maps.Polygon({ paths: coordenadas }));

            if (dentroDelPolígono) {
                // Dirección válida y dentro del polígono, continuar con el proceso
                document.getElementById("paso2").classList.remove("disabled");
                document.getElementById("paso1").classList.add("disabled");
            } else {
                // Dirección válida, pero fuera del polígono, mostrar un mensaje de error
                alert("La dirección está fuera del área de entrega. Por favor, ingresa una dirección válida.");
                document.getElementById("paso2").classList.add("disabled");
                document.getElementById("paso1").classList.remove("disabled");
            }
        } else {
            // La dirección no existe, mostrar un mensaje de error.
            alert("La dirección no existe en Bahía Blanca, Buenos Aires, Argentina. Por favor, ingresa una dirección válida.");
            document.getElementById("paso2").classList.add("disabled");
            document.getElementById("paso1").classList.remove("disabled");
        }
    });
});

    
});
