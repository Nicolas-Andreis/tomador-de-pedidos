//carga de productos /////////////////////////////////////////////////////////////////////////////////////////

// creacion del array para los productos
// const productosPromos = [
//     { id: 1, nombre: "promo para sillonear", precio: 4350, imagen: "./imagenes/promos/parasillonear.png" },
//     { id: 2, nombre: "promo hinchada", precio: 3430, imagen: "./imagenes/promos/promohinchada.png" },
//     { id: 3, nombre: "promo para compartir", precio: 5590, imagen: "./imagenes/promos/paracompartir.png" },
// ];

// const productosPizzas = [
//     { id: 1, nombre: "muzzarella", precio: 2910, imagen: "./imagenes/pizzas/muzzarella.jpg" },
//     { id: 2, nombre: "fugazza", precio: 3230, imagen: "./imagenes/pizzas/fuggazza.jpg" },
//     { id: 3, nombre: "napolitana", precio: 3300, imagen: "./imagenes/pizzas/napolitana.jpg" },
//     { id: 4, nombre: "provolone", precio: 3490, imagen: "./imagenes/pizzas/provolone.jpg" },
//     { id: 5, nombre: "roquefort", precio: 3490, imagen: "./imagenes/pizzas/roquefort.jpg" },
//     { id: 6, nombre: "aceitunas", precio: 3240, imagen: "./imagenes/pizzas/aceitunas.jpg" },
//     { id: 7, nombre: "muzza y jamon", precio: 3300, imagen: "./imagenes/pizzas/muzzayjamon.jpg" },
//     { id: 8, nombre: "especial", precio: 3620, imagen: "./imagenes/pizzas/especial.jpg" },
//     { id: 9, nombre: "estacione", precio: 3620, imagen: "./imagenes/pizzas/estacione.jpg" },
//     { id: 10, nombre: "j. crudo y rucula", precio: 4080, imagen: "./imagenes/pizzas/jamoncrudoyrucula.jpg" },
//     { id: 11, nombre: "champinones", precio: 3720, imagen: "./imagenes/pizzas/champignones.jpg" },
//     { id: 12, nombre: "alla cardille", precio: 4010, imagen: "./imagenes/pizzas/allacardille.jpg" },
//     { id: 13, nombre: "alla matioli", precio: 3880, imagen: "./imagenes/pizzas/allamattioli.jpg" },
//     { id: 14, nombre: "huevo y cebolla", precio: 3880, imagen: "./imagenes/pizzas/huevoycebolla.jpg" },
//     { id: 15, nombre: "palmitos", precio: 4010, imagen: "./imagenes/pizzas/palmitos.jpg" },
//     { id: 16, nombre: "primavera", precio: 3820, imagen: "./imagenes/pizzas/primavera.jpg" },
//     { id: 17, nombre: "calabresa", precio: 3880, imagen: "./imagenes/pizzas/calabresa.jpg" },
//     { id: 18, nombre: "wok de verduras", precio: 3880, imagen: "./imagenes/pizzas/wokdeverduras.jpg" },
//     { id: 19, nombre: "giuseppe", precio: 3620, imagen: "./imagenes/pizzas/giussepe.jpg" },
//     { id: 20, nombre: "hawaiana", precio: 3880, imagen: "./imagenes/pizzas/hawaiana.jpg" },
//     { id: 21, nombre: "margarita", precio: 3880, imagen: "./imagenes/pizzas/margarita.jpg" },
//     { id: 22, nombre: "alla reina", precio: 4010, imagen: "./imagenes/pizzas/allareina.jpg" },
//     { id: 23, nombre: "cantimpalo", precio: 3880, imagen: "./imagenes/pizzas/cantimpalo.jpg" },
//     { id: 24, nombre: "del mar", precio: 4470, imagen: "./imagenes/pizzas/delmar.jpg" },
//     { id: 25, nombre: "apio y nuez", precio: 3880, imagen: "./imagenes/pizzas/apioynuez.jpg" },
//     { id: 26, nombre: "pollo", precio: 4530, imagen: "./imagenes/pizzas/pollo.jpg" },
//     { id: 27, nombre: "a tu gusto", precio: 4730, imagen: "./imagenes/pizzas/atugusto.jpg" },
//     { id: 28, nombre: "roque y panceta", precio: 4080, imagen: "./imagenes/pizzas/roquefortypanceta.jpg" },
//     { id: 29, nombre: "panceta y huevo", precio: 4470, imagen: "./imagenes/pizzas/pancetayhuevo.jpg" },
//     { id: 30, nombre: "americana", precio: 4730, imagen: "./imagenes/pizzas/americana.jpg" },
//     { id: 31, nombre: "cuatro quesos", precio: 4400, imagen: "./imagenes/pizzas/cuatroquesos.jpg" },
//     { id: 32, nombre: "alla pirata", precio: 4340, imagen: "./imagenes/pizzas/allapirata.jpg" },
// ];

