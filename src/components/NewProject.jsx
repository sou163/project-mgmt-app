import { useRef } from "react";

import Input from "./Input.jsx";
import Modal from "./Modal.jsx";

export default function NewProject({ onAddProject, onCancel }) {
  const modalRef = useRef();

  const titleRef = useRef();
  const descRef = useRef();
  const dateRef = useRef();

  function saveHandler() {
    const enteredTitle = titleRef.current.value;
    const enteredDesc = descRef.current.value;
    const enteredDate = dateRef.current.value;

    if (
      enteredTitle.trim() === "" ||
      enteredDesc.trim() === "" ||
      enteredDate.trim() === ""
    ) {
      modalRef.current.open();
      return;
    }

    onAddProject({
      title: enteredTitle,
      description: enteredDesc,
      date: enteredDate,
    });
  }

  return (
    <>
      <Modal ref={modalRef} btnCaption="Close">
        <h2 className="text-xl font-bold text-stone-700 my-4">Invalid Input</h2>
        <p className="text-stone-600 mb-4">
          Oops... you have forgot to enter a value.
        </p>
        <p className="text-stone-600 mb-4">
          Please make sure to enter valid values in each input field.
        </p>
      </Modal>
      <div className="w-[35rem] mt-16">
        <menu className="flex items-center justify-end gap-4 my-4">
          <li>
            <button
              className="text-stone-800 hover:text-stone-950"
              onClick={onCancel}
            >
              Cancel
            </button>
          </li>
          <li>
            <button
              className="px-6 py-2 rounded-md bg-stone-800 text-stone-50 hover:bg-stone-950"
              onClick={saveHandler}
            >
              Save
            </button>
          </li>
        </menu>
        <div>
          <Input ref={titleRef} label="Title" type="text" />
          <Input ref={descRef} label="Description" textarea />
          <Input ref={dateRef} label="Due Date" type="date" />
        </div>
      </div>
    </>
  );
}
