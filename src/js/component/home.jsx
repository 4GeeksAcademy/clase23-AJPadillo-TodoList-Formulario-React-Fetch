import React, { useState, useEffect } from "react";

const USERNAME = "AJPadillo";

const newUser = crearUsuario();
const newList = crearLista();

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
	}
}

//create your first component
const Home = () => {

	const [inputDef, setInputDef] = useState("");
	const [toDoList, setToDoList] = useState([]);

	// ****** INTERACTUAMOS CON UN SERVIDOR REAL, LO QUE HAGAMOS SE QUEDA EN EL SERVIDOR (USUARIO CREADO, LISTA CREADA, ETC.) ******
	// Quiero que cuando se cargue la pagina, la lista se sincronice con la API
	//Para hacer esto tengo que llamar a GET /users/{user_name}

	//^^^^^^^^^^^^ Que necesito para que esto funcione?(Lo de arriba) ^^^^^^^^^^^^^^
	// Necesito que exista un usuario
	// Como genero un usuario?
	// Llamando a POST de /users/{users_name}
	// Necesito que el usuario TENGA una lista
	// Como creo una lista?
	// Llamando a POST de /todos/{user_name}
	// Traeme la información

	//---------------------------------------------------------------------------------

	// CASO REAL (NO SE SI ES LA PRIMERA VEZ)
	// Averiguar si el usuario existe
	// Si el usuario existe
	// Averiguar si el usuario tiene una lista
	// Si el usuario SI tiene una lista
	// Traer la lista
	// Si el usuario NO tiene una lista
	// Crear la lista
	// Traer la lista
	// Si el usuario NO existe
	// Crear un usuario
	// Crear la lista
	// Traer la lista

	useEffect(() => {
		newUser;
		newList;
	}, []);


	const arrayPos = () => {
		return toDoList.map((elemento, index) => <li className="list-group-item d-flex justify-content-between align-items-center fs-3 ps-5" key={index}>{elemento}<span
			className="delete-btn btn btn-sm fs-3"
			onClick={() => deleteItem(index)}
		>
			&times;
		</span></li>);
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const newList = [...toDoList, inputDef];
		setToDoList(newList);
		setInputDef("");
	}

	const deleteItem = (index) => {
		const newList = toDoList.filter((_, i) => i !== index);
		setToDoList(newList);
	};

	return (
		<div className="container">
			<p className="titulo d-flex justify-content-center fw-light text-light">todos</p>
			<div className="mx-4">
				<form onSubmit={onSubmit} className="shadow-lg">
					<div>
						<input type="text" className="form-control rounded-0 border-bottom-0 fs-2 ps-5" placeholder="What needs to be done?" value={inputDef} onChange={(e) => setInputDef(e.target.value)} />
					</div>
				</form>
				<ul className="list-group rounded-0" style={{ listStyle: "none" }}>
					{arrayPos()}
					<p className="list-group-item mb-0">{toDoList.length > 0 ? toDoList.length + " item(s) left" : "No hay tareas, añadir tareas"}</p>
				</ul>
				<div style={{ height: '5px' }} className="border mx-1 shadow-sm bg-white"></div>
				<div style={{ height: '5px' }} className="border mx-2 shadow-sm bg-white"></div>
			</div>



		</div>
	);
};

export default Home;
