import React, { useContext, useEffect, useState, useRef } from "react";
import NoteContext from "../context/notes/NoteContext";
import Noteitem from "./Noteitem";
import { Link } from "react-router-dom";
// import AddNote from "./AddNote";

import { useNavigate } from "react-router-dom";

export default function Notes() {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const Navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      Navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  const [note, setNote] = useState({
    id: "",
    efirstname: "",
    elastname: "",
    estreet: "",
    eaddress: "",
    ecity: "",
    estate: "",
    eemail: "",
    ephone: "",
  });

  const ref = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      efirstname: currentNote.firstname,
      elastname: currentNote.lastname,
      estreet: currentNote.street,
      eaddress: currentNote.address,
      ecity: currentNote.city,
      estate: currentNote.state,
      eemail: currentNote.email,
      ephone: currentNote.phone,
    });
  };

  const handleOnClick = () => {
    editNote(note.id, note.efirstname, note.elastname, note.estreet, note.eaddress, note.ecity, note.estate, note.eemail, note.ephone);
    
  };

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <>
      

      <button
        type="button"
        ref={ref}
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Edit Note
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"

      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3 ">
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    FirstName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="efirstname"
                    name="efirstname"
                    aria-describedby="emailHelp"
                    value={note.efirstname}
                    minLength={1}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    LastName
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="elastname"
                    value={note.elastname}
                    name="elastname"
                    minLength={1}
                    required
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Street
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="estreet"
                    value={note.eaddress}
                    name="estreet"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="eaddress"
                    value={note.eaddress}
                    name="eaddress"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    City
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ecity"
                    value={note.ecity}
                    name="ecity"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    State
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="estate"
                    value={note.estate}
                    name="estate"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="eemail"
                    value={note.eemail}
                    name="eemail"
                    onChange={handleOnChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    phone
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="ephone"
                    value={note.ephone}
                    name="ephone"
                    onChange={handleOnChange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="submit"
                disabled={
                  note.efirstname.length < 3 || note.elastname.length < 5
                }
                className="btn btn-primary "
                data-bs-dismiss="modal"
                onClick={handleOnClick}
              >
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
      <div className="d-flex justify-content-sm-between">
      <h2>Customers List Screen</h2> 
      <Link to="/">
          <button type="submit" className="btn py-1" style={{backgroundColor:"rgb(255 102 0)"}} >
            Add Customer
          </button>
    </Link>

      </div>
      <table class="table table-bordered text-center">
  <thead>
    <tr>
      <th scope="col">FirstName</th>
      <th scope="col">LastName</th>
      <th scope="col">Address</th>
      <th scope="col">City</th>
      <th scope="col">State</th>
      <th scope="col">Email</th>
      <th scope="col">Phno</th>
      <th scope="col">Action</th>

    </tr>
  </thead>
  <tbody>
  <code >
          {!notes.length && "  No Entries"}
        </code>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
  </tbody>
</table>

      </div>
    </>
  );
}
