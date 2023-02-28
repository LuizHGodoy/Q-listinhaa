import { CheckCircle, Circle, PencilSimple, TrashSimple } from "phosphor-react";
import React, { useState, useEffect } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);

  useEffect(() => {
    const local = localStorage.getItem("todosLocalStorage");
    if (local) {
      setTodos(JSON.parse(local));
    }
  }, []);

  function handleAddToDo(event) {
    event.preventDefault();

    const inputField = event.target.elements.todo;

    if (inputField.value !== "") {
      setTodos([...todos, { text: inputField.value, completed: false }]);
      localStorage.setItem(
        "todosLocalStorage",
        JSON.stringify([...todos, { text: inputField.value, completed: false }])
      );
      inputField.value = "";
    }
  }

  function handleEditToDo(index) {
    setEditingIndex(index);
  }

  function handleUpdateToDo(event, index) {
    event.preventDefault();

    const inputField = event.target.elements.todo;

    if (inputField.value !== "") {
      const newTodos = [...todos];
      newTodos[index] = { ...newTodos[index], text: inputField.value };
      setTodos(newTodos);
      localStorage.setItem("todosLocalStorage", JSON.stringify(newTodos));
      setEditingIndex(-1);
    }
  }

  function handleMarkAsCompleted(index) {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], completed: true };
    setTodos(newTodos);
    localStorage.setItem("todosLocalStorage", JSON.stringify(newTodos));
    console.log("aoba", newTodos);
  }

  function handleMarkAsNotCompleted(index) {
    const newTodos = [...todos];
    newTodos[index] = { ...newTodos[index], completed: false };
    setTodos(newTodos);
    localStorage.setItem("todosLocalStorage", JSON.stringify(newTodos));
    console.log("aoba", newTodos);
  }

  function handleDeleteToDo(index) {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
    localStorage.setItem("todosLocalStorage", JSON.stringify(newTodos));
  }

  return (
    <div className="h-screen w-screen my-0 mx-auto bg-gradient-to-b from-[#94bbe9] via-[#eeaeca] to-[#94bbe9] max-w-[1200px] pt-24">
      <div className="flex flex-col justify-center items-center mb-16">
        <h1 className="font-bold text-3xl mb-4">Todo-list</h1>
        <form onSubmit={handleAddToDo}>
          <input
            id="todo"
            type="text"
            name="todo"
            autoComplete="off"
            className="px-5 py-2 rounded-md min-w-[24rem] text-gray-300 bg-transparent border"
          />
          <button type="submit" className="bg-cyan-800 ml-4">
            Add
          </button>
        </form>
      </div>

      <ul className="flex flex-col items-center justify-center">
        {todos.map((todo, index) => (
          <li key={index} className="min-w-full p-4 mb-6 rounded-lg shadow-md">
            {editingIndex === index ? (
              <form
                className="flex flex-col items-end p-2 "
                onSubmit={(event) => handleUpdateToDo(event, index)}
              >
                <textarea
                  name="todo"
                  defaultValue={todo.text}
                  className="p-2 w-full my-10 text-gray-300 bg-gray-900"
                />
                <button type="submit" className="bg-yellow-500 w-24">
                  Update
                </button>
              </form>
            ) : (
              <div className="flex flex-col p-2  w-full">
                <p
                  className={`${
                    todo.completed && "line-through"
                  } break-words mb-10 text-xl`}
                >
                  {todo.text}
                </p>
                {!todo.completed ? (
                  <div className="flex justify-end">
                    <CheckCircle
                      size={28}
                      className="text-blue-600 cursor-pointer hover:opacity-70 "
                      onClick={() => handleMarkAsCompleted(index)}
                    />

                    <PencilSimple
                      size={28}
                      className="text-[#155e80] cursor-pointer hover:opacity-70 mx-5"
                      onClick={() => handleEditToDo(index)}
                    />

                    <TrashSimple
                      size={28}
                      className="text-red-500 cursor-pointer hover:opacity-70"
                      onClick={() => handleDeleteToDo(index)}
                    />
                  </div>
                ) : (
                  <div className="flex justify-end">
                    <Circle
                      size={28}
                      className="text-blue-600 cursor-pointer hover:opacity-70 "
                      onClick={() => handleMarkAsNotCompleted(index)}
                    />
                    <TrashSimple
                      size={28}
                      className="text-red-500 cursor-pointer hover:opacity-70"
                      onClick={() => handleDeleteToDo(index)}
                    />
                  </div>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

localStorage.setItem;
export default App;
