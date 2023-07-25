import React, {createContext, useState, useEffect} from 'react';


export const ContextObj = createContext();

export function ContextProvider({children}) {
    const [memesData, setMemesData] = useState([]);
    const [memeInCreateMeme, setMemeInCreateMeme] = useState(null);
    const [completedMemes, setCompletedMemes] = useState([]);
    const memeApi = 'https://memes-manager.onrender.com/api/memesData';


    useEffect(()=> {
        
        (async function() {
            try {
                if (localStorage.getItem('memesData')) {
                    const localData = JSON.parse(localStorage.getItem('memesData'));
                    setMemesData(localData);
                } 
                else {
                    const response = await fetch(memeApi);
                    const data = await response.json();
                    const memes = data.data.map((item)=> {
                        return {
                            id: item.id,
                            origin: 'api',
                            url: item.url,
                            liked: false,
                            favorite: false,
                            comments: [],
                        };
                    });
                    setMemesData(memes);
                    localStorage.setItem('memesData', JSON.stringify(memesData));
                };
            }
            catch(error) {
                alert(error);
            };
        }) ();
    }, []);

    useEffect(()=> {
        localStorage.setItem('memesData', JSON.stringify(memesData));
    }, [memesData]);


    useEffect(()=> {
        if (!localStorage.getItem('completedMemes')) return;
        else {
            const localData = JSON.parse(localStorage.getItem('completedMemes'));
            setCompletedMemes(localData);
        };
    }, []);

    useEffect(()=> {
        localStorage.setItem('completedMemes', JSON.stringify(completedMemes));
    }, [completedMemes]);


    function likeMeme(memeIndex) {
        setMemesData((prev)=> prev.map((item, index)=> {
            return memeIndex === index ? {...item, liked: !item.liked} 
                : item;
        }));
    };

    function favoriteMeme(memeIndex) {
        setMemesData((prev)=> prev.map((item, index)=> {
            return memeIndex === index ? {...item, favorite: !item.favorite}
                : item;
        }));
    };

    function commentMeme(comment, memeIndex, setText) {
        setMemesData((prev)=> prev.map((item, index)=> {
            return memeIndex === index ? {...item, comments: [...item.comments, comment]}
                : item;
            setText('');
        }));
    };

    function removeMeme(memeIndex, conditionPrompt) {   
        switch(conditionPrompt) {
            case 'likedMeme':
                setMemesData((prevState)=> {
                    const newState = [...prevState];
                    newState[memeIndex].liked = false;
                    return newState;
                 });
                break;
            case 'favoriteMeme':
                setMemesData((prevState)=> {
                   const newState = [...prevState];
                   newState[memeIndex].favorite = false;
                   return newState;
                });
                break;
            case 'uploadedMeme':
                setMemesData((prevState)=> {
                    const newState = [...prevState];
                    newState.splice(memeIndex, 1);
                    return newState;
                });
                break;
            case 'commentedMeme':
                setMemesData((prevState)=> {
                   const newState = [...prevState];
                   newState[memeIndex].comments = [];
                   return newState;
                });
                break;
            case 'createdMeme':
                setCompletedMemes((prevState)=> {
                    const newState = [...prevState];
                    newState.splice(memeIndex, 1);
                    return newState;
                });
        };
    };

    
    return (
        <ContextObj.Provider value={{memesData, memeInCreateMeme, completedMemes, 
            setMemesData, setCompletedMemes, setMemeInCreateMeme, likeMeme, commentMeme, favoriteMeme, removeMeme}}>
            {children}
        </ContextObj.Provider>
    );
};