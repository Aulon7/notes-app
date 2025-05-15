import { FaEdit, FaTrash } from "react-icons/fa";
import { NoteProps } from "../pages/Home";
interface NoteCardProps {
  note: NoteProps;
  onNoteEdit: (note: NoteProps) => void;
  deleteNoteHandler: (noteId: string) => void;
}
const NoteCard = ({ note, onNoteEdit, deleteNoteHandler }: NoteCardProps) => {

  const formatDate = (date: string | null | undefined) => {
    if (!date) return 'No date';
    return  new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }
  return (
    <div className="bg-white m-2 p-4 rounded-xl shadow">
      <h2 className="text-xl font-medium">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex mt-5 pt-3">
        <div className="flex-1 text-left text-xs text-gray-500">
          Created: {formatDate(note.createdAt)}
        </div>
        <div className="flex-1 text-right">
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
    </div>
  );
};

export default NoteCard;
