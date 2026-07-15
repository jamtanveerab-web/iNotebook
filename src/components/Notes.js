import React, { useContext, useEffect, useRef,useState } from 'react'
import noteContext from '../context/notes/noteContext.js'
import NoteItem from './NoteItem.js';
import AddNote from './AddNote.js';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
      const navigate = useNavigate();
  const context = useContext(noteContext);
  const { notes, getNotes, editNote } = context;
  useEffect(() => {
    if(localStorage.getItem('token')){
     getNotes()
    }else{
      navigate("/login")
    }
    // eslint-disable-next-line
  }, [])
  // eslint-disable-next-line
  const [note,setNotes] = useState({id: "", etitle:"",edescription:"",etag:"default"})
  const ref = useRef(null);
  const refClose = useRef(null);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNotes({id:currentNote._id, etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

    const handleClick = (e) =>{
      editNote(note.id,note.etitle,note.edescription,note.etag);
      document.activeElement.blur();
    refClose.current.click();
     props.showAlert("Updated Successfully","success") 
    
  }
  const onChange = (e) =>{
    setNotes({...note,[e.target.name]:e.target.value})
  }
  return (
    <>
      <AddNote showAlert={props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle" placeholder="Title" value={note.etitle} onChange={onChange} minLength={5} required />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label" >Description</label>
                <textarea className="form-control" id="edescription" name="edescription"value={note.edescription} onChange={onChange} rows="1" minLength={5} required></textarea>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <textarea className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} rows="1" minLength={5} required></textarea>
              </div>
          <div className="modal-footer">
            <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
          </div>
            </div>
          </div>
        </div>
      </div>
    
      <div className="row my-3">
        <h1>Your Notes</h1>
       <div className="text-center text-muted koo">
  {notes.length === 0 && (
    <div>
      <p className="mb-1 fs-4"> Your notebook is empty.</p>
      <p className="mb-0">Add your first note above.</p>
    </div>
  )}
</div>
        {notes.map((note) => {
          return <NoteItem key={note._id} showAlert={props.showAlert} updateNote={updateNote} note={note} />
        })}
      </div>
  </>
  )
}

export default Notes
