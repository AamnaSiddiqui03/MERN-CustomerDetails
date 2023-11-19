import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const initialNotes = []

  const {showAlert} = props;

  const host = "http://localhost:5000"

  const [notes, setNotes] = useState(initialNotes);

  const getNotes = async ()=>{
    const response = await fetch(`${host}/api/notes/fetchallnotes/assignment.jsp`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const json = await response.json();

    setNotes(json);
  };

  const addNote = async (firstname, lastname, street, address, city, state, email, phone) => {

    const response = await fetch(`${host}/api/notes/addnote/assignment.jsp`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({firstname, lastname, street, address, city, state, email, phone})
    });

    const note = await response.json();

    setNotes(notes.concat(note));
    showAlert('Note has been Added Successfully!', "success");
  }

  const deleteNote = async (id) => {

    await fetch(`${host}/api/notes/deletenote/assignment.jsp/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      }
    });

    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes);
    showAlert('Note has been Deleted Successfully!', "success");
  }

  const editNote = async (id, firstname, lastname, street, address, city, state, email, phone) => {

    await fetch(`${host}/api/notes/updatenote/assignment.jsp/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({firstname, lastname, street, address, city, state, email, phone})
    });

    getNotes();
    showAlert('Note has been Updated Successfully!', "success");
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
};

export default NoteState;