import React, { useEffect, useState } from "react";

const TodoList = () => {
    const host = "https://playground.4geeks.com/todo";
    const user = "AJPadillo";
    const [tareas, setTareas] = useState([]);
    const [nuevaTarea, setNuevaTarea] = useState("");
    const [tareaEditando, setTareaEditando] = useState("");

    // Función que nos crea al usuario (POST)
    async function crearUsuario() {
        try {
            const response = await fetch(`${host}/users/${user}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            if (!response.ok) {
                throw new Error("Error al crear al usuario");
            }
        } catch (error) {
            console.log(error);
        }
    }

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
        crearUsuario();
        traerTareas();
    }, []);

    return (
        <div className="container">
            <p className="titulo d-flex justify-content-center fw-light text-light">todos</p>
            <div className="mx-4 shadow-lg">
                <div>
                    <input
                        className="form-control rounded-0 border-bottom-0 fs-2 ps-5"
                        type="text"
                        value={nuevaTarea}
                        onChange={(evento) => setNuevaTarea(evento.target.value)}
                        placeholder="What needs to be done?"
                    />
                    <div className="d-flex justify-content-center text-center m-3 rounded-0">
                        <button className="btn btn-success" onClick={() => tareaEditando ? actualizarTareas(tareaEditando) : crearTareas()} >
                            {tareaEditando ? "Actualizar tarea" : "Crear tarea"}
                        </button>
                    </div>
                    {tareas.map((item) =>
                        <ul className="list-group rounded-0" style={{ listStyle: "none" }}>
                            <li className="list-group-item d-flex justify-content-between align-items-center fs-3 ps-5 rounded-0">{item.label}
                                <span
                                    className="delete-btn btn btn-sm fs-3"
                                    onClick={() => editarTarea(item)}
                                >
                                    &alpha;
                                </span>
                                <span
                                    className="delete-btn btn btn-sm fs-3"
                                    onClick={() => borrarTareas(item)}
                                >
                                    &times;
                                </span>
                            </li>
                        </ul>
                    )}
                    <div className="d-flex justify-content-end text-center rounded-0">
                        <button className="btn btn-danger m-3 mb-1 me-1" onClick={() => { borrarTodasTareas() }}>Borrar todo</button>
                    </div>

                </div>
            </div>
        </div>
    );
};
export default TodoList;