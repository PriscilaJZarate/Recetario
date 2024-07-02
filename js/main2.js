const formRegister = document.querySelector("#formulario");

const clearValidations = () => {

    const inputs = document.querySelectorAll("input");
    const errorElements = document.querySelectorAll(".error");

    inputs.forEach(input => {
        input.classList.remove('error');
        const nextSibling = input.nextElementSibling;
        if (nextSibling !== null) {
            nextSibling.textContent = '';
        }
    });

    errorElements.forEach(errorElement => {
        errorElement.textContent = '';
    });
    
}
// Función para validar el formulario
const validarFormulario = (event) => {
    event.preventDefault();
    clearValidations();

    const firstname = document.querySelector("#firstname");
    const lastname = document.querySelector("#lastname");
    const email = document.querySelector("#email");
    const usuario = document.querySelector("#usuario");
    const password = document.querySelector("#password");

    let validation = true;
    // Validar el campo firstname
    if(!firstname.value.trim()){
        firstname.classList.add('error')
        document.querySelector("#error-firstname").textContent='Debe completar el campo Nombre';
        validation=false;
    }
    // Validar el campo lastname
    if(!lastname.value.trim()){
        document.querySelector("#error-lastname").textContent='Debe completar el campo Apellido';
        lastname.classList.add('error')
        validation=false;
    }
    // Validar el campo email
    if(!email.value.trim()){
        document.querySelector("#error-email").textContent='Debe completar el campo Email';
        email.classList.add('error')
        validation=false;
    }
    //Validar el campo usuario
    if(!usuario.value.trim()){
        document.querySelector("#error-usuario").textContent='Debe completar el campo Usuario';
        email.classList.add('error')
        validation=false;
    }
        
    // Validar el campo password
    if(!password.value.trim()){
        document.querySelector("#error-password").textContent='Debe completar el campo contraseña';
        password.classList.add('error')
        validation=false;
    }else if(password.value.length < 6 || password.value.length > 12){
        document.querySelector("#error-password").textContent ='La contraseña debe contener entre 6 y 12 caracteres';
        password.classList.add('error')
        validation=false;
    }

    if(validation){
        formRegister.submit();
    }
}


formRegister.addEventListener('submit',validarFormulario);

