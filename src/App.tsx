import React, { useState } from "react";
import { ClueMaster } from "./cluemaster/ClueMaster";
import { Guesser } from "./guesser/Guesser";

function App() {
  const [role, setRole] = useState("none");

  return (
    <div className="bg-gray-50 min-h-screen">
      {role === "none" && (
        <div>
          <button onClick={() => setRole("cluemaster")}>Cluemaster</button>
          <button onClick={() => setRole("guesser")}>Guesser</button>
        </div>
      )}
      {role === "guesser" && <Guesser />}
      {role === "cluemaster" && <ClueMaster />}
    </div>
  );
}

export default App;
