import React from 'react'
import {Link} from 'react-router-dom'

export default function Note({title, tags, body, id}) {
  return (
    <div className='note-container' >
      <Link to={`/${id}`}>
        <div className="note-content">
          <h2 className="note-title">
              {title}
          </h2>

          <div className="note-body">
              {body.length>=300 ? body.slice(0,300)+"..." :body}
          </div>

          <div className="note-tags">
              {tags.map((tag)=>{
                {return  <span key={tag.id} className="btn">{tag.label}</span> }
              })}
          </div>
        </div>
      </Link>
    </div>
  )
}
