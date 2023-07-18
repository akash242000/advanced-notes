import React from 'react'
import Form from './Form'
import { useParams } from 'react-router-dom';
import { useNotes } from '../contexts/notesContext';

export default function EditNote() {

  const {id} = useParams();
  const {notes} =useNotes();

  const note = notes.find((n)=> n.id === id);

  return (
    <div>
      <Form NoteId={note.id} editTitle={note.title} editBody={note.body} editTags={note.tags} editing={true} />
    </div>
  )
}
