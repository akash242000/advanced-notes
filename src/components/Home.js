import React, { useState } from 'react'
import Note from './Note'
import { useNotes } from '../contexts/notesContext';
import {Link} from 'react-router-dom';
import Select from 'react-select'
import Tag from './Tag';

export default function Home() {

  const {notes,allTags} = useNotes();
  const [noteTags, setNoteTags] =useState(allTags);

  const [selectedTags, setSelectedTags] =useState([]);
  const [title, setTitle] = useState("");
  const [popup, setShowPopup] =useState(false);


  const filterNotes= notes.filter((note)=>{
    return (
      (title==='' || note.title.toLowerCase().includes(title.toLowerCase()) ) &&
           (selectedTags.length===0|| 
            selectedTags.some((tag)=>
                  note.tags.some(noteTag=>noteTag.id===tag.id)
            ))
   )
  });




  function showPopup(){
    setShowPopup(true)
  }



  return (
    <div className='home-wrapper'>
      <div className="header-nav">
        <h1>Notes</h1>
        <div className="button-wrapper">
          <Link to='/newnote'>
            <button className='btn' >Create</button>
          </Link>
            
            {/* <button className='btn' onClick={showPopup}>Edit Tags</button> */}
        </div>
      </div>

    {/* {popup &&
      <div className="popup-background">
          <div className="tags-popup">
            <div className="popup-header">
              <h3>All Tags</h3>
              <button className='btn' onClick={()=>setShowPopup(false)}>✖</button>
            </div>
            
            {noteTags.map(tag=><Tag tag={tag.label} />)}
          </div>
      </div>    
    } */}

      <div className="content-box">
        <div className="search-sec">

            <div className="search-sec-int">
                <label htmlFor="">Search</label>
                <input className='input-box' type="text" name='title' value={title} onChange={(e)=>setTitle(e.target.value)} />

            </div>

            <div className="search-sec-int">
                <label htmlFor="">Search Tags</label>
                <Select 
                 options={noteTags.map((tags)=>{
                  return {label:tags.label, value: tags.id}
                 })}

                 onChange={tags=>{
                  setSelectedTags(tags.map((tag)=>{
                    return {label:tag.label, id: tag.value}
                  }))
                 }}

                 value={selectedTags.map((tag)=>{
                  return {label:tag.label, value: tag.id}
                 })}
                 isMulti
                 className='select-box basic-multi-select' 
                 >
                 </Select>
            </div>

        </div>
        {notes.length==0?
              <div className='placeholder'>
                  Create New Notes
              </div>
        :
           <div className='notes-grid'>
             {title.length>0 || selectedTags.length>0?
              <>
                {filterNotes.map((note)=>{
                  return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} />
                })}
              </>
              :
              <>
              {notes && notes.map((note)=>{
                return <Note key={note.id} title={note.title} body={note.body} tags={note.tags} id={note.id} />
              })}
              </>
             }  
          
   
            </div>
          }
        
      
       
       {/* <div className="notes-grid">

       </div> */}

      </div>
    </div>
  )
}
