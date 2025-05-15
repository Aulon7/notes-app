import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import Modal from "../components/Modal";
import useAuthentication from "../context/useAuthentication";
import axios from "axios";
import NoteCard from "../components/NoteCard";
import { toast } from "react-toastify";

export interface NoteProps {
  _id: string;
  title: string;
  description: string;
}
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteProps | null>(null);
  const [query, setQuery] = useState<string>("");
  const [filteredNotes, setFilteredNotes] = useState<NoteProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuthentication();
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (openModal) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [openModal]);

  const fetchNotesData = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get(
        "https://notes-app-2nim.onrender.com/api/note",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setNotes(data.notes);
      setFilteredNotes(data.notes);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchNotesData();
  }, []);

  useEffect(() => {
    if (query.trim() === "") {
      setFilteredNotes(notes);
    } else {
      const filtered = notes.filter(
        (note) =>
          note.title.toLowerCase().includes(query.toLowerCase()) ||
          note.description.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredNotes(filtered);
    }
  }, [query, notes]);

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const onNoteEdit = (note: NoteProps) => {
    setCurrentNote(note);
    setOpenModal(true);
  };

  const queryHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const addNoteHandler = async (title: string, description: string) => {
    try {
      const response = await axios.post(
        "https://notes-app-2nim.onrender.com/api/note/add",
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotesData();
        closeModalHandler();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editNoteHandler = async (
    _id: string,
    title: string,
    description: string
  ) => {
    try {
      const response = await axios.put(
        `https://notes-app-2nim.onrender.com/api/note/${_id}`,
        {
          title,
          description,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotesData();
        closeModalHandler();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteNoteHandler = async (_id: string) => {
    try {
      const response = await axios.delete(
        `https://notes-app-2nim.onrender.com/api/note/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        toast.success("Note deleted successfully");
        fetchNotesData();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar queryHandler={queryHandler} query={query} />
      {user && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-3">
            {isLoading ? (
              <div className="col-span-3 flex justify-center items-center min-h-[50vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cyan-500"></div>
              </div>
            ) : filteredNotes.length === 0 ? (
              <div className="col-span-3 flex flex-col items-center justify-center min-h-[50vh] space-y-4">
                <div className="text-4xl text-gray-400">
                  {query ? "🔍" : "📝"}
                </div>
                <div className="text-xl text-gray-500 font-medium">
                  {query ? "No notes found" : "No notes yet"}
                </div>
                {!query && (
                  <p className="text-gray-400 text-sm">
                    Click the button below to create your first note
                  </p>
                )}
              </div>
            ) : (
              filteredNotes.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onNoteEdit={onNoteEdit}
                  deleteNoteHandler={deleteNoteHandler}
                />
              ))
            )}
          </div>
          <button
            onClick={() => {
              setCurrentNote(null);
              setOpenModal(true);
            }}
            className="fixed bottom-6 right-6 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition cursor-grab text-white p-3 rounded-xl"
          >
            Add a note
          </button>
        </>
      )}

      {openModal && (
        <Modal
          closeModalHandler={closeModalHandler}
          modalRef={modalRef}
          addNoteHandler={addNoteHandler}
          currentNote={currentNote}
          editNoteHandler={editNoteHandler}
        />
      )}
    </div>
  );
};

export default Home;
