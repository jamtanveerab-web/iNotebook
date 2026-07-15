import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext.js'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote, notes } = context;
    const [note, setNotes] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNotes({ title: "", description: "", tag: "" });
         props.showAlert("Note Added Successfully","success")
    }
    const onChange = (e) => {
        setNotes({ ...note, [e.target.name]: e.target.value })

    }
    return (
    <>
            <h1>iNoteBook</h1>
            <p className="text-muted mb-3">You have {notes.length ? notes.length:"0"} Notes</p>
        <div className="container my-3 rounded-5 pb-3" style={{backgroundColor:"white"}}>
            <div className="mb-4 ">
                <p className='mx-3 pt-2 fs-4'><b>New Note</b></p>
                <input type="text" className="form-control" id="title" name="title" placeholder="Note Title" value={note.title} onChange={onChange} minLength={5} required />
            </div>
            <div className="mb-4">
                <input type='text' className="form-control" id="description" name="description" value={note.description} onChange={onChange} placeholder='Describe your Note' rows="1" minLength={5} required></input>
            </div>
            <div className="mb-4">
                <input type='text' className="form-control" id="tag" name="tag" value={note.tag} placeholder='Tag (comma-seperated): Work, Idea, Personal' onChange={onChange} rows="1"></input>
            </div>
            <button disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary " type='submit' onClick={handleClick}>Add note</button>
        </div>
        </>
    )
}

export default AddNote
