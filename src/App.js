import React, { useReducer, useState } from 'react';
import './App.css';

function reducer (state, action) {
  switch (action.type) {
    case "ADD":
      return {
        currentId: state.currentId + 1,
        notes: [...state.notes, {id: state.currentId, note: <Note editNote={action.editNote}/>}]
      };
      case "REMOVE":
        return {
          ...state,
          notes: state.notes.filter((note) => note.id !== action.id)
        }
      default:
        return (state);
  }
}

const Note = (props) => {
  const [objectNotes, dispatch] = props.editNote;
  const [isDisabled, setDisabled] = useState(false);

  const removeNote = (id) => {
    dispatch({type: "REMOVE", id});
  }

  return (
    <div>
      <div className="header_note">
        <i className="fas fa-trash-alt" onClick={() => removeNote(objectNotes.currentId)}/>
        <i className="fas fa-edit" onClick={() => setDisabled(!isDisabled)}/>
      </div>
      <div className="writting">
        <textarea className="zoneToWrite" disabled={isDisabled}/>
      </div>
    </div>
  )
}

function NotesApp() {
  const [objectNotes, dispatch] = useReducer(reducer, {
    currentId: 0,
    notes: [],
  });

  const addNote = () => {
    dispatch({type: "ADD", editNote: [objectNotes, dispatch]});
  }

  return (
    <div className="container">
      <button className="button" onClick={addNote}>
            <i className="fas fa-plus"/>
            Add Note
      </button>
      <ul className="notes">
        {objectNotes.notes.map(({id, note}) => 
          <li key={id} className="note">
            {note}
          </li>)}
      </ul>
    </div>
  );
}

export default NotesApp;

























/*
const BoutonAddNote = document.getElementsByClassName("bouton")[0];
const notes = document.getElementsByClassName("notes")[0];

function isListening (div, i, i2, textarea)
{
    i.addEventListener('click', () => notes.removeChild(div));
    i2.addEventListener('click', () => textarea.disabled == true ? textarea.removeAttribute("disabled") : textarea.setAttribute("disabled", "true"));
}

function createNote () {
    const div = document.createElement('div');
    const header = document.createElement('header');
    const i = document.createElement('i');
    const i2 = document.createElement('i'); 
    const main = document.createElement('main'); 
    const textarea = document.createElement('textarea');

    div.classList.add("note");
    i.classList.add("fas", "fa-trash-alt");
    i2.classList.add("fas", "fa-edit");
    header.classList.add("header_note");
    main.classList.add("writting");
    textarea.className = "zoneToWrite";

    notes.append(div);
    div.append(header, main);
    header.append(i, i2);
    main.appendChild(textarea);

    isListening(div, i, i2, textarea);
}

BoutonAddNote.addEventListener('click', () => createNote());
*/