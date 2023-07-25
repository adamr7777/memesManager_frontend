import React from 'react'; 



export default function Comment(props) {
    const {handleClose} = props;
    
    return (
      <div className='container mb-2'>
        <div className='card'>
          <div className='card-body'>
            <h5 className='card-title'>{props.title}</h5>
            <div className='card-text'>{props.comment}</div>
            <button type='button' className='btn-close' onClick={()=> handleClose(props.index)} aria-label='Close'></button>
          </div>
        </div>
      </div>
    );
  };
  

  