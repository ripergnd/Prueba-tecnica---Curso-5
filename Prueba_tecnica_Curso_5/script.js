"use strict";

const input = document.querySelector("#input-tarea");
const btnAgregar = document.querySelector(".btn-tarea");
const lista = document.querySelector(".lista-tareas");

const btnEliminarCompletadas = document.querySelector(".btn-eliminar-complet");
const btnEliminarTodas = document.querySelector(".btn-eliminar-todas");


window.addEventListener("DOMContentLoaded", () => {

    const tareas = JSON.parse(localStorage.getItem("tareas")) || [];

    tareas.forEach(tarea => {
        crearTarea(tarea.texto, tarea.completada);
    });
});

function guardarTareas() {

    const tareas = [];

    const elementos = document.querySelectorAll(".tareas");

    elementos.forEach(li => {

        const texto = li.querySelector("span").textContent;

        const completada = li.querySelector("input").checked;

        tareas.push({
            texto: texto,
            completada: completada
        });
    });

    localStorage.setItem("tareas", JSON.stringify(tareas));
}

function crearTarea(texto, completada = false) {


    const li = document.createElement("li");
    li.classList.add("tareas");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completada;

    const span = document.createElement("span");
    span.textContent = texto;

   
    if (completada) {
        span.classList.add("completada");
    }

  
    checkbox.addEventListener("change", () => {

        if (checkbox.checked) {
            span.classList.add("completada");
        } else {
            span.classList.remove("completada");
        }

        guardarTareas();
    });

    li.appendChild(checkbox);
    li.appendChild(span);

    lista.appendChild(li);

    guardarTareas();
}

function agregarTarea() {

    const texto = input.value.trim();

   
    if (texto === "") {
        return;
    }

    crearTarea(texto);

    input.value = "";
}

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

btnEliminarCompletadas.addEventListener("click", () => {

    const tareas = document.querySelectorAll(".tareas");

    tareas.forEach(tarea => {

        const checkbox = tarea.querySelector("input");

        if (checkbox.checked) {
            tarea.remove();
        }
    });

    guardarTareas();
});
btnEliminarTodas.addEventListener("click", () => {

    lista.innerHTML = "";

    guardarTareas();
});