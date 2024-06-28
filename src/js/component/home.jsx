import React, { useState } from "react";

//create your first component
const Home = () => {

	const [inputDef, setInputDef] = useState("");
	const [toDoList, setToDoList] = useState(['Make the bed', 'Wash my hands', 'Eat', 'Walk the dog'])

	function arrayPos() {
		for (let i = 0; i < toDoList.length; i++) {
			const elemento = toDoList[i];
			return elemento;
		}
	}

	const onSubmit = (e) => {
		e.preventDefault();
		const newList = [inputDef];
		setToDoList(newList);
		setInputDef("");
	}

	return (
		<>
			<form onSubmit={onSubmit}>
				<div className="mb-3">
					<input type="text" className="form-control" placeholder="What needs to be done?" value={inputDef} onChange={(e) => setInputDef(e.target.value)} />
				</div>
			</form>
			<ul>
				{arrayPos()}
				{arrayPos()}
				{arrayPos()}
			</ul>
		</>
	);
};

export default Home;
