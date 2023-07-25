import React from 'react';

import Sidebar from '../Components/Sidebar';
import MemesList from '../Components/MemesList';
import useLibrary from '../customHooks/useLibrary';

export default function Library() {
    return (
        <div className='container-fluid'>
            <div className="row">
                <Sidebar/>
                <MemesList customHook={()=> useLibrary('uploadedMeme')}/>
            </div>      
        </div>
    );
};