import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";

export default function Addcustomer() {
  const [note, setNote] = useState({
    firstname: "",
    lastname: "",
    street: "",
    address: "",
    city: "",
    state: "",
    email: "",
    phone: "",
  });

  const context = useContext(NoteContext);

  const { addNote } = context;

  const handleOnClick = (event) => {
    if (
      note.firstname.length < 1 ||
      note.lastname.length < 1 ||
      !note.street ||
      !note.city ||
      !note.state ||
      !note.email ||
      !note.address ||
      !note.phone
    ) {
      alert("Please fill in all fields before submitting.");
    } else {
      event.preventDefault();
      addNote(
        note.firstname,
        note.lastname,
        note.street,
        note.address,
        note.city,
        note.state,
        note.email,
        note.phone
      );
      setNote({
        firstname: "",
        lastname: "",
        street: "",
        address: "",
        city: "",
        state: "",
        email: "",
        phone: "",
      });
      // ...
    }
  };

  const handleOnChange = (event) => {
    setNote({ ...note, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <h2>Customer Details</h2>

      <form className="my-3">
        <div className="d-flex justify-content-evenly">
          <div className="mb-3">
            <input
              placeholder="First Name"
              type="text"
              className="form-control px-5"
              id="firstname"
              name="firstname"
              aria-describedby="emailHelp"
              value={note.firstname}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Last Name"
              type="text"
              className="form-control px-5"
              id="lastname"
              name="lastname"
              aria-describedby="emailHelp"
              value={note.lastname}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="mb-3">
            <input
              placeholder="Street"
              type="text"
              className="form-control px-5"
              id="street"
              name="street"
              aria-describedby="emailHelp"
              value={note.street}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder=" Address"
              type="text"
              className="form-control px-5"
              id="address"
              name="address"
              aria-describedby="emailHelp"
              value={note.address}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
        </div>
        <div className="d-flex justify-content-evenly">
          <div className="mb-3">
            <input
              placeholder="City"
              type="text"
              className="form-control px-5"
              id="city"
              name="city"
              aria-describedby="emailHelp"
              value={note.city}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="State"
              type="text"
              className="form-control px-5"
              id="state"
              name="state"
              aria-describedby="emailHelp"
              value={note.state}
              minLength={3}
              required
              onChange={handleOnChange}
            />
          </div>
        </div>

        <div className="d-flex justify-content-evenly">
          <div className="mb-3">
            <input
              placeholder="Email"
              type="email"
              className="form-control px-5"
              id="email"
              name="email"
              required
              value={note.email}
              onChange={handleOnChange}
            />
          </div>
          <div className="mb-3">
            <input
              placeholder="Phone"
              type="tel"
              className="form-control px-5"
              id="phone"
              required
              name="phone"
              value={note.phone}
              onChange={handleOnChange}
            />
          </div>
        </div>

        <button
          style={{
            position: "absolute",
            right: "100px",
            backgroundColor: "rgb(255 102 0)",
            cursor: "pointer",
          }}
          type="submit"
          className="btn "
          onClick={handleOnClick}
        >
          Submit
        </button>
      </form>
      <div className="d-flex my-5 flex-column text-center">
        <h2>Customers List Screen</h2>
        <Link to="/about">
          <button
            className="btn  py-1"
            style={{ backgroundColor: "rgb(255 102 0)" }}
          >
            View List
          </button>
        </Link>
      </div>
    </div>
  );
}
