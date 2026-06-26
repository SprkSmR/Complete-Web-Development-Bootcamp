import React from "react";
import Entry from "./Entry.jsx";
import emojiPedia from "../emojipedia.js";

function createEntry(emojiEntry) {
  return (
    <Entry 
      key={emojiEntry.id}
      emoji={emojiEntry.emoji}
      emojiName={emojiEntry.name}
      emojiDesc={emojiEntry.meaning}
    />
  );
}

function App() {
  return (
    <div>
      <h1>
        <span>emojipedia</span>
      </h1>

      <dl className="dictionary">
        {emojiPedia.map(createEntry)}
      </dl>
    </div>
  );
}

export default App;
