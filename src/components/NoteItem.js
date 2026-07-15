import React, { useContext } from 'react'
import noteContext from "../context/notes/noteContext";

const NoteItem = (props) => {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3">
      <div className="card my-3" >
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-start">
            <h5 className="card-title">{note.title}</h5>
            <div>
            <i className="fa-solid fa-trash-can me-3" style={{ cursor: 'pointer', display: "inline-block" }} onClick={() => { deleteNote(note._id); props.showAlert("Deleted Successfully","success") }}></i>
            <i className="fa-regular fa-pen-to-square mx-2" style={{ cursor: 'pointer' }} onClick={() => { updateNote(note) }}></i>
            </div>
          </div>
          <p className="card-text" style={{color:'purple'}}>{note.description} </p>
          {note.tag && <p className="card-text"><small className="text-danger">Tag: {note.tag}</small></p>}
        </div>
      </div>
    </div>
  )
}

export default NoteItem
