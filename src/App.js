import logo from './logo.svg';
import './App.css';
import {Route, Routes, useParams } from 'react-router-dom';
import Home from './components/Home'
import NewNote from './components/NewNote';
import Note from './components/Note'
import { NotesContexProvider } from './contexts/notesContext';
import NotePage from './components/NotePage';
import EditNote from './components/EditNote';


function App() {
  
  return (
    <NotesContexProvider>
      <div className="container">
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/newnote' element={<NewNote/>}/>
          <Route path=':id'>
            <Route index element={<NotePage/>} />
            <Route path='edit' element={<EditNote/>} />
          </Route>
        </Routes>
      </div>
    </NotesContexProvider>
  );
}

export default App;
