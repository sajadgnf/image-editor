import React, { useState } from "react";

// componenets
import Navbar from "./components/Navbar";
import Editor from "./components/Editor";
import ImageDisplay from "./components/ImageDisplay";


// context
import EditorContextProver from "./context/EditorContextProvider"

// styles
import "./index.scss"

function App() {


  const [dark, setDark] = useState(false)

  return (
    <div className="app">
      <EditorContextProver>
        <Navbar dark={dark} setDark={setDark} />
        <ImageDisplay dark={dark} />
        <Editor dark={dark} />
      </EditorContextProver>
    </div>
  );
}

export default App;