// const productosMediasPizzas = [
//     { id: 1, nombre: "mitad muzzarella", precio: 1540, imagen: "./imagenes/pizzas/muzzarella.jpg" },
//     { id: 2, nombre: "mitad fugazza", precio: 1700, imagen: "./imagenes/pizzas/fuggazza.jpg" },
//     { id: 3, nombre: "mitad napolitana", precio: 1740, imagen: "./imagenes/pizzas/napolitana.jpg" },
//     { id: 4, nombre: "mitad provolone", precio: 1830, imagen: "./imagenes/pizzas/provolone.jpg" },
//     { id: 5, nombre: "mitad roquefort", precio: 1830, imagen: "./imagenes/pizzas/roquefort.jpg" },
//     { id: 6, nombre: "mitad aceitunas", precio: 1710, imagen: "./imagenes/pizzas/aceitunas.jpg" },
//     { id: 7, nombre: "mitad muzza y jamon", precio: 1740, imagen: "./imagenes/pizzas/muzzayjamon.jpg" },
//     { id: 8, nombre: "mitad especial", precio: 1900, imagen: "./imagenes/pizzas/especial.jpg" },
//     { id: 9, nombre: "mitad estacione", precio: 1900, imagen: "./imagenes/pizzas/estacione.jpg" },
//     { id: 10, nombre: "mitad j. crudo y rucula", precio: 2150, imagen: "./imagenes/pizzas/jamoncrudoyrucula.jpg" },
//     { id: 11, nombre: "mitad champinones", precio: 1950, imagen: "./imagenes/pizzas/champignones.jpg" },
//     { id: 12, nombre: "mitad alla cardille", precio: 2100, imagen: "./imagenes/pizzas/allacardille.jpg" },
//     { id: 13, nombre: "mitad alla matioli", precio: 2040, imagen: "./imagenes/pizzas/allamattioli.jpg" },
//     { id: 14, nombre: "mitad huevo y cebolla", precio: 2040, imagen: "./imagenes/pizzas/huevoycebolla.jpg" },
//     { id: 15, nombre: "mitad palmitos", precio: 2100, imagen: "./imagenes/pizzas/palmitos.jpg" },
//     { id: 16, nombre: "mitad primavera", precio: 2010, imagen: "./imagenes/pizzas/primavera.jpg" },
//     { id: 17, nombre: "mitad calabresa", precio: 2040, imagen: "./imagenes/pizzas/calabresa.jpg" },
//     { id: 18, nombre: "mitad wok de verduras", precio: 2040, imagen: "./imagenes/pizzas/wokdeverduras.jpg" },
//     { id: 19, nombre: "mitad giuseppe", precio: 1910, imagen: "./imagenes/pizzas/giussepe.jpg" },
//     { id: 20, nombre: "mitad hawaiana", precio: 2100, imagen: "./imagenes/pizzas/hawaiana.jpg" },
//     { id: 21, nombre: "mitad margarita", precio: 2040, imagen: "./imagenes/pizzas/margarita.jpg" },
//     { id: 22, nombre: "mitad alla reina", precio: 2100, imagen: "./imagenes/pizzas/allareina.jpg" },
//     { id: 23, nombre: "mitad cantimpalo", precio: 2040, imagen: "./imagenes/pizzas/cantimpalo.jpg" },
//     { id: 24, nombre: "mitad del mar", precio: 2340, imagen: "./imagenes/pizzas/delmar.jpg" },
//     { id: 25, nombre: "mitad apio y nuez", precio: 2040, imagen: "./imagenes/pizzas/apioynuez.jpg" },
//     { id: 26, nombre: "mitad pollo", precio: 2370, imagen: "./imagenes/pizzas/pollo.jpg" },
//     { id: 27, nombre: "mitad a tu gusto", precio: 2470, imagen: "./imagenes/pizzas/atugusto.jpg" },
//     { id: 28, nombre: "mitad roque y panceta", precio: 2150, imagen: "./imagenes/pizzas/roquefortypanceta.jpg" },
//     { id: 29, nombre: "mitad panceta y huevo", precio: 2340, imagen: "./imagenes/pizzas/pancetayhuevo.jpg" },
//     { id: 30, nombre: "mitad americana", precio: 2470, imagen: "./imagenes/pizzas/americana.jpg" },
//     { id: 31, nombre: "mitad cuatro quesos", precio: 2310, imagen: "./imagenes/pizzas/cuatroquesos.jpg" },
//     { id: 32, nombre: "mitad alla pirata", precio: 2280, imagen: "./imagenes/pizzas/allapirata.jpg" },
// ];

