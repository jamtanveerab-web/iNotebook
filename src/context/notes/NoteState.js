import { useState } from "react";
import NoteContext from "./noteContext";

const NoteStates = (props) => {
    const host = process.env.REACT_APP_BACKEND_URL;
    const notesInitial = []
    const [notes, setNotes] = useState(notesInitial)

    // get all note 
    const getNotes = async () => {
        //Api call
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        setNotes(json)
    }
    // Add a note 
    const addNote = async (title, description, tag) => {
        // TODO Api call
        const response = await fetch(`${host}/api/notes/addnotes`, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const note = await response.json();
        if (response.ok) {
            setNotes(notes.concat(note));   // only add on success
        }
    }
    // Delete a note.
    const deleteNote = async (id) => {
        // TODO Api call
        const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
        });
        const json = await response.json();
        console.log(json);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes);
    }
    //Edit a note.
    const editNote = async (id, title, description, tag) => {
        // TODO Api call
        const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            },
            body: JSON.stringify({ title, description, tag })
        });
        const json = await response.json();
        console.log(json);
        let newNotes = JSON.parse(JSON.stringify(notes))
        //logic to edit in client 
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }
    return (
        <NoteContext.Provider value={{ notes, editNote, deleteNote, addNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteStates;