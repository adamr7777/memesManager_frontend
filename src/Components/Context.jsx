import React, {createContext, useState, useEffect} from 'react';


export const ContextObj = createContext();

export function ContextProvider({children}) {
    const [memesData, setMemesData] = useState([]);
    const [memeInCreateMeme, setMemeInCreateMeme] = useState(null);
    const [completedMemes, setCompletedMemes] = useState([]);
    const [userHasLoggedIn, setUserHasLoggedIn] = useState(false);
    const [attemptToLoggIn, setAttemptToLoggIn] = useState(false);
    const [user, setUser] = useState(null);
    const deployApi = 'https://memes-manager.onrender.com';
    const devApi = 'http://localhost:5000';

    const url = deployApi;
    


    useEffect(()=> {
        fetchData();
    }, [attemptToLoggIn]);

    useEffect(()=> {
        if(!memesData[0]) return;
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
            if(!localStorage.getItem('user')) return;
            if (localStorage.getItem('memesData')) {
                const localData = JSON.parse(localStorage.getItem('memesData'));
                setMemesData(localData);
                //////remove/////
                if(localStorage.getItem('user')) setUserHasLoggedIn(true);
                const user = JSON.parse(localStorage.getItem('user'));
                setUser(user);
                //////remove/////
            } 
            else {
                const {token} = JSON.parse(localStorage.getItem('user'));
                if(!token) return;

                const endPoint = '/api/memesData';

                const pref = {
                    method: 'GET',
                    headers: {
                      'Authorization': token,
                      'Custom-Header': 'custom-value'
                    }
                };

                const response = await fetch(url + endPoint, pref);     //1.API///////////////////////////////////
                const data = await response.json();
                if (data.user) {                //used to be if(data)
                    setUserHasLoggedIn(true);    
                    setUser(data.user);
                }; 

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

    async function registerUser(username, password) {       
        const endpoint = '/authorise/register';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth": {username, password}
              })
        };

        const res = await fetch(url + endpoint, options);      //2.API///////////////////////////////////
        const data = await res.json();
    };

    async function loginUser(username, password) {           
        const endpoint = '/authorise/login';
        const options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "auth": {username, password}
              })
        };

        const res = await fetch(url + endpoint, options)           //3.API///////////////////////////////////
        const data = await res.json();
        console.log(data.username);
        const {token} = data;
        localStorage.setItem('user', JSON.stringify({username: data.username, token}));

        setAttemptToLoggIn(true);
        
        //////////change//////////////////////
        
        // localStorage.removeItem('memesData');
        // localStorage.removeItem('completedMemes');
    };

    
    return (
        <ContextObj.Provider value={{memesData, memeInCreateMeme, completedMemes, 
            setMemesData, setCompletedMemes, setMemeInCreateMeme, likeMeme, commentMeme, favoriteMeme, removeMeme, 
            registerUser, loginUser, userHasLoggedIn, setUserHasLoggedIn, user}}>
            {children}
        </ContextObj.Provider>
    );
};