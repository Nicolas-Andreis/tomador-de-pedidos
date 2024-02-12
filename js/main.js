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



