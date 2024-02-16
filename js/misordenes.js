document.addEventListener("DOMContentLoaded", function () {
    // Obtener las órdenes del localStorage
    const ordenesGuardadas = localStorage.getItem("ordenes") || "[]";
    let ordenes = JSON.parse(ordenesGuardadas);

    // Asignar números de orden basados en la posición en el array
    ordenes.forEach((orden, index) => {
        orden.numeroOrden = index + 1;
    });

    // Actualizar el localStorage con los nuevos números de orden
    localStorage.setItem("ordenes", JSON.stringify(ordenes));

    // Obtener el contenedor donde se renderizarán las órdenes
    const miCarrito = document.getElementById("miCarrito");

    // Verificar si hay órdenes para renderizar
    if (ordenes.length > 0) {
        // Iterar sobre cada orden y generar elementos HTML
        ordenes.forEach(orden => {
            const divOrden = document.createElement("div");
            divOrden.classList.add("orden");

            const fecha = new Date(orden.fecha);
            const fechaString = fecha.toLocaleString(); // Puedes personalizar el formato según tus preferencias

            // Función para obtener el valor o "N/A" si es undefined
            const obtenerValor = (propiedad) => (propiedad !== undefined ? propiedad : "N/A");

            divOrden.innerHTML = `
                <strong>Orden: ${obtenerValor(orden.numeroOrden)}</strong>
                <p>Fecha: ${obtenerValor(fechaString)}</p>
                ${orden.envio?.nombre ? `<strong>${orden.envio.nombre}</strong>` : ""}
                ${orden.envio?.direccion ? `<strong> ${orden.envio.direccion}</strong>` : ""}
                ${orden.envio?.tipo ? `<strong> ${orden.envio.tipo}</strong>` : ""}
                
                <strong>Total: $${obtenerValor(orden.total.toFixed(2))}</strong>
                <!-- Puedes agregar más detalles de la orden según tus necesidades -->

                <!-- Botón para ver más detalles o acciones adicionales -->
                <button class="ver-detalles" onclick="verDetalles(${orden.numeroOrden})"><img src="../imagenes/iconos/lupa/lupa.png" alt="menu" class="icon"></button>
                
                <!-- Botón para eliminar la orden individualmente -->
                <button class="eliminar-orden" onclick="eliminarOrden(${orden.numeroOrden})"><img src="../imagenes/iconos/basura/trash.png" alt="menu" class="icon"></button>
            `;

            miCarrito.appendChild(divOrden);
        });
    } else {
        // Si no hay órdenes, puedes mostrar un mensaje o simplemente dejar el contenedor vacío
        miCarrito.innerHTML = "<p>No hay órdenes disponibles.</p>";
    }

    // Calcular y mostrar la información de envíos y retiros
    const totalEnvios = ordenes.filter(orden => orden.envio?.tipo === "Envío");
    const totalRetiros = ordenes.filter(orden => orden.envio?.tipo === "Retiro en el Local");

    // Calcular el total de dinero para envíos y retiros
    const totalDineroEnvios = totalEnvios.reduce((total, orden) => total + orden.total, 0);
    const totalDineroRetiros = totalRetiros.reduce((total, orden) => total + orden.total, 0);

    // Crear un div para la información de envíos y retiros
    const divInformacionEnvios = document.createElement("div");
    divInformacionEnvios.classList.add("info-envios-retiros");

    // Mostrar información de envíos
    const infoEnvios = document.createElement("div");
    infoEnvios.innerHTML = `
        <p>ENVIOS: ${totalEnvios.length} TOTAL: $${totalDineroEnvios.toFixed(2)}</p>
    `;
    divInformacionEnvios.appendChild(infoEnvios);

    // Mostrar información de retiros
    const infoRetiros = document.createElement("div");
    infoRetiros.innerHTML = `
        <p>BARRAS: ${totalRetiros.length} TOTAL: $${totalDineroRetiros.toFixed(2)}</p>
    `;
    divInformacionEnvios.appendChild(infoRetiros);

    // Agregar el div de información de envíos y retiros al documento
    miCarrito.appendChild(divInformacionEnvios);

    // Crear un div para el botón de borrar órdenes y la información de totales
    const divTotales = document.createElement("div");
    divTotales.classList.add("totales-container");

    // Agregar el botón para eliminar todas las órdenes solo si hay órdenes
    if (ordenes.length > 0) {
        const btnEliminarOrdenes = document.createElement("button");
        btnEliminarOrdenes.textContent = "Eliminar Todas las Órdenes";
        btnEliminarOrdenes.addEventListener("click", eliminarTodasLasOrdenes);
        btnEliminarOrdenes.classList.add("btn-eliminar-ordenes");
        divTotales.appendChild(btnEliminarOrdenes);
    }

    // Calcular y mostrar el total de órdenes y el total en dinero
    const totalOrdenes = ordenes.length;
    const totalDinero = ordenes.reduce((total, orden) => total + orden.total, 0);

    const infoTotales = document.createElement("div");
    infoTotales.classList.add("totales-info");
    infoTotales.innerHTML = `
        <p>Total de Órdenes: ${totalOrdenes}</p>
        <p>Total en Dinero: $${totalDinero.toFixed(2)}</p>
    `;

    divTotales.appendChild(infoTotales);

    // Agregar el contenedor de totales al documento
    miCarrito.appendChild(divTotales);
});

