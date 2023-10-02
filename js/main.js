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
                botonEliminar.classList.add("boton-eliminar"); // Clase "boton-eliminar" o puedes usar un ID si prefieres
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

// Función para eliminar un perfume
function eliminarPerfume(index) {
    if (confirm("¿Seguro que desea eliminar este perfume?")) {
        listaDePerfumes.splice(index, 1);
        localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));
        mostrarListaDePerfumes();
    }
}

// Función para editar el precio de un perfume
function editarPrecio(index) {
    const nuevoPrecio = prompt("Ingrese el nuevo precio del perfume:");
    if (nuevoPrecio === null) {
        return; // El usuario canceló la edición
    }
    const precioFloat = parseFloat(nuevoPrecio);
    if (!isNaN(precioFloat) && precioFloat > 0) {
        listaDePerfumes[index].precio = precioFloat;
        localStorage.setItem("listaDePerfumes", JSON.stringify(listaDePerfumes));
        mostrarListaDePerfumes();
    } else {
        alert("Por favor, ingrese un precio válido.");
    }
}

// Llama a la función para mostrar la lista de perfumes
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

// Evento y función para buscar perfumes por nombre y descripción
const inputSearch = document.getElementById("inputSearch");
inputSearch.addEventListener("input", busqueda);

