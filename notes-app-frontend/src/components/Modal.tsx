import { useEffect, useState } from "react";
import { NoteProps } from "../pages/Home";
interface Props {
  closeModalHandler: () => void;
  modalRef: React.RefObject<HTMLDivElement | null>;
  addNoteHandler: (title: string, description: string) => void;
  currentNote?: NoteProps | null;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  editNoteHandler?: any | null;
}

const Modal = ({
  closeModalHandler,
  modalRef,
  addNoteHandler,
  currentNote,
  editNoteHandler,
}: Props) => {
  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (currentNote) {
      setTitle(currentNote.title);
      setDescription(currentNote.description);
    }
  }, [currentNote]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (currentNote) {
      editNoteHandler(currentNote._id, title, description);
    } else {
      addNoteHandler(title, description);
    }
    closeModalHandler();
  };

  return (
    <div className="flex justify-center items-center fixed inset-0 bg-gray-800/75">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl border border-gray-200 shadow-md"
      >
        <h2 className="text-xl font-medium mb-4">
          {currentNote ? "Edit note" : "Add a new note"}
        </h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            placeholder="Enter the title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
          />
          <textarea
            value={description}
            placeholder="Description of note"
            onChange={(e) => setDescription(e.target.value)}
            className="min-h-40 w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition cursor-grab text-white p-3 rounded-xl"
          >
            {currentNote ? "Edit note" : "Add note"}
          </button>
          <button
            type="button"
            onClick={closeModalHandler}
            className="px-4 py-2 ml-2 bg-gray-300 hover:bg-gray-400 transition cursor-grab text-black p-3 rounded-xl"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default Modal;