// const productosCombos = [
//     { id: 1, nombre: "combo pirata", precio: 2580, imagen: "./imagenes/burguers/burguerpirata.jpg" },
//     { id: 2, nombre: "combo barbacoa", precio: 2680, imagen: "./imagenes/burguers/burguerbbq.jpg" },
//     { id: 3, nombre: "combo corazon azul", precio: 2680, imagen: "./imagenes/burguers/burgurguercorazonazul.jpg" },
//     { id: 4, nombre: "combo inmortal", precio: 3720, imagen: "./imagenes/burguers/burguerinmortal.jpg" },
// ];

// const productosBurguerSola = [
//     { id: 1, nombre: "hamburguesa pirata", precio: 2580, imagen: "./imagenes/burguers/burguerpirata.jpg" },
//     { id: 2, nombre: "hamburguesa barbacoa", precio: 2680, imagen: "./imagenes/burguers/burguerbbq.jpg" },
//     { id: 3, nombre: "hamburguesa corazon azul", precio: 2680, imagen: "./imagenes/burguers/burgurguercorazonazul.jpg" },
//     { id: 4, nombre: "hamburguesa inmortal", precio: 3720, imagen: "./imagenes/burguers/burguerinmortal.jpg" },
// ];

// const productosEmpanadas = [
//     { id: 1, nombre: "carne", precio: 410, imagen: "./imagenes/empanadas/clasicas/carne.jpg" },
//     { id: 2, nombre: "carne picante", precio: 410, imagen: "./imagenes/empanadas/clasicas/carnepicante.jpg" },
//     { id: 3, nombre: "carne cuchillo", precio: 410, imagen: "./imagenes/empanadas/clasicas/carnecuchillo.jpg" },
//     { id: 4, nombre: "pollo", precio: 410, imagen: "./imagenes/empanadas/clasicas/pollo.jpg" },
//     { id: 5, nombre: "pastora", precio: 410, imagen: "./imagenes/empanadas/clasicas/pastora.jpg" },
//     { id: 6, nombre: "cerdo barbacoa", precio: 410, imagen: "./imagenes/empanadas/clasicas/cerdoybarbacoa.jpg" },
//     { id: 7, nombre: "chesseburguer", precio: 410, imagen: "./imagenes/empanadas/clasicas/chesseburguer.jpg" },
//     { id: 8, nombre: "calabaza y queso", precio: 410, imagen: "./imagenes/empanadas/clasicas/calabazayqueso.jpg" },
//     { id: 9, nombre: "jamon y queso", precio: 410, imagen: "./imagenes/empanadas/canastitas/jamonyqueso.jpg" },
//     { id: 10, nombre: "cebolla y queso", precio: 410, imagen: "./imagenes/empanadas/canastitas/cebollayqueso.jpg" },
//     { id: 11, nombre: "capresse", precio: 410, imagen: "./imagenes/empanadas/canastitas/capresse.jpg" },
//     { id: 12, nombre: "humita", precio: 410, imagen: "./imagenes/empanadas/canastitas/humita.jpg" },
//     { id: 13, nombre: "roque apio y nuez", precio: 410, imagen: "./imagenes/empanadas/canastitas/roqueapoynuez.jpg" },
//     { id: 14, nombre: "roquefort", precio: 410, imagen: "./imagenes/empanadas/canastitas/roquefort.jpg" },
//     { id: 15, nombre: "cantimpalo", precio: 410, imagen: "./imagenes/empanadas/canastitas/cantimpalo.jpg" },
//     { id: 16, nombre: "anana y jamon", precio: 410, imagen: "./imagenes/empanadas/canastitas/ananayjamon.jpg" },
//     { id: 17, nombre: "wok de verduras", precio: 410, imagen: "./imagenes/empanadas/canastitas/wokdeverduras.jpg" },
//     { id: 18, nombre: "panceta y ciruela", precio: 410, imagen: "./imagenes/empanadas/canastitas/pancetayciruela.jpg" },
// ];

