const express = require('express')
const router = express.Router();
let fetchuser = require('../middlewares/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');

router.get('/fetchallnotes/assignment.jsp', fetchuser, async (req, resp) => {
    try {
        const notes = await Note.find({ user: req.user.id })
        resp.json(notes);
    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal Server Error");
    }
});

router.post('/addnote/assignment.jsp', fetchuser, [
    body("firstname", "Enter a valid firstname").isLength({ min: 3 }),
    body("lastname", "Enter a valid firstname").isLength({ min: 3 })
], async (req, resp) => {

    const { firstname, lastname, street, address, city, state, email, phone } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return resp.status(400).json({ errors: errors.array() });
    }

    try {

        let note = new Note({firstname, lastname, street, address, city, state, email, phone, user: req.user.id });

        const savedNote = await note.save();

        resp.status(201).send(savedNote);


    } catch (error) {
        console.error(error.message);
        resp.status(500).send("Internal Server Error");
    }
});

router.put('/updatenote/assignment.jsp/:id', fetchuser, async (req, resp) => {

    const {firstname , lastname, street, address, city, state, email, phone } = req.body;

    const newNote = {};

    if (firstname) {
        newNote.firstname = firstname;
    }
    if (lastname) {
        newNote.lastname = lastname;
    }
    if (street) {
        newNote.street = street;
    }
    if (address) {
        newNote.address = address;
    }
    if (city) {
        newNote.city = city;
    }
    if (state) {
        newNote.state = state;
    }
    if (email) {
        newNote.email = email;
    }
    if (phone) {
        newNote.phone = phone;
    }

    let note = await Note.findById(req.params.id);
    if (!note) {
        resp.status(400).send("Body is Empty");
    }

    if (note.user.toString() !== req.user.id) {
        return res.status(500).send("UUID not found");
    }

    note = await Note.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true })
   
    resp.status(200).json(note);

});

router.delete('/deletenote/assignment.jsp/:id', fetchuser, async (req, resp) => {

    const {firstname, lastname, street, address, city, state, email, phone} = req.body;

    try {
        let note = await Note.findById(req.params.id);

        if (!note) {
            resp.status(400).send("Not Found");
        }

        if (note.user.toString() !== req.user.id) {
            return res.status(400).send("UUID not found");
        }

        note = await Note.findByIdAndDelete(req.params.id);
        
        resp.status(200).json({ "Success": "Note has been deleted successfully!", note: note });
    }
    catch (error) {
        console.error(error.message);
        resp.status(500).send("Error-> not deleted");
    }

});

module.exports = router;