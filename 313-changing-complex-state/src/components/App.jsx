import React, { useState } from "react";

function App() {

  const [nameState, setNameState] = useState({
    firstName: "",
    lastName: ""
  });
  
  function handleChange(event) {
    var {name, value} = event.target;
    setNameState((previousState) => {
      if (name === "fName") {
        return {
          firstName: value,
          lastName: previousState.lastName
        };
      } else if (name === "lName") {
        return {
          firstName: previousState.firstName,
          lastName: value
        };
      }
    });
  }

  //var [firstName, setFirstName] = useState("");
  //var [lastName, setLastName] = useState("");

  //function handleFirstNameChange(event) {
  //  setFirstName(event.target.value);
  //}

  //function handleLastNameChange(event) {
  //  setLastName(event.target.value);
  //}

  return (
    <div className="container">
      <h1>Hello {nameState.firstName} {nameState.lastName}</h1>
      <form>
        <input 
          name="fName" 
          // value={firstName} 
          onChange={handleChange} 
          placeholder="First Name" 
        />
        <input 
          name="lName" 
          // value={lastName} 
          onChange={handleChange} 
          placeholder="Last Name" 
        />
        <button>Submit</button>
      </form>
    </div>
  );
}

export default App;
