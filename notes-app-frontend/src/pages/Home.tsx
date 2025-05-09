// import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
// import Modal from "../components/Modal";
// import NoteCard from "../components/NoteCard";
// import axios from "axios";
// import { toast } from "react-toastify";

const Home = () => {
  // const [openModal, setOpenModal] = useState(false);
  // const [notes, setNotes] = useState([]);
  // const [currentNote, setCurrentNote] = useState(null);

  // const fetchNotes = async () => {
  //   try {
  //     const response = await axios.get("http://localhost:5000/api/note", {
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem("token")}`,
  //       },
  //     });
  //     if (response?.data.notes) setNotes(response.data.notes); // Assuming the API returns a `notes` array
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // useEffect(() => {
  //   fetchNotes();
  // }, []);

  // const modalOpenHandler = () => {
  //   setOpenModal((prevState) => !prevState);
  // };

  // const onSubmit = async (data) => {
  //   try {
  //     if (currentNote) {
  //       // Update existing note
  //       const response = await axios.put(
  //         `http://localhost:5000/api/note/${currentNote._id}`,
  //         data,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.data?.success) {
  //         toast.success("Note updated successfully", {
  //           position: "top-center",
  //           autoClose: 3000,
  //         });
  //         fetchNotes();
  //       }
  //     } else {
  //       // Create new note
  //       const response = await axios.post(
  //         "http://localhost:5000/api/note/add",
  //         data,
  //         {
  //           headers: {
  //             Authorization: `Bearer ${localStorage.getItem("token")}`,
  //           },
  //         }
  //       );
  //       if (response.data?.success) {
  //         toast.success("Note added successfully", {
  //           position: "top-center",
  //           autoClose: 3000,
  //         });
  //         fetchNotes();
  //       }
  //     }
  //     setOpenModal(false); // Close the modal
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Failed to save note", {
  //       position: "top-center",
  //       autoClose: 3000,
  //     });
  //   }
  // };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="grid grid-cols-1 md:grid-cols-3 mt-3">asdasd</div>
      <button className="fixed bottom-6 right-6 px-4 py-2 bg-cyan-500 hover:bg-cyan-600 transition cursor-grab text-white rounded-full shadow-lg">
        Add a note
      </button>
    </div>
  );
};

export default Home;
