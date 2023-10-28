

document.addEventListener("DOMContentLoaded", function () {



    const userLogin = document.getElementById("userLogin")
    let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"))

    if (usuarioLogeado === null) {
        const a = document.createElement("a")
        a.href = "pages/login.html"
        a.innerHTML = "iniciar sesion"
        userLogin.append(a)
    } else {
        // iniciarSesion.className.add("disabled")
        const p = document.createElement("p")
        const close = document.createElement("button")

        p.innerHTML = `Bienvenido ${usuarioLogeado.user}`
        close.id = "cerrar__sesion"
        close.innerHTML = "cerrar sesion"
        close.addEventListener("click", () => {
            alert(`gracias por comprar en nuestra tienda ${usuarioLogeado.user}. usuario deslogeado`)
            sessionStorage.removeItem("usuario")
            location.reload()
        })
        userLogin.appendChild(p)
        userLogin.appendChild(close)
    }

//carga de productos /////////////////////////////////////////////////////////////////////////////////////////
    // Array para almacenar los productos
    let productos = [];

    // Función para cargar los productos desde el archivo JSON
    fetch("https://nicolas-andreis.github.io/Il-pirata/productos.json")
        .then((response) => response.json())
        .then((data) => {
            productos = data; // Almacena los productos en la variable productos



            // Obtén contenedores HTML específicos donde deseas agregar tarjetas de productos
            const containerPromos = document.querySelector("#Promos");
            const containerPizzas = document.querySelector("#Pizzas");
            const containerMediasPizzas = document.querySelector("#MediasPizzas");
            const containerCombos = document.querySelector("#Combos");
            const containerBurguersSolas = document.querySelector("#BurguersSolas");
            const containerEmpanadas = document.querySelector("#Empanadas");
            const containerCalzones = document.querySelector("#Calzones");
            const containerPapas = document.querySelector("#Papas");
            const containerEnsaladas = document.querySelector("#Ensaladas");
            const containerPostres = document.querySelector("#Postres");
            const containerBebidas = document.querySelector("#Bebidas");
            const containerCervezas = document.querySelector("#Cervezas");
            const containerHelados = document.querySelector("#Helados");

            // Llama a la función agregarTarjetas para cada contenedor y lista de productos correspondiente
            agregarTarjetas(containerPromos, productos.Promos, "Promos");
            agregarTarjetas(containerPizzas, productos.Pizzas, "Pizzas");
            agregarTarjetas(
                containerMediasPizzas,
                productos.mediasPizzas,
                "MediasPizzas"
            );
            agregarTarjetas(containerCombos, productos.Combos, "Combos");
            agregarTarjetas(
                containerBurguersSolas,
                productos.BurguerSola,
                "BurguersSolas"
            );
            agregarTarjetas(containerEmpanadas, productos.Empanadas, "Empanadas");
            agregarTarjetas(containerCalzones, productos.Calzones, "Calzones");
            agregarTarjetas(containerPapas, productos.Papas, "Papas");
            agregarTarjetas(containerEnsaladas, productos.Ensaladas, "Ensaladas");
            agregarTarjetas(containerPostres, productos.Postres, "Postres");
            agregarTarjetas(containerBebidas, productos.Bebidas, "Bebidas");
            agregarTarjetas(containerCervezas, productos.Cervezas, "Cervezas");
            agregarTarjetas(containerHelados, productos.Helados, "Helados");
            // Agrega más llamadas para otras categorías aquí si es necesario

            // Actualizar botones
            actualizarBotonesAgregar();
        });


    function agregarTarjetas(container, productos, containerName) {
        // Itera a través de la lista de productos y crea una tarjeta para cada uno
        for (const producto of productos) {
            let contenedor = document.createElement("div"); // Crea un elemento div para la tarjeta
            contenedor.classList.add("card"); // Agregar la clase "card"

            // Definir el contenido HTML de la tarjeta
            contenedor.innerHTML = `
                    <img src="${producto.imagen}" alt="">
                    <div class="card-texto">
                        <p>${producto.nombre}</p>
                        <p>$${producto.precio}</p>
                    </div>
                    <div class="card-iconos">
                    
                        <div class="contador">
                        
                            <img src="./imagenes/iconos/shopping cart/sum.png" alt="+" class="sum-btn" id="${producto.nombre}" data-product-type="${containerName}">
                        </div>
                        
                    </div>
                `;

            container.appendChild(contenedor); // Agregar la tarjeta al contenedor

        }
    }


    document.addEventListener("DOMContentLoaded", () => {
        let totalCompra = 0; // Inicializa el costo total de la compra
        const contenedores = document.querySelectorAll(".card"); // Obtiene todas las tarjetas de productos

        // Itera a través de cada tarjeta de producto
        contenedores.forEach((contenedor) => {
            const imgSum = contenedor.querySelector(".contador .sum-btn");
            const precioProducto = parseInt(
                contenedor
                    .querySelector(".card-texto p:last-child")
                    .textContent.replace("$", "")
            );

            // Agrega un evento al botón de eliminar
            imgTrash.addEventListener("click", () => {
                // Reduce el costo total al multiplicar la cantidad por el precio del producto
                totalCompra -= parseInt(cantidadElement.textContent) * precioProducto;
                cantidadElement.textContent = "0"; // Restablece la cantidad a 0
            });

            // Agrega un evento al botón de aumentar la cantidad
            imgSum.addEventListener("click", () => {
                let cantidad = parseInt(cantidadElement.textContent);
                cantidad++; // Aumenta la cantidad
                cantidadElement.textContent = cantidad.toString();
            });
        });
    });
    // botones de las cards //////////////////////////////////////////////////////////////////////////////////////

    //traemos botones de la card ////////////////////////////////////////////////////////////////////////////////

    let botonesSumar = document.querySelectorAll(".sum-btn");
    console.log(botonesSumar);
    let botonesTrash = document.querySelectorAll(".trash-btn");
    const numeritos = document.querySelectorAll(".numerito");

    function actualizarBotonesAgregar() {
        botonesSumar = document.querySelectorAll(".sum-btn");

        botonesSumar.forEach((boton) => {
            boton.addEventListener("click", agregarAlcarrito);
        });

        botonesTrash.forEach((boton) => {
            boton.addEventListener("click", eliminarDelCarrito); // Agrega este event listener
        });
    }
    actualizarBotonesAgregar();

    let productosEnCarrito;
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    } else {
        productosEnCarrito = []; //queremos que lo guarde en un array los productos en carrito
    }

    function agregarAlcarrito(e) {
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
                fontSize: ".75rem",
            },
            onClick: function () { } // Callback after click
        }).showToast();
        const idBoton = e.currentTarget.id;
        const container = e.currentTarget.getAttribute("data-product-type");
        let productoAgregado;

        // Encuentra el producto en la lista correcta
        productoAgregado = productos[container].find(
            (producto) => producto.nombre === idBoton
        );

        if (productoAgregado) {
            console.log("Producto agregado al carrito:", productoAgregado);
        } else {
            console.log("Producto no encontrado en la lista.");
        }

        if (productosEnCarrito.some((producto) => producto.nombre === idBoton)) {
            const index = productosEnCarrito.findIndex(
                (producto) => producto.nombre === idBoton
            );
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
            productosEnCarrito.push(productoAgregado);
        }

        actualizarNumerito();
        localStorage.setItem(
            "productos-en-carrito",
            JSON.stringify(productosEnCarrito)
        );
    }

    function eliminarDelCarrito(e) {
        const idBoton = e.currentTarget.id;
        const container = e.currentTarget.getAttribute("data-product-type");

        // Encuentra el índice del producto en el array
        const index = productosEnCarrito.findIndex(
            (producto) => producto.nombre === idBoton
        );

        if (index !== -1) {
            // Elimina el producto del array
            productosEnCarrito.splice(index, 1);
        }
        actualizarNumerito();
    }

    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce(
            (acc, producto) => acc + producto.cantidad,
            0
        );

        const numeritos = document.querySelectorAll(".numerito"); // Obtén todos los elementos con la clase "numerito"

        numeritos.forEach((numerito) => {
            numerito.innerText = nuevoNumerito;
        });
    }





    //filtrado del buscador///////////////////////////////////////////////////////////////////////////////////
    const filterInput = document.getElementById("filterInput");

    filterInput.addEventListener("input", function () {
        const filtro = filterInput.value.toLowerCase(); // Obtener el valor del input en minúsculas

        // Obtener todos los elementos con la clase "category-group"
        const categoryGroups = document.querySelectorAll(".category-group");

        // Iterar a través de los elementos y ocultar/mostrar según el filtro
        categoryGroups.forEach((group) => {
            const groupID = group.getAttribute("id").toLowerCase();
            if (groupID.includes(filtro)) {
                group.style.display = "block"; // Mostrar elementos que coinciden
            } else {
                group.style.display = "none"; // Ocultar elementos que no coinciden
            }
        });
    });


});
