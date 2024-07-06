import React, { useState, useEffect } from "react";

const USERNAME = "AJPadillo";

async function crearUsuario() {
	const protocolo = "https";
	const baseURI = "playground.4geeks.com/todo";
	const ruta = "/users";
	const URI = `${protocolo}://${baseURI}${ruta}`;
	const method = "POST";
	const opciones = {
		method,
	};

	try {
		const response = await fetch(`${URI}/${USERNAME}`, opciones);
		console.log("response = ", response);

		const data = await response.json();
		console.log("data = ", data);

		return data.results;
	} catch (error) {
		console.log("Ha habido un error: ", error);
		return null;
	}
}

async function crearLista() {
	const protocolo = "https";
	const baseURI = "playground.4geeks.com/todo";
	const ruta = "/todos";
	const URI = `${protocolo}://${baseURI}${ruta}`;
	const method = "POST";
	const opciones = {
		method,
	};

	try {
		const response = await fetch(`${URI}/${USERNAME}`, opciones);
		console.log("response = ", response);

		const data = await response.json();
		console.log("data = ", data);

		return data.results;
	} catch (error) {
		console.log("Ha habido un error: ", error);
		return [];
	}
}

async function obtenerUsuario() {
	const protocolo = "https";
	const baseURI = "playground.4geeks.com/todo";
	const ruta = "/users";
	const URI = `${protocolo}://${baseURI}${ruta}`;
	const method = "GET";
	const opciones = {
		method,
	};

	try {
		const response = await fetch(`${URI}/${USERNAME}`, opciones);
		console.log("response = ", response);

		const data = await response.json();
		console.log("data = ", data);

		return data.results;
	} catch (error) {
		console.log("Ha habido un error: ", error);
		return null;
	}
}

async function obtenerLista() {
	const protocolo = "https";
	const baseURI = "playground.4geeks.com/todo";
	const ruta = "/todos";
	const URI = `${protocolo}://${baseURI}${ruta}`;
	const method = "GET";
	const opciones = {
		method,
	};

	try {
		const response = await fetch(`${URI}/${USERNAME}`, opciones);
		console.log("response = ", response);

		const data = await response.json();
		console.log("data = ", data);

		return data.results;
	} catch (error) {
		console.log("Ha habido un error: ", error);
		return [];
	}
}

async function agregarTarea(tarea) {
	const protocolo = "https";
	const baseURI = "playground.4geeks.com/todo";
	const ruta = "/todos";
	const URI = `${protocolo}://${baseURI}${ruta}`;
	const method = "POST";
	const opciones = {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ label: tarea, done: false }),
	};

	try {
		const response = await fetch(`${URI}/${USERNAME}`, opciones);
		console.log("response = ", response);

		const data = await response.json();
		console.log("data = ", data);

		return data.results;
	} catch (error) {
		console.log("Ha habido un error: ", error);
		return [];
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
					const lista = await crearLista();
					setToDoList(lista || []);
				}
			} catch (error) {
				console.log("Ha habido un error: ", error);
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
		const newList = toDoList.filter((_, i) => i !== index);
		setToDoList(newList);
		// Pendiente agregar eliminar la tarea en API
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