// const productosCalzones = [
//     { id: 1, nombre: "alla calzone", precio: 3470, imagen: "./imagenes/calzones/allacalzone.jpg" },
//     { id: 2, nombre: "calzone especial", precio: 3900, imagen: "./imagenes/calzones/calzoneespecial.jpg" },
//     { id: 3, nombre: "calzone calabresa", precio: 3900, imagen: "./imagenes/calzones/calzonecalabresa.jpg" },
//     { id: 4, nombre: "calzone capresse", precio: 3900, imagen: "./imagenes/calzones/calzonecapresse.jpg" },
//     { id: 5, nombre: "calzone napolitano", precio: 3590, imagen: "./imagenes/calzones/calzonenapolitano.jpg" },
// ];

// const productosPapas = [
//     { id: 1, nombre: "papas fritas", precio: 1270, imagen: "./imagenes/papas/papasfritas.jpg" },
//     { id: 2, nombre: "papas pirata", precio: 1480, imagen: "./imagenes/papas/papaspirata.jpg" },
// ];

// const productosEnsaladas = [
//     { id: 1, nombre: "ensalada caesar", precio: 2010, imagen: "./imagenes/ensalada/caesar.jpg" },
//     { id: 2, nombre: "ensalada navegante", precio: 1900, imagen: "./imagenes/ensalada/navegante.jpg" },
//     { id: 3, nombre: "ensalada egeo", precio: 1770, imagen: "./imagenes/ensalada/egeo.jpg" },
//     { id: 4, nombre: "ensalada arcoiris", precio: 1630, imagen: "./imagenes/ensalada/arcoirirs.jpg" },
// ];

// const productosPostres = [
//     { id: 1, nombre: "franui", precio: 1900, imagen: "./imagenes/postres/franui.jpg" },
//     { id: 2, nombre: "tiramisu", precio: 650, imagen: "./imagenes/postres/tiramisu.jpg" },
//     { id: 3, nombre: "chocoreo", precio: 650, imagen: "./imagenes/postres/chocoreo.jpg" },
//     { id: 4, nombre: "chocotorta", precio: 650, imagen: "./imagenes/postres/chocoreo.jpg" },
//     { id: 5, nombre: "muosse de chocolate", precio: 650, imagen: "./imagenes/postres/moussedechocolate.jpg" },
// ];

