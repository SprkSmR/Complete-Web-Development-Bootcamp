import React, { useState } from "react";

function App() {

  var [time, changeTime] = useState(0);

  function getTime() {
    const timeNow = new Date(Date.now());
    changeTime(timeNow.toLocaleTimeString());
  }

  setInterval(getTime, 1000);

  return (
    <div className="container">
      <h1>{time}</h1>
      <button onClick={getTime}>Get Time</button>
    </div>
  );
}

export default App;