function eliminarTodasLasOrdenes() {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Todas tus órdenes se eliminarán",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar el localStorage
            localStorage.removeItem("ordenes");

            // Recargar la página para reflejar los cambios
            location.reload();

            Swal.fire({
                title: "Borradas",
                text: "Todas tus órdenes se eliminaron",
                icon: "success"
            });
        }
    });
}

function eliminarOrden(numeroOrden) {
    Swal.fire({
        title: "¿Estás seguro?",
        text: "Esta orden se eliminará",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí",
        cancelButtonText: "No"
    }).then((result) => {
        if (result.isConfirmed) {
            // Obtener las órdenes del localStorage
            let ordenesGuardadas = localStorage.getItem("ordenes") || "[]";
            let ordenes = JSON.parse(ordenesGuardadas);

            // Filtrar las órdenes para eliminar la seleccionada
            ordenes = ordenes.filter(orden => orden.numeroOrden !== numeroOrden);

            // Actualizar el localStorage con las órdenes restantes
            localStorage.setItem("ordenes", JSON.stringify(ordenes));

            // Recargar la página para reflejar los cambios
            location.reload();

            Swal.fire({
                title: "Eliminada",
                text: "La orden se eliminó",
                icon: "success"
            });
        }
    });
}

function verDetalles(numeroOrden) {
    // Obtener las órdenes del localStorage
    const ordenesGuardadas = localStorage.getItem("ordenes") || "[]";
    const ordenes = JSON.parse(ordenesGuardadas);

    // Buscar la orden correspondiente al número de orden
    const ordenSeleccionada = ordenes.find(orden => orden.numeroOrden === numeroOrden);

    if (ordenSeleccionada) {
        // Mostrar productos de la orden
        const listaProductos = ordenSeleccionada.productos.map(producto => `
            <li>${producto.cantidad} x ${producto.nombre} - $${producto.cantidad * producto.precio}</li>
        `).join("<br>");

        // Construir el contenido HTML con lógica condicional para mostrar nombre o dirección
        let contenidoHTML = `
            <p>Número de Orden: ${ordenSeleccionada.numeroOrden}</p>
            <p>Fecha: ${new Date(ordenSeleccionada.fecha).toLocaleString()}</p>
            
            ${ordenSeleccionada.envio?.tipo ? `<p>Tipo: ${ordenSeleccionada.envio.tipo}</p>` : ""}
        `;

        if (ordenSeleccionada.envio?.tipo === "Envío") {
            contenidoHTML += `
                ${ordenSeleccionada.envio?.direccion ? `<p>Envío: ${ordenSeleccionada.envio.direccion}</p>` : ""}
                ${ordenSeleccionada.envio?.telefono ? `<p>Teléfono: ${ordenSeleccionada.envio.telefono}</p>` : ""}
            `;
        } else if (ordenSeleccionada.envio?.tipo === "Retiro en el Local") {
            contenidoHTML += `
                ${ordenSeleccionada.envio?.nombre ? `<p>Retiro: ${ordenSeleccionada.envio.nombre}</p>` : ""}
                ${ordenSeleccionada.envio?.telefonoRetiro ? `<p>Teléfono: ${ordenSeleccionada.envio.telefonoRetiro}</p>` : ""}
            `;
        }

        contenidoHTML += `
            <p>Productos:</p>
            <ul>${listaProductos}</ul>
            <p>Total: $${ordenSeleccionada.total.toFixed(2)}</p>
        `;

        // Mostrar ventana modal con la información
        Swal.fire({
            title: 'Detalles de la Orden',
            html: contenidoHTML,
            showConfirmButton: true,
            confirmButtonText: 'Cerrar'
        });
    } else {
        // Mostrar un mensaje de error si no se encuentra la orden
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo encontrar la orden seleccionada.',
        });
    }
}
