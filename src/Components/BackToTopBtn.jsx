import React from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';

import {faArrowUp} from '@fortawesome/free-solid-svg-icons';




export default function BackToTopBtn() {

    const toTopBtnStyles = {
        bottom: '20px',
        right: '20px',
        opacity: '0.5',
        zIndex: '9999',
    };

    function goToTop() {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <button className='btn btn-warning rounded-circle position-fixed' onClick={goToTop} style={toTopBtnStyles}>
            <FontAwesomeIcon icon={faArrowUp}/>
        </button> 
    );
};































