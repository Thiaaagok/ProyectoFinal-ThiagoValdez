let aIndex = document.querySelectorAll(".aIndex");
console.log(aIndex[0]);
// Cambios en nombres de variables y clase
const listaDePerfumes = JSON.parse(localStorage.getItem("listaDePerfumes")) || [];

class Perfume {
    constructor(nombrePerfume, marcaPerfume, precioPerfume) {
        this.nombre = nombrePerfume;
        this.marca = marcaPerfume;
        this.precio = precioPerfume;
    }
}

// Función para agregar un nuevo perfume
function agregarNuevoPerfume() {
    const nombre = document.getElementById("nombrePerfume").value;
    const marca = document.getElementById("marcaPerfume").value;
    const precio = parseFloat(document.getElementById("precioPerfume").value);

    // Validar que se ingresen datos válidos
    if (!nombre || !marca || isNaN(precio) || precio <= 0) {
        alert("Por favor, complete todos los campos correctamente.");
        return;
    }

    // Crear un nuevo objeto perfume
    const nuevoPerfume = {
        nombre: nombre,
        marca: marca,
        precio: precio
    };

    // Agregar el nuevo perfume al arreglo
    listaDePerfumes.push(nuevoPerfume);

    // Guardar la lista actualizada en el almacenamiento local
    localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));

    // Limpiar los campos del formulario
    document.getElementById("nombrePerfume").value = "";
    document.getElementById("marcaPerfume").value = "";
    document.getElementById("precioPerfume").value = "";

    // Actualizar la lista de perfumes en el DOM
    mostrarListaDePerfumes();
}

// funcion mostrar lista
function mostrarListaDePerfumes() {
    const listaPerfumesUl = document.getElementById("listaPerfumes");
    const mensajeCargando = document.getElementById("mensajeCargando");
    const divOculto = document.getElementById("contenedorLista");

    divOculto.style.display = "block";
    mensajeCargando.style.display = "block";
    listaPerfumesUl.style.display = "block";
    listaPerfumesUl.innerHTML = "";

    document.getElementById("p-lista").style.display = "none";

    if (listaDePerfumes.length === 0) {
        setTimeout(() => {
            mensajeCargando.style.display = "none";
        }, 1000);

        setTimeout(() => {
            document.getElementById("p-lista").style.display = "block";
        }, 1000);

        return;
    } else {
        setTimeout(() => {
            listaDePerfumes.forEach((perfume, idx) => {
                const li = document.createElement("li");
                const botonEditar = document.createElement("button"); // Crea el botón de editar
                const botonEliminar = document.createElement("button"); // Crea el botón de eliminar
                botonEditar.innerText = "Editar"; // Texto del botón de editar
                botonEliminar.innerText = "Eliminar"; // Texto del botón de eliminar
                botonEditar.classList.add("boton-editar"); // Clase "boton-editar"
                botonEliminar.classList.add("boton-eliminar"); // Clase "boton-eliminar" 
                botonEditar.addEventListener("click", () => editarPrecio(idx)); // Agrega un evento para editar el precio
                botonEliminar.addEventListener("click", () => eliminarPerfume(idx)); // Agrega un evento para eliminar el perfume
                li.innerText = `${idx + 1}) Nombre: ${perfume.nombre}, Marca: ${perfume.marca}, Precio: ${perfume.precio}`;
                li.appendChild(botonEditar); // Agrega el botón de editar al elemento de la lista
                li.appendChild(botonEliminar); // Agrega el botón de eliminar al elemento de la lista
                listaPerfumesUl.appendChild(li);
            });
            mensajeCargando.style.display = "none";
        }, 1000);
    }
}

// Función para eliminar un perfume con SweetAlert
function eliminarPerfume(index) {
    Swal.fire({
        title: '¿Estás seguro?',
        text: 'Esta acción no se puede deshacer',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, eliminar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Si el usuario confirma la eliminación, procede a eliminar el perfume
            listaDePerfumes.splice(index, 1);
            localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));
            mostrarListaDePerfumes();
            Swal.fire(
                'Eliminado',
                'El perfume ha sido eliminado correctamente',
                'success'
            );
        }
    });
}

