import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

// Replace 'any' with your NoteProps type if you have it
interface Props {
  modalOpenHandler: () => void;
  openModal: boolean;
  currentNote: any;
  onEditSubmit: (data: { title: string; description: string }) => void;
}

const Modal = ({ modalOpenHandler, openModal, currentNote }: Props) => {
  const modalRef = useRef(null);

  // State for form fields
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (openModal) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [openModal]);

  return (
    <div className="flex justify-center items-center fixed inset-0">
      <div
        ref={modalRef}
        className="bg-white p-8 rounded-xl border border-gray-200 shadow-md"
      >
        <h2 className="text-xl font-medium mb-4">
          {currentNote ? "Edit Note" : "Add a new note"}
        </h2>
        <form>
          <input
            type="text"
            placeholder="Enter the title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-xl focus:outline-cyan-600"
          />
          <textarea
            placeholder="Description of note"
            value={description}
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
