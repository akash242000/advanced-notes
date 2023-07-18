import { createContext, useContext, useState } from "react"
import useLocalStorage  from '../hooks/useLocalStorage'

const NotesContext = createContext({});



export function useNotes(){
    return useContext(NotesContext);
}

export function NotesContexProvider({children}){
    const [notes, setNotes] = useLocalStorage('notes',[]);
    const [allTags, setAllTags] =useLocalStorage('allTags',[]);

    
    function editnote(note){
        setNotes(prevNotes=>{
           return prevNotes.map((currentNote)=>{
                if(currentNote.id===note.id){
                    return{ ...currentNote, title: note.title, body: note.body, tags: note.tags}
                }
                else{
                    return currentNote
                }

            });
        
        })
    }

    function addnote(note){
        setNotes((prevNotes)=>{
                return [...prevNotes, note]
            });
        
    }

    function deletenote(id){
        setNotes((prevNotes)=>{
            return prevNotes.filter((currentNote)=>currentNote.id!==id)
        })
    }

    function addTags(tags){
            let arr=[] 
             tags.forEach(({label,id})=>{
                if(!allTags.map(({id})=>id).includes(id)){
                       arr.push({label,id})
                }
            });

            setAllTags((prevTags)=> [...prevTags, ...arr])
    }

    function deleteTag(tag){
        setAllTags((prevTags)=>{
           return prevTags.filter((currentTag)=>currentTag.id!==tag.id)
        });

        // setNotes((prevNotes)=>{
        //     prevNotes.filter((note)=>{
        //        ret note.id
        //     })
        // })
    }

return(
    <NotesContext.Provider value={{notes,allTags, deleteTag, addnote,editnote,deletenote,addTags}}>
        {children}
    </NotesContext.Provider>
)
}