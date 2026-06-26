import React from "react";
import Card from "./Card.jsx"

function App() {
  return (
    <div>
      <h1 className="heading">My Contacts</h1>
      <Card 
        name= "Durandal"
        img= "https://preview.redd.it/two-neat-things-i-saw-in-the-cryo-archive-intro-v0-sncjri3y3cqg1.jpg?width=640&crop=smart&auto=webp&s=f9da52c99fc122b13dcc3bbff522ffaf7beda5ca"
        phone= "2212588711"
        mail= "durandal@marathon.com" 
      />
  
      <Card 
        name= "Rasputin"
        img= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR5IIu8vA_rX6xF_I1E-3I-u73SS_tWb14tfQ&s"
        phone= "2212588711"
        mail= "rasputin@destiny.com" 
      />
  
      <Card 
        name= "Mendicant Bias"
        img= "https://static.wikia.nocookie.net/halo/images/7/7d/HEnc22_-_Mendicant_Bias.jpg/revision/latest?cb=20220423174648&path-prefix=es"
        phone= "2212588711"
        mail= "mendicant-bias@halo.com" 
      />
    </div>
  );
}

export default App;
