document.addEventListener("DOMContentLoaded", function () {
    const btnRegister = document.getElementById("btn-register");
    const formRegister = document.getElementById("registerForm");
    const btnLogin = document.getElementById("btn-logearse");
    const formLogin = document.getElementById("loginForm");

    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    class newUser {
        constructor(user, pass) {
            this.id = usuarios.length + 1;
            this.user = user;
            this.pass = pass;
            this.admin = false;
        }
    }

    btnLogin.addEventListener("click", (e) => {
        e.preventDefault();

        const user = formLogin.querySelector("#username").value;
        const pass = formLogin.querySelector("#password").value;

        validarYLogear(user, pass);
    });

    const validarYLogear = (user, pass) => {
        const userExiste = usuarios.find((usuario) => usuario.user === user);

        if (userExiste === undefined || userExiste.pass !== pass) {
            alert("Error en usuario o contraseña");
        } else {
            alert(`¡Bienvenido, ${user}!`);

            const usuario = {
                user: userExiste.user,
                pass: userExiste.pass,
                admin: userExiste.admin,
            };

            sessionStorage.setItem("usuario", JSON.stringify(usuario));

            location.href = "../index.html";
        }
    };
})