// Función para editar el precio con SweetAlert
function editarPrecio(index) {
    Swal.fire({
        title: 'Editar Precio',
        html: '<input type="number" id="nuevoPrecio" class="swal2-input" placeholder="Nuevo precio">',
        showCancelButton: true,
        confirmButtonText: 'Guardar',
        cancelButtonText: 'Cancelar',
        preConfirm: () => {
            const nuevoPrecio = Swal.getPopup().querySelector('#nuevoPrecio').value;
            if (!nuevoPrecio || isNaN(nuevoPrecio) || nuevoPrecio <= 0) {
                Swal.showValidationMessage('Por favor, ingrese un precio válido.');
            }
            return nuevoPrecio;
        }
    }).then((result) => {
        if (result.isConfirmed) {
            const precio = parseFloat(result.value);
            listaDePerfumes[index].precio = precio;
            localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));
            mostrarListaDePerfumes();
            Swal.fire(
                'Precio Actualizado',
                'El precio ha sido actualizado correctamente',
                'success'
            );
        }
    });
}

// Función para vaciar la lista
function vaciarLista() {
    // Pregunta al usuario si está seguro de vaciar la lista
    Swal.fire({
        title: 'Vaciar Lista',
        text: '¿Estás seguro de que deseas vaciar la lista de perfumes?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Sí, vaciar',
        cancelButtonText: 'Cancelar'
    }).then((result) => {
        if (result.isConfirmed) {
            // Vacía la lista de perfumes
            listaDePerfumes.length = 0;
            localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));

            // Actualiza la lista en el DOM
            mostrarListaDePerfumes();

            Swal.fire(
                'Lista Vaciada',
                'La lista de perfumes ha sido vaciada correctamente.',
                'success'
            );
        }
    });
}

// Función para buscar perfumes por nombre
function buscarPerfume() {
    const buscarPerfumeInput = document.getElementById("buscarPerfumeInput").value.toLowerCase();

    // Filtra los perfumes que coinciden con el término de búsqueda
    const perfumesFiltrados = listaDePerfumes.filter((perfume) => {
        return perfume.nombre.toLowerCase().includes(buscarPerfumeInput);
    });

    // Mostrar los perfumes 
    mostrarListaDePerfumes(perfumesFiltrados);
}

//mostrar la lista de perfumes
mostrarListaDePerfumes();{
}

// Evento para el botón de agregar perfume
const botonAgregarPerfume = document.getElementById("agregarPerfume");
botonAgregarPerfume.addEventListener("click", agregarNuevoPerfume);

// Evento para mostrar la lista de perfumes
const mostrarBtn = document.getElementById('mostrarLista');
mostrarBtn.addEventListener('click', mostrarListaDePerfumes);

// Evento de clic al botón de ocultar lista
const ocultarListaBtn = document.getElementById("ocultarListaBtn");
ocultarListaBtn.addEventListener("click", () => {
    const listaPerfumesUl = document.getElementById("listaPerfumes");
    listaPerfumesUl.style.display = "none";
});

// Evento para el botón "Vaciar Lista"
const vaciarListaBtn = document.getElementById("vaciarListaBtn");
vaciarListaBtn.addEventListener("click", vaciarLista);

/* MODAL */

// Obtén elementos del DOM
const filtrarBtn = document.getElementById("filtrarBtn");
const modalFiltrado = document.getElementById("modalFiltrado");
const cerrarModalFiltrado = document.getElementById("cerrarModalFiltrado");

// Evento para mostrar el modal al hacer clic en "Filtrar"
filtrarBtn.addEventListener("click", () => {
    modalFiltrado.style.display = "block";
});

// Evento para ocultar el modal al hacer clic en la "x" de cierre
cerrarModalFiltrado.addEventListener("click", () => {
    modalFiltrado.style.display = "none";
});

// Cierra el modal si se hace clic fuera de él
window.addEventListener("click", (event) => {
    if (event.target === modalFiltrado) {
        modalFiltrado.style.display = "none";
    }
});

// Función para ordenar la lista de perfumes por precio de menor a mayor desde el modal
function ordenarPorPrecioModal() {
    // Clona la lista de perfumes para evitar modificar la lista original
    const perfumesOrdenados = [...listaDePerfumes];

    // Ordena la lista de perfumes por precio de menor a mayor
    perfumesOrdenados.sort((a, b) => a.precio - b.precio);

    // Muestra la lista ordenada en el DOM
    mostrarListaDePerfumes(perfumesOrdenados);

    // Cierra el modal después de ordenar
    modalFiltrado.style.display = "none";
}

// Evento para el botón "Ordenar por Precio (Menor a Mayor)" dentro del modal
const ordenarPrecioModalBtn = document.getElementById("ordenarPrecioModalBtn");
ordenarPrecioModalBtn.addEventListener("click", ordenarPorPrecioModal);
