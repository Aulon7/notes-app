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
    try {
      const token = localStorage.getItem("token");
      const { data } = await axios.get("http://localhost:5000/api/note", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setNotes(data.notes);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchNotesData();
  }, []);

  const closeModalHandler = () => {
    setOpenModal(false);
  };

  const onNoteEdit = (note: NoteProps) => {
    setCurrentNote(note);
    setOpenModal(true);
  };

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
        `http://localhost:5000/api/note/${_id}`,
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
        `http://localhost:5000/api/note/${_id}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      if (response.data.success) {
        fetchNotesData();
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
              <NoteCard
                key={note._id}
                note={note}
                onNoteEdit={onNoteEdit}
                deleteNoteHandler={deleteNoteHandler}
              />
            ))}
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
