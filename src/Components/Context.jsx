import React, {createContext, useState, useEffect} from 'react';


export const ContextObj = createContext();

export function ContextProvider({children}) {
    const [memesData, setMemesData] = useState([]);
    const [memeInCreateMeme, setMemeInCreateMeme] = useState(null);
    const [completedMemes, setCompletedMemes] = useState([]);
    const [userHasLoggedIn, setUserHasLoggedIn] = useState(false);
    const [attemptToLoggIn, setAttemptToLoggIn] = useState(false);
    const memeApi = 'https://memes-manager.onrender.com/api/memesData';
    const devUrl = 'http://localhost:5000/api/memesData';
    // const loginModal = useState(false);
    


    useEffect(()=> {
        fetchData();
    }, [attemptToLoggIn]);

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

    async function fetchData() {
        try {
            if (localStorage.getItem('memesData')) {
                const localData = JSON.parse(localStorage.getItem('memesData'));
                setMemesData(localData);
                //////remove/////
                if(localStorage.getItem('token')) setUserHasLoggedIn(true);
                //////remove/////
            } 
            else {
                const token = JSON.parse(localStorage.getItem('token'));
                if(!token) return;

                const pref = {
                    method: 'GET',
                    headers: {
                      'Authorization': token,
                      'Custom-Header': 'custom-value'
                    }
                };

                const response = await fetch(devUrl, pref);
                const data = await response.json();

                if (data) setUserHasLoggedIn(true);

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
    };


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

    async function registerUser(username, password) {       //API///////////////////////////////////
        // console.log(`${username} is registered`);
        const registerUrl = 'http://localhost:5000/authorise/register';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth": {username, password}
              })
        };

        const res = await fetch(registerUrl, options)
        const data = await res.json();
        console.log(data);
    };

    async function loginUser(username, password) {            //API///////////////////////////////////
        console.log(`${username} is logged in`);
        const registerUrl = 'http://localhost:5000/authorise/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth": {username, password}
              })
        };

        const res = await fetch(registerUrl, options)
        const data = await res.json();
        
        const {token} = data;
        localStorage.setItem('token', JSON.stringify(token));

        setAttemptToLoggIn(true);
        
        //////////change//////////////////////
        
        localStorage.removeItem('memesData');
        localStorage.removeItem('completedMemes');
        
        

        // const response = await fetch('http://localhost:5000/api/memesData', pref);
        // const dataMemes = await response.json();
        // const memes = dataMemes.data.map((item)=> {
        //     return {
        //         id: item.id,
        //         origin: 'api',
        //         url: item.url,
        //         liked: false,
        //         favorite: false,
        //         comments: [],
        //     };
        // });
        // setMemesData(memes);
        // localStorage.setItem('memesData', JSON.stringify(memesData));


        //////////change//////////////////////
        // if(dataMemes) return true;
    };

    
    return (
        <ContextObj.Provider value={{memesData, memeInCreateMeme, completedMemes, 
            setMemesData, setCompletedMemes, setMemeInCreateMeme, likeMeme, commentMeme, favoriteMeme, removeMeme, 
            registerUser, loginUser, userHasLoggedIn}}>
            {children}
        </ContextObj.Provider>
    );
};