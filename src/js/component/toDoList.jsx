import React, { useEffect, useState } from "react";

const TodoList = () => {
    const host = "https://playground.4geeks.com/todo";
    const user = "AJPadillo";
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [tareaEditando, setTareaEditando] = useState("");

    // Función que nos trae las tareas (GET)
    async function traerTareas() {
        const uri = `${host}/users/${user}`
        const options = { method: "GET" }
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };
        const data = await response.json();
        setTareas(data.todos);
    };

    // Función que nos crea las tareas (POST)
    async function crearTareas() {
        const uri = `${host}/todos/${user}`
        const todo = { label: nuevaTarea, is_done: false };
        const options = {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(todo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };
        setNuevaTarea("");
        traerTareas();
    };

    // Función para actualizar tarea
    async function editarTarea(item) {
        setTareaEditando(item);
        setNuevaTarea(item.label)
    };

    // Función método PUT
    async function actualizarTareas(item) {
        const uri = `${host}/todos/${item.id}`
        const updateTodo = { ...item, label: nuevaTarea };
        const options = {
            method: "PUT",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify(updateTodo)
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };
        setNuevaTarea("");
        traerTareas();
        window.location.reload();
    };

    // Función que nos elimina las tareas (DELETE)
    async function borrarTareas(item) {
        const uri = `${host}/todos/${item.id}`
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };
        traerTareas();
    };

    async function borrarTodasTareas() {
        const uri = `${host}/users/${user}`
        const options = {
            method: "DELETE",
        };
        const response = await fetch(uri, options);
        if (!response.ok) {
            console.log("Aquí hay un error", response.status, response.statusText);
        };
        traerTareas();
    };

    useEffect(() => {
        traerTareas();
    }, []);

    return (
        <>
            <input
                type="text"
                value={nuevaTarea}
                onChange={(evento) => setNuevaTarea(evento.target.value)}
                placeholder="Escribe una tarea"
            />
            <button onClick={() => tareaEditando ? actualizarTareas(tareaEditando) : crearTareas()} >
                {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
            </button>
            {tareas.map((item) =>
                <div>
                    <h4>{item.label}</h4>
                    <button onClick={() => editarTarea(item)} >actualizar</button>
                    <button onClick={() => borrarTareas(item)} >borrar</button>
                </div>
            )}
            <button onClick={() => {borrarTodasTareas}}>Borrar todo</button>
        </>
    );
};
export default TodoList;