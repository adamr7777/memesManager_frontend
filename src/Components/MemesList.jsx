import React from 'react';



export default function MemesList({customHook}) {
    return (
        <div className='col-9'>
            <div>
                {customHook()}
            </div>
        </div>
    );
};



