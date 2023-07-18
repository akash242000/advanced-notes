import React from 'react'
import Form from './Form'
import { v4 as uuidv4 } from 'uuid';

export default function NewNote() {
  
  return (
    <div>
      <h1>New Note</h1>
      <Form NoteId={uuidv4()} />
    </div>
  )
}
