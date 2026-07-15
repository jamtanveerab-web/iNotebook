const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Note')
const router = express.Router()
const { body, validationResult } = require('express-validator');

// route 1 : get all the notes using :get "api/notes/fetchallnotes" : login required
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json(notes)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }

})
// route 2 : Add a new notes using :post "api/notes/addnote": login required
router.post('/addnotes', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'description must be atleast 5 character ').isLength({ min: 5 }),], async (req, res) => {
        try {
            const { title, description, tag } = req.body;
            // if there are error , return bsd request and the error
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Note({
                title, description, tag, user: req.user.id
            })
            const savedNote = await note.save()
            res.json(savedNote)
        } catch (error) {
            console.error(error.message);
            res.status(500).send("internal server error");
        }
    })
// route 3 : update the notes using :put "api/notes/updatenote" : login required
router.put('/updatenotes/:id', fetchuser,  async (req, res) => {
    try {
        const {title,description,tag} = req.body;
        // create a newNote obect
        const newNote = {};
        if(title){newNote.title = title}
        if(description){newNote.description = description}
        if(tag){newNote.tag = tag}

        // find the note to be updated and update it 
        let note = await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send("Not Found ")
        }
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{ returnDocument: 'after' })
        res.json({note})
        }  catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
        })
        // route 4 : get all the notes using :delete "api/notes/deletenote" : login required
router.delete('/deletenotes/:id', fetchuser,  async (req, res) => {
    try {       
        // find the note to be delete and delete it 
        let note = await Note.findById(req.params.id);
        if(!note){
           return res.status(404).send("Not Found ")
        }
        // allow deletion only the user own these notes
        if(note.user.toString() !== req.user.id){
            return res.status(401).send("Not Allowed")
        }
        note = await Note.findByIdAndDelete(req.params.id)
        res.json({"success":"Note has been deleted",note:note})
        }  catch (error) {
        console.error(error.message);
        res.status(500).send("internal server error");
    }
        })
module.exports = router 