document.addEventListener("DOMContentLoaded", function () {
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

//filtrado del buscador///////////////////////////////////////////////////////////////////////////////////


//inicio de sesion////////////////////////////////////////////////////////////////////////////////////////
    const userLogin = document.getElementById("userLogin");
    let usuarioLogeado = JSON.parse(sessionStorage.getItem("usuario"));

    if (usuarioLogeado === null) {
        const a = document.createElement("a");
        a.href = "pages/login.html";
        a.innerHTML = "iniciar sesion";
        userLogin.append(a);
    } else {
        const p = document.createElement("p");
        const close = document.createElement("button");

        p.innerHTML = `Bienvenido ${usuarioLogeado.user}`;
        close.id = "cerrar__sesion";
        close.innerHTML = "cerrar sesion";
        close.addEventListener("click", () => {
            alert(
                `gracias por comprar en nuestra tienda ${usuarioLogeado.user}. usuario deslogeado`
            );
            sessionStorage.removeItem("usuario");
            location.reload();
        });
        userLogin.appendChild(p);
        userLogin.appendChild(close);
    }
//inicio de sesion////////////////////////////////////////////////////////////////////////////////////////



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
              <img src="./imagenes/iconos/shopping cart/minus.png" alt="trash" class="trash-btn " id="${producto.nombre}" data-product-type="${containerName}">
              <p>0</p>
              <img src="./imagenes/iconos/shopping cart/sum.png" alt="+" class="sum-btn" id="${producto.nombre}" data-product-type="${containerName}">
            </div>
          </div>
        `;

            container.appendChild(contenedor); // Agregar la tarjeta al contenedor

            
            // Encuentra el producto en el carrito (si existe)
            const productoEnCarrito = productosEnCarrito.find(
                (item) => item.nombre === producto.nombre
            );

            // Verifica si el producto está en el carrito y muestra la cantidad
            if (productoEnCarrito) {
                // La cantidad del producto en el carrito
                const cantidadEnCarrito = productoEnCarrito.cantidad;

                // Encuentra el elemento de cantidad en la tarjeta y muestra la cantidad
                const cantidadElement = contenedor.querySelector(".contador p");
                cantidadElement.textContent = cantidadEnCarrito;
            }
            actualizarContadoresEnTarjetas(); // Actualiza los contadores en las tarjetas
        }
    }

    document.addEventListener("DOMContentLoaded", () => {
        let totalCompra = 0; // Inicializa el costo total de la compra
        const contenedores = document.querySelectorAll(".card"); // Obtiene todas las tarjetas de productos

        // Itera a través de cada tarjeta de producto
        contenedores.forEach((contenedor) => {
            const imgSum = contenedor.querySelector(".contador .sum-btn");
            const cantidadElement = contenedor.querySelector(".contador p");
            const precioProducto = parseInt(
                contenedor
                    .querySelector(".card-texto p:last-child")
                    .textContent.replace("$", "")
            );

            // Agrega un evento al botón de aumentar la cantidad
            imgSum.addEventListener("click", () => {
                let cantidad = parseInt(cantidadElement.textContent);
                cantidad++; // Aumenta la cantidad
                cantidadElement.textContent = cantidad.toString();
            });
        });
    });

    //traemos botones de la card ////////////////////////////////////////////////////////////////////////////////

    let botonesSumar = document.querySelectorAll(".sum-btn");
    let botonesTrash = document.querySelectorAll(".trash-btn");
    const numeritos = document.querySelectorAll(".numerito");

    // Definir la función para actualizar los botones de agregar y eliminar
    function actualizarBotonesAgregar() {
        botonesSumar = document.querySelectorAll(".sum-btn");
        botonesTrash = document.querySelectorAll(".trash-btn");

        botonesSumar.forEach((boton) => {
            boton.addEventListener("click", agregarAlcarrito);
        });

        botonesTrash.forEach((boton) => {
            boton.addEventListener("click", eliminarDelCarrito);
        });
    }
    actualizarBotonesAgregar();

    let productosEnCarrito;
    let productosEnCarritoLS = localStorage.getItem("productos-en-carrito");

    if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    } else {
        productosEnCarrito = []; // Queremos que lo guarde en un array los productos en carrito
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
                y: "2rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
            }, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #000000, #EB5757)",
                borderRadius: ".5rem",
                textTransform: "uppercase",
                fontSize: ".75rem",
            },
            onClick: function () {
                // Callback after click
            },
        }).showToast();
        const idBoton = e.currentTarget.id;
        const container = e.currentTarget.getAttribute("data-product-type");

        let productoAgregado = productos[container].find(
            (producto) => producto.nombre === idBoton
        );

        if (productoAgregado) {
            const productoEnCarrito = productosEnCarrito.find(
                (item) => item.nombre === productoAgregado.nombre
            );

            if (productoEnCarrito) {
                productoEnCarrito.cantidad++;
            } else {
                productoAgregado.cantidad = 1;
                productosEnCarrito.push(productoAgregado);
            }
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            actualizarContadoresEnTarjetas(); // Actualiza los contadores en las tarjetas
            actualizarNumerito(); // Actualiza el contador en la tarjeta
            actualizarCarrito(); // Actualiza el localStorage con los productos en el carrito


        }
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
                y: "2rem", // vertical axis - can be a number or a string indicating unity. eg: '2em'
            }, // Prevents dismissing of toast on hover
            style: {
                background: "linear-gradient(to right, #000000, #EB5757)",
                borderRadius: ".5rem",
                textTransform: "uppercase",
                fontSize: ".75rem",
            },
            onClick: function () {
                // Callback after click
            },
        }).showToast();
        const idBoton = e.currentTarget.id;
        const container = e.currentTarget.getAttribute("data-product-type");

        // Encuentra el producto en el carrito
        const productoEnCarrito = productosEnCarrito.find(
            (producto) => producto.nombre === idBoton
        );

        if (productoEnCarrito) {
            if (productoEnCarrito.cantidad > 1) {
                // Si hay más de un producto del mismo tipo, disminuye la cantidad
                productoEnCarrito.cantidad--;
            } else {
                // Si solo hay un producto del mismo tipo, elimínalo del carrito
                const index = productosEnCarrito.indexOf(productoEnCarrito);
                productosEnCarrito.splice(index, 1);
            }

            actualizarContadoresEnTarjetas(); // Actualiza los contadores en las tarjetas
            // Actualiza el localStorage con la nueva información del carrito
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            // Actualiza el contador en el carrito
            actualizarNumerito();


        }
    }
    // Encapsula la lógica de actualización en una función
    function actualizarContadoresEnTarjetas() {
        const tarjetas = document.querySelectorAll(".card");

        tarjetas.forEach((tarjeta) => {
            const id = tarjeta.querySelector(".sum-btn").id;
            const cantidadEnCarrito =
                (productosEnCarrito.find((producto) => producto.nombre === id) || {}).cantidad || 0;
            const cantidadElement = tarjeta.querySelector(".contador p");
            const botonTrash = tarjeta.querySelector(".trash-btn");
            if (cantidadEnCarrito === 0) {
                cantidadElement.classList.add("hidden");
                botonTrash.classList.add("hidden");
            } else {
                cantidadElement.classList.remove("hidden");
                botonTrash.classList.remove("hidden");
            }
            cantidadElement.textContent = cantidadEnCarrito;
        });
    }

    // Actualizar el número total de productos en el carrito
    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce(
            (acc, producto) => acc + producto.cantidad,
            0
        );

        const numeritos = document.querySelectorAll(".numerito"); // Obtén todos los elementos con la clase "numerito"

        numeritos.forEach((numerito) => {
            numerito.innerText = nuevoNumerito;
        });

        // Actualizar las tarjetas después de actualizar el carrito
        agregarTarjetas();
    }

    // Actualizar el contenido del carrito
    function actualizarCarrito() {
        localStorage.setItem(
            "productos-en-carrito",
            JSON.stringify(productosEnCarrito)
        );
        actualizarNumerito(); // Asegúrate de actualizar los contadores después de modificar el carrito
    }

    // Asegúrate de llamar a actualizarNumerito() una vez al cargar la página para inicializar el contador
    actualizarNumerito();
});


