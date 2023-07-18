import React, { useRef,useState } from 'react';
import CreatableSelect from 'react-select/creatable';
import {Link, useNavigate} from 'react-router-dom'
import { useNotes } from '../contexts/notesContext';


export default function Form({NoteId, editTitle, editBody, editTags, editing}) {

    const [selectedTags, setSelectedTags] = useState(editTags?editTags:[]);
    const [content, setContent]= useState({stateTitle:editTitle, stateBody:editBody})

    const {addnote,editnote,addTags }= useNotes();
    const navigate = useNavigate();

    const titleRef= useRef();
    const bodyRef= useRef();
    

    function handleSave(){
      const note={
        id:NoteId,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        tags:selectedTags
      }
      addnote(note);
      addTags(selectedTags);
      navigate('/');
    }

    function handleEdit(){
      const note={
        id:NoteId,
        title: titleRef.current.value,
        body: bodyRef.current.value,
        tags:selectedTags
      }
      editnote(note);
      addTags(selectedTags);
      navigate('/');
    }

    function handleChange(event){
      
       setContent({
        ...content, 
        [event.target.name] : event.target.value
       })
    }

  return (
    <div className='form-wrapper'>

      <div className="title-input-section">
        <div className="search-sec-int">
                    <label htmlFor="">Title</label>
                    <input ref={titleRef} value={content.stateTitle} onChange={handleChange} className='input-box' name='stateTitle' type="text" />
        </div>

        <div className="search-sec-int">
                <label htmlFor="">Tags</label>
                <CreatableSelect 
                  value={selectedTags.map(tag=>{
                    return {label: tag.label, value: tag.id}
                  })}

                  onChange={tags=>{
                    setSelectedTags(tags.map((tag)=>{
                      return {label:tag.label, id: tag.value}
                    }))
                  }}

                  isMulti className='select-box' name="" id=""/>
        </div>

    </div>

      <div className="input-body">
        <textarea ref={bodyRef} value={content.stateBody} onChange={handleChange} name="stateBody" id="" rows="20"></textarea>
      </div>

      <div className="footer">
        <div className="button-wrapper">
            {!editing?
              <button className='btn' onClick={handleSave} >Save</button>
            :
            <button className='btn' onClick={handleEdit} >Edit</button>
            }
            <Link to="..">
                <button className='btn'>Cancel</button>
            </Link>
        </div>
      </div>
    </div>
  )
}
