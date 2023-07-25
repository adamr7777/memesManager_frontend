import React, {useContext} from 'react';

import {ContextObj} from '../Components/Context';
import MemeCard from '../Components/MemeCard';


export default function useCreatedMemes() {
    const {completedMemes} = useContext(ContextObj);
    const conditionPrompt = 'createdMeme';
    if (completedMemes.length < 1) return;
    return completedMemes.map((item, index)=> 
        <MemeCard key={index} conditionPrompt={conditionPrompt} index={index} url={item.url}/>
    );
};