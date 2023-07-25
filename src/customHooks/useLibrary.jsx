import React, {useContext} from 'react';

import {ContextObj} from '../Components/Context';
import MemeCard from '../Components/MemeCard';

export default function useLikedMemes(conditionPrompt) {
    
    const {memesData} = useContext(ContextObj);

    return memesData.map((item, index)=> {
        const condition = conditionPrompt === 'likedMeme' ? item.liked : 
            conditionPrompt === 'uploadedMeme' ? item.origin === 'uploaded' :
                conditionPrompt === 'favoriteMeme' ? item.favorite :
                conditionPrompt === 'commentedMeme' ? item.comments.length > 0 
                    : null;
        if (condition) return <MemeCard conditionPrompt={conditionPrompt} index={index} meme={item} key={index} url={item.url}/>;
        else return null;
    }).filter((item)=> item);
};

