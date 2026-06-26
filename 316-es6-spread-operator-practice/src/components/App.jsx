import React, { useState } from "react";

function App() {

  const [currentInput, changeCurrent] = useState("");
  const [itemList, changeList] = useState([]);

  function handleChange(event) {
    var newInput = event.target.value;
    changeCurrent(newInput);
  }

  function handleAddition(event) {
    changeList((previousState) => {
      return [...previousState, currentInput]
    })
    changeCurrent("");
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input value={currentInput} onChange={handleChange} type="text" />
        <button onClick={handleAddition}>
          <span>Add</span>
        </button>
      </div>
      <div>
        <ul>
          {itemList.map((item) => <li>{item}</li>)}
        </ul>
      </div>
    </div>
  );
}

export default App;
