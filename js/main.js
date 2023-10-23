//codigo para el loader /////////////////////////////////////////////////////////////////////////////////////
// Espera a que el documento HTML esté completamente cargado
document.addEventListener('DOMContentLoaded', function () {
    // Obtén una referencia al elemento "body"
    const body = document.body;

    // Quita la clase "hidden" del elemento "body" (si existe)
    if (body.classList.contains('hidden')) {
        body.classList.remove('hidden');
    }

    // Muestra el loader durante al menos 2 segundos
    const loader = document.getElementById('loader');
    if (loader) {
        setTimeout(function () {
            loader.style.display = 'none';
        }, 1000); // Mostrar el loader durante medio segundo
    }

});
//codigo para el loader /////////////////////////////////////////////////////////////////////////////////////





//codigo para abrir y cerrar el aside en mobile /////////////////////////////////////////////////////////////

const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => {
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => {
    aside.classList.remove("aside-visible");
})


//codigo para abrir y cerrar el aside en mobile /////////////////////////////////////////////////////////////








// codigo para cambiar retiro a delivery ////////////////////////////////////////////////////////////////////
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
// codigo para cambiar retiro a delivery ////////////////////////////////////////////////////////////////////





// horario de apertura /////////////////////////////////////////////////////////////////////////////////////
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

// horario de apertura /////////////////////////////////////////////////////////////////////////////////////






//modal de horarios //////////////////////////////////////////////////////////////////////////
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

//modal de horarios //////////////////////////////////////////////////////////////////////////


















//modales
document.addEventListener('DOMContentLoaded', () => {
    const enlacesDropdown = document.querySelectorAll('.dropdown-item');

    enlacesDropdown.forEach(enlace => {
        enlace.addEventListener('click', (event) => {
            event.preventDefault();
            const modalId = enlace.getAttribute('data-modal');
            const modal = document.getElementById(modalId);
            if (modal) {
                modal.style.display = 'block';
            }
        });
    });

    const modales = document.querySelectorAll('.modal');

    modales.forEach(modal => {
        const modalCerrar = modal.querySelector('.cerrar-modal');

        if (modalCerrar) {
            modalCerrar.addEventListener('click', () => {
                modal.style.display = 'none';
            });
        }
    });
});


//scroll horizontal automatico

document.addEventListener('DOMContentLoaded', function () {
    var categoryLinks = document.querySelectorAll('.categorias a');
    var categoriesContainer = document.querySelector('.categorias');
    var activeCategory = null;

    categoryLinks.forEach(function (link) {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            var targetId = link.getAttribute('href').substring(1); // Elimina el "#"
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                var targetOffset = targetSection.offsetTop;
                window.scrollTo({
                    top: targetOffset,
                    behavior: 'smooth'
                });
            }
        });
    });

    window.addEventListener('scroll', function () {
        var windowHeight = window.innerHeight;
        var scrollPosition = window.scrollY + windowHeight * 0.5; // Cambio clave aquí
        categoryLinks.forEach(function (link) {
            var targetId = link.getAttribute('href').substring(1);
            var targetSection = document.getElementById(targetId);
            if (targetSection) {
                var targetOffset = targetSection.offsetTop;
                var targetHeight = targetSection.offsetHeight;
                if (scrollPosition >= targetOffset && scrollPosition <= (targetOffset + targetHeight)) {
                    if (activeCategory) {
                        activeCategory.classList.remove('active');
                    }
                    link.classList.add('active');
                    activeCategory = link;

                    // Ajusta el desplazamiento horizontal para mantener la categoría visible
                    categoriesContainer.scrollLeft = link.offsetLeft - categoriesContainer.offsetWidth / 2;
                }
            }
        });
    });
});


//modales de nav
// Obtén todos los enlaces que abren los modales
const modalLinks = document.querySelectorAll('.abrir-modal');

// Obtén todos los elementos de modal
const modals = document.querySelectorAll('.modal');

// Agrega un evento de clic a cada enlace para abrir el modal correspondiente
modalLinks.forEach(link => {
    link.addEventListener('click', function (event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace

        // Obtiene el ID del modal desde el atributo data-modal
        const modalId = this.getAttribute('data-modal');

        // Encuentra el modal correspondiente por su ID
        const modal = document.getElementById(modalId);

        // Muestra el modal
        modal.style.display = 'block';
    });
});

// Agrega un evento de clic para cerrar todos los modales cuando se hace clic en el botón de cierre
const closeButtons = document.querySelectorAll('.close');

closeButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Encuentra el modal que contiene el botón de cierre
        const modal = this.parentElement.parentElement;

        // Oculta el modal
        modal.style.display = 'none';
    });
});

// const iniciarSesion = document.getElementById("inicioSesion")
const userLogin = document.getElementById("userLogin")
let usuarioLogeado = JSON.parse(sessionStorage.getItem ("usuario"))

if(usuarioLogeado === null){
    const a = document.createElement("a")
    a.href = "https://github.com/Nicolas-Andreis/Il-pirata/blob/main/pages/login.html"
    a.innerHTML = "iniciar sesion"
    userLogin.append(a)
}else{
    // iniciarSesion.className.add("disabled")
    const p = document.createElement("p")
    const close = document.createElement ("button")

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