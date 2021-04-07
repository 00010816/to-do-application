import React, { useState, useEffect } from "react";
import ToDo from "./ToDo";
import ToDoForm from "./ToDoForm";

function ToDoList() {
  const [todos, setTodos] = useState([]);

  const AddTodo = (todo) => {
    if (!todo.text || /^\s*$/.test(todo.text)) {
      return;
    }

    const newTodos = [todo, ...todos];

    // setTodos(newTodos);
    saveToBackend(todo);
  };

  async function saveToBackend(todo) {
    const res = await fetch("http://localhost/addTodo", {
      method: "post",
      body: JSON.stringify(todo),
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    const obj = await res.json();
    getTodos();
  }

  async function updateFromBackend(id, object) {
    object.id = id;
    object.newText = object.text;
    const res = await fetch("http://localhost/editTodo", {
      method: "put",
      body: JSON.stringify(object),
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    const obj = await res.json();
    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    const res = await fetch("http://localhost/todos", {
      method: "get",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    const obj = await res.json();
    setTodos(obj.object);
  }

  async function deleteTodos(id) {
    const res = await fetch("http://localhost/deleteTodo/" + id, {
      method: "delete",
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer",
    });
    const obj = await res.json();
    getTodos();
  }

  const updateTodo = (todoId, newValue) => {
    if (!newValue.text || /^\s*$/.test(newValue.text)) {
      return;
    }
    updateFromBackend(todoId, newValue);
  };

  const completeTodo = (id) => {
    let updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.isComplete = !todo.isComplete;
      }
      return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div>
      <h1>What's the Plan for Today?</h1>
      <ToDoForm onSubmit={AddTodo} />
      <ToDo
        todos={todos}
        completeTodo={completeTodo}
        removeTodo={(id) => deleteTodos(id)}
        updateTodo={updateTodo}
      />
    </div>
  );
}

export default ToDoList;
