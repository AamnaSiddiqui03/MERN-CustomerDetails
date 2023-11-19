import React, {useContext} from 'react'
import noteContext from "../context/notes/NoteContext";

export default function Noteitem(props) {
    const context = useContext(noteContext);
    const { deleteNote } = context;
    const { note, updateNote } = props;
    return (
            <tr className='text-center'>
            <td>{note.firstname}</td>
            <td>{note.lastname}</td>
            <td>{note.address}</td>
            <td>{note.city}</td>
            <td>{note.state}</td>
            <td>{note.email}</td>
            <td>{note.phone}</td>
            <td> <i className="far fa-trash-alt mx-2" style={{color: "#FF0000", cursor: "pointer"}} onClick={()=>{deleteNote(note._id)}} ></i>
                        <i className="fa-solid fa-pen "  style={{color: "#0b448e",cursor: "pointer"}} onClick={()=>{updateNote(note)}}></i>
            </td>
          </tr>
    )
}

