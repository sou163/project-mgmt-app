import { useState } from "react";

export default function NewTask({ onAddTask }) {
  const [enteredTask, setEnteredTask] = useState("");

  function inputChangeHandler(event) {
    setEnteredTask(event.target.value);
  }

  function clickHandler() {
    if (enteredTask.trim() === "") {
      return;
    }

    onAddTask(enteredTask);
    setEnteredTask("");
  }

  return (
    <div className="flex items-center gap-4">
      <input
        type="text"
        className="w-64 px-2 py-1 rounded-sm bg-stone-200"
        onChange={inputChangeHandler}
        value={enteredTask}
      />
      <button
        className="text-stone-700 hover:text-stone-950"
        onClick={clickHandler}
      >
        Add Task
      </button>
    </div>
  );
}
