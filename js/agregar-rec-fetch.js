const BASEURL = 'http://127.0.0.1:5000';

/**
 * Función para realizar una petición fetch con JSON.
 * @param {string} url - La URL a la que se realizará la petición.
 * @param {string} method - El método HTTP a usar (GET, POST, PUT, DELETE, etc.).
 * @param {Object} [data=null] - Los datos a enviar en el cuerpo de la petición.
 * @returns {Promise<Object>} - Una promesa que resuelve con la respuesta en formato JSON.
 */
async function fetchData(url, method, data = null) {
  const options = {
      method: method,
      headers: {
          'Content-Type': 'application/json',
      },
      body: data ? JSON.stringify(data) : null,  // Si hay datos, los convierte a JSON y los incluye en el cuerpo
  };
  try {
    const response = await fetch(url, options);  // Realiza la petición fetch
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return await response.json();  // Devuelve la respuesta en formato JSON
  } catch (error) {
    console.error('Fetch error:', error);
    alert('An error occurred while fetching data. Please try again.');
  }
}

/**
 * Función para comunicarse con el servidor para poder Crear o Actualizar
 * un registro de pelicula
 * @returns 
 */
async function saveReceta(){
  const idReceta = document.querySelector('#id-receta').value;
  const title = document.querySelector('#title').value;
  const ingredientes = document.querySelector('#ingredientes').value;
  const procedimiento = document.querySelector('#procedimiento').value;
  const banner = document.querySelector('#banner-form').value;

  //VALIDACION DE FORMULARIO
  if (!title || !ingredientes || !procedimiento || !banner) {
    Swal.fire({
        title: 'Error!',
        text: 'Por favor completa todos los campos.',
        icon: 'error',
        confirmButtonText: 'Cerrar'
    });
    return;
  }
  // Crea un objeto con los datos de la película
  const recetaData = {
      title: title,
      ingredientes: ingredientes,
      procedimiento: procedimiento,
      banner: banner,
  };

    
  let result = null;
  // Si hay un idMovie, realiza una petición PUT para actualizar la película existente
  if(idReceta!==""){
    result = await fetchData(`${BASEURL}/api/recetas/${idReceta}`, 'PUT', recetaData);
  }else{
    // Si no hay idMovie, realiza una petición POST para crear una nueva película
    result = await fetchData(`${BASEURL}/api/recetas/`, 'POST', recetaData);
  }
  
  const formReceta = document.querySelector('#form-receta');
  formReceta.reset();
  Swal.fire({
    title: 'Exito!',
    text: result.message,
    icon: 'success',
    confirmButtonText: 'Cerrar'
  })
  showRecetas();
}


/**
 * Funcion que permite crear un elemento <tr> para la tabla de peliculas
 * por medio del uso de template string de JS.
 */
async function showRecetas(){
  let recetas =  await fetchData(BASEURL+'/api/recetas/', 'GET');
  const tableRecetas = document.querySelector('#list-table-recetas tbody');
  tableRecetas.innerHTML='';
  recetas.forEach((receta,index) => {
    let tr = `<tr>
                  <td>${receta.title}</td>
                  <td>${receta.ingredientes}</td>
                  <td>${receta.procedimiento}</td>
                  <td>
                      <img src="${receta.banner}" width="50%">
                  </td>
                  <td>
                      <button class="btn-cac" onclick='updateReceta(${receta.id_receta})'><i class="fa fa-pencil" ></button></i>
                      <button class="btn-cac" onclick='deleteReceta(${receta.id_receta})'><i class="fa fa-trash" ></button></i>
                  </td>
                </tr>`;
    tableRecetas.insertAdjacentHTML("beforeend",tr);
  });
}
  
  
/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} id posición del array que se va a eliminar
 */
function deleteReceta(id){
  Swal.fire({
      title: "¿Esta seguro de eliminar la receta?",
      showCancelButton: true,
      confirmButtonText: "Eliminar",
  }).then(async (result) => {
      if (result.isConfirmed) {
        let response = await fetchData(`${BASEURL}/api/recetas/${id}`, 'DELETE');
        showRecetas();
        Swal.fire(response.message, "", "success");
      }
  });
  
}


/**
 * Function que permite cargar el formulario con los datos de la pelicula 
 * para su edición
 * @param {number} id Id de la pelicula que se quiere editar
 */
async function updateReceta(id){
  //Buscamos en el servidor la pelicula de acuerdo al id
  let response = await fetchData(`${BASEURL}/api/recetas/${id}`, 'GET');
  const idReceta = document.querySelector('#id-receta');
  const title = document.querySelector('#title');
  const ingredientes = document.querySelector('#ingredientes');
  const procedimiento = document.querySelector('#procedimiento');
  const banner = document.querySelector('#banner-form');
  
  idReceta.value = response.id_receta;
  title.value = response.title;
  ingredientes.value = response.ingredientes;
  procedimiento.value = response.procedimiento;
  banner.value = response.banner;
}
  
// Escuchar el evento 'DOMContentLoaded' que se dispara cuando el 
// contenido del DOM ha sido completamente cargado y parseado.
document.addEventListener('DOMContentLoaded',function(){
  const btnSaveReceta = document.querySelector('#btn-save-receta');
  //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
  btnSaveReceta.addEventListener('click',saveReceta);
  showRecetas();
});