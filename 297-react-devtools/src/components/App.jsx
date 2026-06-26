import React from "react";
import Card from "./Card";
import contacts from "../contacts";
import Avatar from "./Avatar.jsx";

function App() {
  return (
    <div>

      <Avatar 
        img="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR2ZBl1PkYZZ5ktR_THhjcOAnL6ujd7RJxC7g&s"
      />

      <h1 className="heading">My Contacts</h1>

      <Card
        name={contacts[0].name}
        img={contacts[0].imgURL}
        tel={contacts[0].phone}
        email={contacts[0].email}
      />
      <Card
        name={contacts[1].name}
        img={contacts[1].imgURL}
        tel={contacts[1].phone}
        email={contacts[1].email}
      />
      <Card
        name={contacts[2].name}
        img={contacts[2].imgURL}
        tel={contacts[2].phone}
        email={contacts[2].email}
      />
    </div>
  );
}

export default App;
