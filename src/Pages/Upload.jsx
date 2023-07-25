import React, {useState, useContext} from 'react';

import {ContextObj} from '../Components/Context';

export default function Upload() {
    const [picture, setPicture] = useState(null);
    const instructions = 'Upload your own meme and save it to Memes Pool.';
    const itIsSavedMessage = 'Your meme has been saved to Memes Pool!';
    const [uploadInstructions, setUploadInstructions] = useState(instructions);
    const {setMemesData} = useContext(ContextObj);
    const red = {
        color: 'red',
    }
    const instructionsStyle = uploadInstructions === itIsSavedMessage ? red : null;

    function changeHandler(e) {
        const reader = new FileReader();
        reader.readAsDataURL(e.target.files[0]);
        reader.onload = ()=> {
            setPicture(reader.result);
        };
    }

    function saveMeme() {
        if (!picture) return;
        setMemesData((prevState)=> [{
            origin: 'uploaded',
            url: picture,
            liked: false,
            favorite: false,
            comments: [],
        }, ...prevState, ]);
        setUploadInstructions(itIsSavedMessage);
        setPicture(null);
        setTimeout(()=> {
            setUploadInstructions(instructions)
        },2000);
    };


    return (
        <div className='card'>
        {picture && <img src={picture} className='card-img-top' alt='uploaded image'/>}
        <div className='card-body'>
            <h5 className='card-title'>Upload it!</h5>
            <p className='card-text mb-0' style={instructionsStyle}>{uploadInstructions}</p>
            <input className='my-3' accept='image/*' onChange={changeHandler} type='file'/>
            <div className='d-flex justify-content-around' >
                <button onClick={saveMeme}className='btn btn-primary mr-2'>Save to the Pool</button>
                <button className='btn btn-danger' onClick={()=> setPicture(null)}>Remove</button>  
            </div>
        </div>
    </div>
    );
};