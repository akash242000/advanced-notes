import React from 'react'
import { useNotes } from '../contexts/notesContext'

export default function Tag({tag}) {

  const {deleteTag} =useNotes()
  return (
    <div className='tag-single-container'>
      <span>{tag}</span>
      <button onClick={()=>deleteTag(tag)}>❌</button>
    </div>
  )
}
