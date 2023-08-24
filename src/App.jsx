import React from 'react';
import {Route, Routes} from 'react-router-dom';


import Header from './Components/Header';
import Pool from './Pages/Pool';
import Upload from './Pages/Upload';
import Library from './Pages/Library';
import FavoriteMemes from './Pages/FavoriteMemes';
import UploadedMemes from './Pages/UploadedMemes';
import CreateMeme from './Pages/CreateMeme';
import CreatedMemes from './Pages/CreatedMemes';
import CommentedMemes from './Pages/CommentedMemes';





function App() {
    return (
        <>
            <Header/>
            <Routes>
                <Route exact path='/' element={<Pool/>}/>
                <Route path='/upload' element={<Upload/>}/>
                <Route exact path='/library' element={<Library/>}/>
                    <Route exact path='/favoriteMemes' element={<FavoriteMemes/>}/>
                    <Route exact path='/uploadedMemes' element={<UploadedMemes/>}/>
                    <Route exact path='/createdMemes' element={<CreatedMemes/>}/>
                    <Route exact path='/commentedMemes' element={<CommentedMemes/>}/>
                <Route exact path='/createMeme' element={<CreateMeme/>}/>
            </Routes>
        </>
    );
};

export default App;