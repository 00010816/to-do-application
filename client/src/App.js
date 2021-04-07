import React from "react";
import "./App.css";
import ToDoList from "./components/ToDoList";

function App() {
  return (
    <div className="todo-app">
      <header>
        <ToDoList />
      </header>
    </div>
  );
}

export default App;
