document.addEventListener("DOMContentLoaded", function () {
    const btnRegister = document.getElementById("btn-register");
    const formRegister = document.getElementById("registerForm");
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    class newUser {
        constructor(user, pass) {
            this.id = usuarios.length + 1;
            this.user = user;
            this.pass = pass;
            this.admin = false;
        }
    }

    btnRegister.addEventListener("click", (e) => {
        e.preventDefault();
        const user = formRegister.querySelector("#new-username").value;
        const pass = formRegister.querySelector("#new-password").value;
        const nuevoUsuario = new newUser(user, pass);
        validarYRegistrar(nuevoUsuario);
    });

    const validarYRegistrar = (nuevoUsuario) => {
        const userExiste = usuarios.find((usuario) => usuario?.user === nuevoUsuario.user);
        if (userExiste === undefined) {
            usuarios.push(nuevoUsuario);
            localStorage.setItem("usuarios", JSON.stringify(usuarios));
            sessionStorage.setItem("usuario", JSON.stringify(nuevoUsuario));
            alert(`Gracias ${nuevoUsuario.user} por registrarte. Serás redirigido a la página principal.`);
            location.href = "../index.html";
        } else {
            alert("¡El usuario ya existe!");
        }
    };
});