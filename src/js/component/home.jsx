import React, { useState } from "react";

//create your first component
const Home = () => {

	const [inputDef, setInputDef] = useState("");
	const [toDoList, setToDoList] = useState(['Make the bed', 'Wash my hands', 'Eat', 'Walk the dog'])

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
					<p className="list-group-item">{toDoList.length > 0 ? toDoList.length + " item(s) left" : "No hay tareas, añadir tareas"}</p>
				</ul>
			</div>

		</div>
	);
};

export default Home;
