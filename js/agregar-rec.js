class Receta{

    constructor(id,title,ingredientes,procedimiento,banner){
        this.id=id;
        this.title=title;
        this.ingredientes=ingredientes;
        this.procedimiento=procedimiento;
        this.banner=banner
    }

}

// const movie1 = new Movie(1,'Damsel','Un director',4.5,'2024-03-01','https://image.tmdb.org/t/p/w500//sMp34cNKjIb18UBOCoAv4DpCxwY.jpg');

// const movie2 = new Movie(2,'Dune 2','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//8b8R8l88Qje9dn9OE8PY05Nxl1X.jpg');

// const movie3 = new Movie(3,'Kunfu panda 4','Un director 2',5,'2024-04-01','https://image.tmdb.org/t/p/w500//kDp1vUBnMpe8ak4rjgl3cLELqjU.jpg');

// let movies = [movie1,movie2,movie3];

// localStorage.setItem('movies',JSON.stringify(movies));

// console.log(movies);

function showRecetas(){
    
    //BUSCAR LO QUE HAY EN LOCAL STORAGE
    let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

    //buscar elemento HTML donde quiero insertar las peliculas
    const tbodyRecetas = document.querySelector('#list-table-recetas tbody');
    // const tbodyMovies = document.getElementById('#tbody-table-recetas');
    //limpio el contenido de la tabla
    tbodyRecetas.innerHTML = '';
    recetas.forEach(recetas => {
        //TEMPLATE STRING - TEMPLATE LITERAL 
        const tr = `
                    <tr>
                        <td>${receta.title}</td>
                        <td>${receta.director}</td>
                        <td>${receta.rating}</td>
                        <td>${receta.releaseDate}</td>
                        <td>
                            <img src="${receta.banner}" alt="${receta.title}" width="30%">
                        </td>
                        <td>
                            <button class="btn-cac" onclick='updateReceta(${receta.id})'><i class="fa fa-pencil" ></button></i>
                            <button class="btn-cac" onclick='deleteReceta(${receta.id})'><i class="fa fa-trash" ></button></i>
                        </td>
                    </tr>
        `;
        tbodyRecetas.insertAdjacentHTML('beforeend',tr);
    });

}

/**
 * funcion que permite agregar o modificar una pelicula al listado de peliculas
 * almacenado en el localstorage
 */
function saveReceta(){
    
    //Obtengo el elemento HTML del formulario
    const form = document.querySelector('#form-receta');

    //obtengo los inputs del formulario
    const inputId = document.querySelector('#id-receta');
    const inputTitle = document.querySelector('#title');
    const inputIngredientes = document.querySelector('#ingredientes');
    const inputProcedimiento = document.querySelector('#procedimiento');
    const inputBanner = document.querySelector('#banner-form');

    //Realizo una validación simple de acuerdo al contenido del value del input del titulo
    if(inputTitle.value.trim() !== ''){
        //Busca en localstorage el item movies, si no existe asigna el array vacio.
        let recetas = JSON.parse(localStorage.getItem('recetas')) || [];

        //Si el input de ID es distinto de vacio, es porque se trata de una acción de UPDATE
        if(inputId.value!==""){
            //Busco dentro del arraya de movies el objeto a editar
            const recetaFind = recetas.find(receta => receta.id == inputId.value);
            //Si existe actualizo el objeto
            if (recetaFind) {
              recetaFind.title = inputTitle.value;
              recetaFind.ingredientes = inputIngredientes.value;
              recetaFind.procedimiento = inputProcedimiento.value;
              recetaFind.banner = inputBanner.value;
            }
        }else{
            let newReceta = new Receta(
                recetas.length+1,
                inputTitle.value,
                inputIngredientes.value,
                inputProcedimiento.value,
                inputBanner.value,
            );
            recetas.push(newReceta);
        }

        //Se actualiza el array de peliculas en el localstorage
        localStorage.setItem('recetas',JSON.stringify(recetas));
        showRecetas();
        //Se limpian los inputs del formulario
        form.reset();
        Swal.fire({
            title: 'Exito!',
            text: 'Operacion exitosa.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }else{
        Swal.fire({
            title: 'Error!',
            text: 'Por favor completa el campo Titulo.',
            icon: 'error',
            confirmButtonText: 'Cerrar'
        });
    }

}

/**
 * Function que permite cargar el formulario para editar una receta
 * de acuedo al id de la pelicula
 * @param {number} recetaId id movie que se va a actualizar
 */
function updateReceta(recetaId){
    let recetas = JSON.parse(localStorage.getItem('recetas'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let recetaToUpdate = recetas.find(receta => receta.id===recetaId);
    if(recetaToUpdate){
        //Se buscan los elementos HTML del input
        const inputId = document.querySelector('#id-movie');
        const inputTitle = document.querySelector('#title');
        const inputIngredientes = document.querySelector('#ingredientes');
        const inputProcedimiento = document.querySelector('#procedimiento');
        const inputBanner = document.querySelector('#banner-form');
        //Se cargan los inputs con los valores de la pelicula encontrada
        inputId.value = recetaToUpdate.id;
        inputTitle.value = recetaToUpdate.title;
        inputIngredientes.value = recetaToUpdate.ingredientes;
        inputProcedimiento.value = recetaToUpdate.procedimiento;
        inputBanner.value = recetaToUpdate.banner;
    }
}

/**
 * Function que permite eliminar una pelicula del array del localstorage
 * de acuedo al indice del mismo
 * @param {number} recetaId id movie que se va a eliminar
 */
function deleteReceta(recetaId){
    let recetas = JSON.parse(localStorage.getItem('recetas'));
    //se utiliza el metodo find para poder asegurarnos que exista una pelicula con el id que queremos eliminar.
    let recetaToDelete = recetas.find(receta => receta.id===recetaId);
    if(recetaToDelete){
        //se utiliza el metodo filter para actualizar el array de movies, sin tener el elemento encontrado en cuestion.
        recetas = recetas.filter(receta => receta.id !== recetaToDelete.id);
        //se actualiza el localstorage
        localStorage.setItem('recetas',JSON.stringify(recetas));
        showRecetas();
        Swal.fire({
            title: 'Exito!',
            text: 'La receta fue eliminada.',
            icon: 'success',
            confirmButtonText: 'Cerrar'
        })
    }
}

// NOS ASEGURAMOS QUE SE CARGUE EL CONTENIDO DE LA PAGINA EN EL DOM
document.addEventListener('DOMContentLoaded',function(){

    const btnSaveMovie = document.querySelector('#btn-save-movie');

    //ASOCIAR UNA FUNCION AL EVENTO CLICK DEL BOTON
    btnSaveMovie.addEventListener('click',saveMovie);
    showMovies();
});
