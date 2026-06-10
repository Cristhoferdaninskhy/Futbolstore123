const formulario = document.getElementById("loginForm");

const correo = document.getElementById("correo");

const password = document.getElementById("password");

const mensaje = document.getElementById("mensaje");


formulario.addEventListener("submit", (e) => {


    e.preventDefault();


    const correoValor = correo.value.trim();

    const passwordValor = password.value.trim();

    if(correoValor === "" || passwordValor === ""){

        mensaje.style.color = "red";

        mensaje.textContent = "Complete todos los campos";

        return;
    }


    if(!correoValor.includes("@")){

        mensaje.style.color = "red";

        mensaje.textContent = "Correo inválido";

        return;
    }


    if(correoValor === "admin@gmail.com" && passwordValor === "1234"){

        mensaje.style.color = "green";

        mensaje.textContent = "Inicio de sesión exitoso";


       
        setTimeout(() => {

            window.location.href = "index.html";

        }, 1500);

    }else{

        mensaje.style.color = "red";

        mensaje.textContent = "Correo o contraseña incorrectos";

    }

});