// const productosBebidas = [
//     { id: 1, nombre: "cocacola 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/cocacola.jpg" },
//     { id: 2, nombre: "coca zero 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/cocazero.jpg" },
//     { id: 3, nombre: "fanta 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/fanta.jpg" },
//     { id: 4, nombre: "sprite 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/sprite.jpg" },
//     { id: 5, nombre: "sprite zero 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/spritezero.jpg" },
//     { id: 6, nombre: "schweppers 1.5lts", precio: 900, imagen: "./imagenes/gaseosas/schwepers.jpg" },
//     { id: 7, nombre: "coca cola 500cc", precio: 500, imagen: "./imagenes/gaseosas 500cc/coca.jpg" },
//     { id: 8, nombre: "coca zero 500cc", precio: 500, imagen: "./imagenes/gaseosas 500cc/cocazero.jpg" },
//     { id: 9, nombre: "fanta 500cc", precio: 500, imagen: "./imagenes/gaseosas 500cc/fanta.jpg" },
//     { id: 10, nombre: "schweppers 50cc", precio: 500, imagen: "./imagenes/gaseosas 500cc/schweppers.jpg" },
// ];

// const productosCervezas = [
//     { id: 1, nombre: "heineken 710cc", precio: 1100, imagen: "./imagenes/cerveza 710/heineken.jpg" },
//     { id: 2, nombre: "imperial 710cc", precio: 900, imagen: "./imagenes/cerveza 710/imperial.jpg" },
//     { id: 3, nombre: "schneider 710cc", precio: 800, imagen: "./imagenes/cerveza 710/schneider.jpg" },
//     { id: 4, nombre: "heineken 473cc", precio: 660, imagen: "./imagenes/cervezas 473/heineken.jpg" },
//     { id: 5, nombre: "imperial 473cc", precio: 580, imagen: "./imagenes/cervezas 473/imperial.jpg" },
//     { id: 6, nombre: "imperial ipa 473cc", precio: 580, imagen: "./imagenes/cervezas 473/ipa.jpg" },
//     { id: 7, nombre: "imperial roja 473cc", precio: 580, imagen: "./imagenes/cervezas 473/roja.jpg" },
//     { id: 8, nombre: "schneider 473cc", precio: 500, imagen: "./imagenes/cervezas 473/schneider.jpg" },
// ];

// const productosHelados = [
//     { id: 1, nombre: "banana split", precio: 1500, imagen: "./imagenes/helados/babanasplit.jpg" },
//     { id: 2, nombre: "chocolate suizo", precio: 1500, imagen: "./imagenes/helados/chocolatesuizo.jpg" },
//     { id: 3, nombre: "crema tramontana", precio: 1500, imagen: "./imagenes/helados/crematramontana.jpg" },
//     { id: 4, nombre: "dulce de leche granizado", precio: 1500, imagen: "./imagenes/helados/dulcedelechegranizado.jpg" },
//     { id: 5, nombre: "frutilla a la crema", precio: 1500, imagen: "./imagenes/helados/frutillaalacrema.jpg" },
//     { id: 6, nombre: "limon granizado", precio: 1500, imagen: "./imagenes/helados/limongranizado.jpg" },
//     { id: 7, nombre: "super dulce de leche", precio: 1500, imagen: "./imagenes/helados/superdulcedeleche.jpg" },
// ];

document.addEventListener("DOMContentLoaded", function () {
    // Array para almacenar los productos
    let productos = [];

    // Función para cargar los productos desde el archivo JSON
    fetch("../productos.json")
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


// Función para agregar tarjetas de productos a un contenedor
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
            x: 70, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
          }, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #000000, #EB5757)",
          borderRadius: ".5rem",
          textTransform: "uppercase",
          fontSize: ".75rem"
        },
        onClick: function(){} // Callback after click
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

});