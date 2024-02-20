import React, {createContext, useState, useEffect} from 'react';


export const ContextObj = createContext();

export function ContextProvider({children}) {
    const [memesData, setMemesData] = useState([]); //data 1
    const [memeInCreateMeme, setMemeInCreateMeme] = useState(null);
    const [completedMemes, setCompletedMemes] = useState([]); //data 2
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
        if(!memesData[0]) return
        const mainMemes = 'mainMemes';
        updateMemesDataDb(mainMemes);
    }, [memesData]);



    useEffect(()=> {
        if(!completedMemes[0]) return
        const secMemes = 'secMemes';
        updateMemesDataDb(secMemes );
    }, [completedMemes]);

    useEffect(()=> {
            getMemesDataDb();
    }, []);

    

    async function fetchData() {
        try {
            if(!localStorage.getItem('userData')) return;
            const dataExists = await getMemesDataDb();
            if(dataExists) {
                if(localStorage.getItem('userData')) {
                    const userData = JSON.parse(localStorage.getItem('userData'))
                    setUserHasLoggedIn(true);
                    setUser({username: userData.personName});
                };
            }
            else {
                const userData = JSON.parse(localStorage.getItem('userData'));
                if(!userData) return;
                
                const {token} = userData;
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
    
                if (data.user) {                
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
            };
        }
        catch(error) {
            alert(error);
        };
    };

    async function getMemesDataDb() {
        if(!JSON.parse(localStorage.getItem('userData'))) return;
        const endPoint = '/api/userData/mainUserData/';
        const {personName} = JSON.parse(localStorage.getItem('userData'));
    
        try {
            const res = await fetch(url + endPoint + personName);
            const memesData = await res.json();
            if(memesData.data.userMemes[0]) { 
                setMemesData(memesData.data.userMemes);
                completedMemes, setCompletedMemes
                if(memesData.data.secMemes[0]) setCompletedMemes(memesData.data.secMemes);
                return true;
            }
            else return false
        } catch(err) {
            console.error(err);
        }
    };

    async function updateMemesDataDb(prompt) {    //2.API///////////////////////////////////

        if(!JSON.parse(localStorage.getItem('userData'))) return;
        const endPoint = '/api/userData/mainUserData';
        const {personName, encryptedPwd} = JSON.parse(localStorage.getItem('userData'));
        const mainMemes = 'mainMemes';
        const secMemes = 'secMemes';

        const content = prompt === mainMemes ? {
            username: personName, 
            encryptedPwd,  
            userMemes: memesData,
        } : {
            username: personName, 
            encryptedPwd,  
            secMemes: completedMemes
        }

        const pref = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userData: content
              })
        };

        await fetch(url + endPoint, pref);
    };

    async function resetUserDataDb() {
        const {personName, encryptedPwd} = JSON.parse(localStorage.getItem('userData'));

        const endPoint = '/api/userData/mainUserData';

        const content = {
        username: personName, 
        encryptedPwd,  
        userMemes: [],
        secMemes: []
        }; 

        const pref = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userData: content
              })
        };

        await fetch(url + endPoint, pref);

    }    

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

        const res = await fetch(url + endpoint, options);      //3.API///////////////////////////////////
        const data = await res.json();
        if (data.msg) return alert(data.msg);
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

        const res = await fetch(url + endpoint, options)           //4.API///////////////////////////////////
        const data = await res.json();
        
        if (data.msg) return alert(data.msg);
        const {personName, encryptedPwd, token} = data;
        localStorage.setItem('userData', JSON.stringify({personName, encryptedPwd, token}));

        setAttemptToLoggIn(true);
    };

    const deleteAccount = async ()=> {
        if(!localStorage.getItem('userData')) return;
        const endPoint = '/api/deleteUser/';
        const {personName} = JSON.parse(localStorage.getItem('userData'));
        const pref = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        };

        try {
            const res = await fetch(url + endPoint + personName, pref);
            const data = await res.json();

            const {msg} = data;
            return {msg, personName};

        } catch(err) {
            conso.error(err);
        };

    };

    


    return (
        <ContextObj.Provider value={{memesData, memeInCreateMeme, completedMemes, 
            setMemesData, setCompletedMemes, setMemeInCreateMeme, likeMeme, commentMeme, favoriteMeme, removeMeme, 
            registerUser, loginUser, userHasLoggedIn, setUserHasLoggedIn, user, resetUserDataDb, deleteAccount}}>
            {children}
        </ContextObj.Provider>
    );
};