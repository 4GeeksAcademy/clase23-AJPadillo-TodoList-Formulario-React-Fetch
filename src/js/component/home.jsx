import React, { useState, useEffect } from "react";

const USERNAME = "AJPadillo";
const urlAPI = "https://playground.4geeks.com/todo/";

async function crearUsuario() {
    try {
        const response = await fetch(`${urlAPI}users/${USERNAME}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
        });
        if (!response.ok) {
            throw new Error("Error al crear al usuario");
        }
    } catch (e) {
        console.log(e);
    }
}

async function obtenerUsuario() {
    try {
        const response = await fetch(`${urlAPI}users/${USERNAME}`);
        if (response.status === 404) {
            await crearUsuario();
            return null;
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
        return null;
    }
}

async function obtenerLista() {
    try {
        const response = await fetch(`${urlAPI}todos/${USERNAME}`);
        const data = await response.json();
        if (Array.isArray(data)) {
            return data;
        }
        return [];
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function agregarTarea(tarea) {
    try {
        const response = await fetch(`${urlAPI}todos/${USERNAME}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ label: tarea, done: false }),
        });
        if (!response.ok) {
            throw new Error("Error al crear la tarea");
        }
    } catch (error) {
        console.log(error);
    }
}

async function borrarTarea(id) {
    try {
        const response = await fetch(`${urlAPI}todos/${id}`, {
            method: "DELETE",
        });
        if (!response.ok) {
            throw new Error("Error al borrar la tarea");
        }
    } catch (e) {
        console.log(e);
    }
}

const Home = () => {
    const [inputDef, setInputDef] = useState("");
    const [toDoList, setToDoList] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const user = await obtenerUsuario();
                if (user) {
                    const lista = await obtenerLista();
                    setToDoList(lista || []);
                } else {
                    await crearUsuario();
                    const lista = await obtenerLista();
                    setToDoList(lista || []);
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchData();
    }, []);

    const arrayPos = () => {
        return toDoList.map((elemento, index) => (
            <li
                className="list-group-item d-flex justify-content-between align-items-center fs-3 ps-5"
                key={index}
            >
                {elemento.label}
                <span className="delete-btn btn btn-sm fs-3" onClick={() => deleteItem(index)}>
                    &times;
                </span>
            </li>
        ));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        await agregarTarea(inputDef);
        const listaActualizada = await obtenerLista();
        setToDoList(listaActualizada || []);
        setInputDef("");
    };

    const deleteItem = async (index) => {
        const tarea = toDoList[index];
        if (tarea) {
            await borrarTarea(tarea.id);
            const listaActualizada = await obtenerLista();
            setToDoList(listaActualizada || []);
        }
    };

    return (
        <div className="container">
            <p className="titulo d-flex justify-content-center fw-light text-light">todos</p>
            <div className="mx-4">
                <form onSubmit={onSubmit} className="shadow-lg">
                    <div>
                        <input
                            type="text"
                            className="form-control rounded-0 border-bottom-0 fs-2 ps-5"
                            placeholder="What needs to be done?"
                            value={inputDef}
                            onChange={(e) => setInputDef(e.target.value)}
                        />
                    </div>
                </form>
                <ul className="list-group rounded-0" style={{ listStyle: "none" }}>
                    {arrayPos()}
                    <p className="list-group-item mb-0">
                        {toDoList.length > 0 ? toDoList.length + " item(s) left" : "No hay tareas, añadir tareas"}
                    </p>
                </ul>
                <div style={{ height: "5px" }} className="border mx-1 shadow-sm bg-white"></div>
                <div style={{ height: "5px" }} className="border mx-2 shadow-sm bg-white"></div>
            </div>
        </div>
    );
};

export default Home;
