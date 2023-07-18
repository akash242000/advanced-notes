import React from 'react'
import { useNotes } from '../contexts/notesContext'
import {useNavigate , useParams} from 'react-router-dom';
import {Link} from 'react-router-dom';

export default function NotePage() {

    const {id}= useParams();
    const navigate = useNavigate();

    const {notes,deletenote} =useNotes();
    const note= notes.find((n)=> n.id===id );

    function handleDelete(){
      deletenote(id);
      console.log("deleted")
      navigate('/');
    }

  return (
    <div className='note-page-container'>
      {note &&<>
        <div className="header-nav">
            <h1>{note.title}</h1>
            <div className="button-wrapper">
                <Link to={`/${id}/edit`}>
                    <button className='btn' >Edit Note</button>
                </Link>

                
                  <button className='btn color-danger' onClick={handleDelete} >Delete Note</button>

            </div>
        </div>
      
      <div className="note-page-body">
        {note.body}
      </div>
      {note.tags.map((tag)=>{
        return <span key={tag.id} className='btn'>{tag.label}</span>
      })}
    </>}
    </div>
  )
}
