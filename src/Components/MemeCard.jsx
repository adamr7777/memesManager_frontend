import React, {useContext, useState, useEffect} from 'react';

import {ContextObj} from './Context';
import Comment from './Comment';



export default function MemeCard(props) {
    const {memesData, setMemesData, memeInCreateMeme, CompletedMemes, removeMeme, setMemeInCreateMeme} = useContext(ContextObj);

    
    const commentsQuantity = memesData[props.index].comments.length > 0 ? 
        '(' + memesData[props.index].comments.length + ')'
            : null;
    
    const firstComment = memesData[props.index].comments[0];
    const noCommentsMsg = 'This meme has no comments yet'
    const instructionText = 'Click on Use Template to add captions';
    const memeInCreateText = 'The meme has been sent to Create Your Meme. Go there to edit it.';
    
    const [commentsSection, setCommentsSection] = useState(firstComment ? `${firstComment} ......` : noCommentsMsg);

    const instructions = memeInCreateMeme ? (memeInCreateMeme.id === memesData[props.index].id ? memeInCreateText 
        : instructionText) : instructionText ;
     
    const instructionsColor = memeInCreateMeme ? (memeInCreateMeme.url === memesData[props.index].url ? 'red' 
        : 'green' ) : 'green';
        
    const [disabledBtn, setDisabledBtn] = useState(false);
    const [readCommDisabled, setReadCommDisabled] = useState(false);
    
    const cardStyle = {
        margin: '30px 0',
        maxWidth: '450px'
    };

    const btnStyles = {
        marginBottom: '5px' 
    };

    
    function readComments() {

        function handleClose(commentIndex) {
            
            setMemesData((prevState)=> {
                const newState = [...prevState];
                const commentsArray = newState[props.index].comments;
                commentsArray.splice(commentIndex, 1);
                newState[props.index].comments = commentsArray
                return newState;
            });
            const comments = memesData[props.index].comments.map((item, index)=> (
                <Comment className='mb-1' title={`Comment ${index+1}`} index={index} 
                    handleClose={handleClose} comment={item} key={index}/>
            ));
            setCommentsSection(comments.length > 0 ? comments : noCommentsMsg);
        };

        if (typeof commentsSection !== 'object') {
            const comments = memesData[props.index].comments.map((item, index)=> (
                <Comment className='mb-1' title={`Comment ${index+1}`} index={index} 
                    handleClose={handleClose} comment={item} key={index}/>
            ));
            setCommentsSection(comments);
            if (!comments) {
                const comments = CompletedMemes[props.index].comments.map((item, index)=> (
                    <Comment className='mb-1' title={`Comment ${index+1}`} index={index} 
                        handleClose={handleClose} comment={item} key={index}/>
                ));
            };
        }
        else setCommentsSection(`${firstComment} ......`);
    };

    function sendMemeToCreate(memeIndex) {
        const meme = memesData[memeIndex];
        setMemeInCreateMeme(meme);
    };


    useEffect(()=> {
        const btnDisabled = memeInCreateMeme ? (memeInCreateMeme.url === memesData[props.index].url ? 
            true : false ) : false;
        setDisabledBtn(btnDisabled);
    }, [memeInCreateMeme]);

    useEffect(()=> {
        if (commentsSection === noCommentsMsg) setReadCommDisabled(true);
        else setReadCommDisabled(false);
    }, [commentsSection]);
    
    return (
            <div className='card' style={cardStyle}>
                <img src={props.url} className='card-img-top' alt='...'/>
                <div className='card-body'>
                    <div className='comments-div p-3 border mb-3'>
                        <h5 className='card-title'>Comments:</h5>
                        <div className='card-text'>{commentsSection}</div>
                    </div>
                    <p className='card-text' style={{color: instructionsColor}}>{instructions}</p>
                    <div className='d-flex flex-column flex-sm-row justify-content-around' >
                        <button style={btnStyles} className='btn btn-primary mr-2' disabled={disabledBtn} 
                            onClick={()=> sendMemeToCreate(props.index)}>Use Template</button>
                        <button style={btnStyles} className='btn btn-secondary mr-2' disabled={readCommDisabled} 
                            onClick={readComments}>Read Comments {commentsQuantity}</button>
                        <button style={btnStyles} className='btn btn-danger'
                            onClick={()=> removeMeme(props.index, props.conditionPrompt)}>Remove</button>  
                    </div>
                </div>
            </div>
    );
};




