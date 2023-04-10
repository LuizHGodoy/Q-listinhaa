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
    <div className="min-h-[100vh] min-w-[100vw] my-0 mx-auto bg-sky-950 pt-24">
      <div className="flex flex-col justify-center items-center mb-16">
        <img src="https://i.imgur.com/lG8TqmF.gif" width="100" height="100" />

        <form
          onSubmit={handleAddToDo}
          className="mt-5 items-center justify-center"
        >
          <input
            id="todo"
            type="text"
            name="todo"
            placeholder="type your task title here"
            autoComplete="off"
            className="px-5 py-2 rounded-md w-[22rem] cel-sm:w-[95%] cel-md:w-[100%] cel-lg:w-[100%] mr-4 cel-sm:mr-0 cel-md:mr-0 cel-lg:mr-0 ml-8 cel-sm:ml-2 cel-md:ml-0 cel-lg:ml-0 text-gray-300 bg-cyan-700"
          />
          <button
            type="submit"
            className="bg-cyan-500 cel-sm:mt-2 cel-md:mt-2 cel-lg:mt-2 cel-sm:ml-2 cel-sm:w-[95%] cel-md:ml-0 cel-md:w-[100%] cel-lg:ml-0 cel-lg:w-[100%] "
          >
            Add
          </button>
        </form>
      </div>

      <ul className="flex flex-col items-center justify-center">
        {todos.map((todo, index) => (
          <li
            key={index}
            className="w-[80%] p-4 mb-6 rounded-lg shadow-md bg-sky-900 cel-sm:w-[95%] cel-md:w-[82%] cel-lg:w-[75%]"
          >
            {editingIndex === index ? (
              <form
                className="flex flex-col items-end p-2"
                onSubmit={(event) => handleUpdateToDo(event, index)}
              >
                <textarea
                  name="todo"
                  defaultValue={todo.text}
                  className="p-2 w-full my-10 h-auto text-gray-200 bg-cyan-600 rounded-lg "
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
                      className="text-cyan-500 cursor-pointer hover:opacity-70 "
                      onClick={() => handleMarkAsCompleted(index)}
                    />

                    <PencilSimple
                      size={28}
                      className="text-yellow-500 cursor-pointer hover:opacity-70 mx-5"
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
                      className="text-cyan-500 cursor-pointer hover:opacity-70 "
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
