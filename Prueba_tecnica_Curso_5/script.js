"use strict";

const input = document.querySelector("#input-tarea");
const lista = document.querySelector(".lista-tareas");

const btnAgregar = document.querySelector(".btn-tarea");
const btnEliminarCompletadas = document.querySelector(".btn-eliminar-complet");
const btnEliminarTodas = document.querySelector(".btn-eliminar-todas");

let tareas = [];

/*CARGAR DATOS*/

window.addEventListener("DOMContentLoaded", () => {

    tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    renderTareas();
});

/*LOCAL STORAGE*/

function guardarTareas() {

    localStorage.setItem(
        "tareas",
        JSON.stringify(tareas)
    );
}

/*RENDER*/

function renderTareas() {

    lista.innerHTML = "";

    tareas.forEach(tarea => {

        const li = document.createElement("li");
        li.classList.add("tareas");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = tarea.completada;

        const span = document.createElement("span");
        span.textContent = tarea.texto;

        if (tarea.completada) {
            span.classList.add("completada");
        }

        checkbox.addEventListener("change", () => {

            tarea.completada = checkbox.checked;

            guardarTareas();
            renderTareas();
        });

        li.appendChild(checkbox);
        li.appendChild(span);

        lista.appendChild(li);
    });
}

/*CRUD*/

function agregarTarea() {

    const texto = input.value.trim();

    if (texto === "") {
        alert("Introduce una tarea");
        return;
    }

    tareas.push({
        id: Date.now(),
        texto: texto,
        completada: false
    });

    guardarTareas();
    renderTareas();

    input.value = "";
}

function eliminarCompletadas() {

    const confirmar = confirm(
        "¿Eliminar todas las tareas completadas?"
    );

    if (!confirmar) return;

    tareas = tareas.filter(
        tarea => !tarea.completada
    );

    guardarTareas();
    renderTareas();
}

function eliminarTodas() {

    const confirmar = confirm(
        "¿Eliminar todas las tareas?"
    );

    if (!confirmar) return;

    tareas = [];

    guardarTareas();
    renderTareas();
}

/*EVENTO*/

btnAgregar.addEventListener("click", (e) => {

    e.preventDefault();

    agregarTarea();
});

input.addEventListener("keydown", (e) => {

    if (e.key === "Enter") {

        e.preventDefault();

        agregarTarea();
    }
});

btnEliminarCompletadas.addEventListener(
    "click",
    eliminarCompletadas
);

btnEliminarTodas.addEventListener(
    "click",
    eliminarTodas
);