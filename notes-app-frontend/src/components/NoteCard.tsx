import { FaEdit, FaTrash } from "react-icons/fa";
interface NoteCardProps {
  note: NoteProps;
}
const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className="bg-white m-2 p-4 rounded-xl shadow">
      <h2 className="text-xl font-medium">{note.title}</h2>
      <p>{note.description}</p>
      <div className="flex justify-end mt-2">
        <button className="text-cyan-600 mr-2">
          <FaEdit />
        </button>
        <button className="text-red-600 mr-2">
          <FaTrash />
        </button>
      </div>
    </div>
  );
};

export default NoteCard;
