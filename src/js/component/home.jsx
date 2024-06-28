import React, { useState } from "react";

//create your first component
const Home = () => {

	const [inputDef, setInputDef] = useState("");
	const [toDoList, setToDoList] = useState(['Make the bed', 'Wash my hands', 'Eat', 'Walk the dog'])

	const arrayPos = () => {
		return toDoList.map((elemento, index) => <li className="list-group-item d-flex justify-content-between align-items-center fs-3" key={index}>{elemento}<span
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
			<h1>todo</h1>
			<form onSubmit={onSubmit}>
				<div className="">
					<input type="text" className="form-control rounded-0 border-bottom-0 fs-3" placeholder="What needs to be done?" value={inputDef} onChange={(e) => setInputDef(e.target.value)} />
				</div>
			</form>
			<ul className="list-group rounded-0" style={{ listStyle: "none" }}>
				{arrayPos()}
			</ul>
		</div>
	);
};

export default Home;
