import { useEffect, useRef, useState } from "react";
import Navbar from "../components/Navbar";
import gsap from "gsap";
import Modal from "../components/Modal";
import useAuthentication from "../context/useAuthentication";
import axios from "axios";
import NoteCard from "../components/NoteCard";

export interface NoteProps {
  _id: string;
  title: string;
  description: string;
}
const Home = () => {
  const [openModal, setOpenModal] = useState(false);
  const [notes, setNotes] = useState<NoteProps[]>([]);
  const [currentNote, setCurrentNote] = useState<NoteProps | null>(null);
  const { user } = useAuthentication();
  const modalRef = useRef<HTMLDivElement>(null);

  const openModalHandler = () => {
    setOpenModal((prevState) => !prevState);
  };

  const onNoteEdit = (note: NoteProps) => {
    setCurrentNote(note);
    setOpenModal(true);
  };
  const fetchNotesData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/note");
      setNotes(response.data.notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotesData();
  }, []);

  useEffect(() => {
    if (openModal) {
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.8, y: -50 },
        { opacity: 1, scale: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [openModal]);

  const addNoteHandler = async (title: string, description: string) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/note/add",
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
      if (response.data.sucess) {
        fetchNotesData();
        openModalHandler();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };

  const editNoteHandler = async (
    id: string,
    title: string,
    description: string
  ) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/note/${id}`,
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
      if (response.data.sucess) {
        fetchNotesData();
        openModalHandler();
      }
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  console.log("test", notes);
  return (
    <div className="min-h-screen">
      <Navbar />
      {user && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-3 mt-3">
            {notes.map((note) => (
              <NoteCard key={note._id} note={note} onNoteEdit={onNoteEdit} />
            ))}
          </div>
          <button
            onClick={openModalHandler}
            className="fixed bottom-6 right-6 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition cursor-grab text-white p-3 rounded-xl"
          >
            Add a note
          </button>
        </>
      )}

      {openModal && (
        <Modal
          openModalHandler={openModalHandler}
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
