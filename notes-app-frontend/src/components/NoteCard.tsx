import { FaEdit, FaTrash } from "react-icons/fa";
import { NoteProps } from "../pages/Home";
interface NoteCardProps {
  note: NoteProps;
  onNoteEdit: (note: NoteProps) => void;
  deleteNoteHandler: (noteId: string) => void;
}
const NoteCard = ({ note, onNoteEdit, deleteNoteHandler }: NoteCardProps) => {
  return (
    <div className="bg-white m-2 p-4 rounded-xl shadow">
      <h2 className="text-xl font-medium">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end mt-2">
        <button
          onClick={() => onNoteEdit(note)}
          className="text-cyan-600 mr-2 cursor-grab"
        >
          <FaEdit />
        </button>
        <button
          onClick={() => deleteNoteHandler(note._id)}
          className="text-red-600 mr-2 cursor-grab"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
