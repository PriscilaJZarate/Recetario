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
    // Prevenir el comportamiento predeterminado de envío del formulario
    event.preventDefault();
    // Limpiar las validaciones anteriores
    clearValidations();

    // Obtener referencias a los campos del formulario
    const usuario = document.querySelector("#usuario");
    const password = document.querySelector("#password");
    
    let validation = true;
    // Validar el campo usuario
    if(!usuario.value.trim()){
        document.querySelector("#error-usuario").textContent='Debe completar el campo Usuario';
        email.classList.add('error')
        validation = false;
    }
        
    // Validar el campo password
    if(!password.value.trim()){
        document.querySelector("#error-password").textContent='Debe completar el campo contraseña';
        password.classList.add('error')
        validation = false;
    }

    // Si no hay errores de validación, enviar el formulario
    if(validation){
        formRegister.submit();
    }
}


formRegister.addEventListener('submit',validarFormulario);
