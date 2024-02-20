import React, {useState, useContext} from 'react';

import './LoginModal.css';
import {ContextObj} from './Context';


export default function LoginModal() {
    const {registerUser, loginUser, userHasLoggedIn} = useContext(ContextObj);
    
    
    const titleObj = {
        login: 'Login', 
        register: 'Register', 
        registrationCompleted: 'registration completed,  please go to login section'
    };
    
    const [title, setTitle] = useState(titleObj.login);
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const isDisabled = title === titleObj.registrationCompleted? true : false;


    const styles = {
        display: userHasLoggedIn? 'none' : 'block',
        position: 'fixed',
        top: '50%',
        right: '50%',
        transform: 'translate(50%, -50%)',
        border: '4px solid #6c757d',
    };
    
    const titleColor = {
        color: title === titleObj.register? 'red' : title === titleObj.registrationCompleted? 'green' : 'black'
    };

    const registerBtnStyles = {
        border: 'none',
        backgroundColor: 'white',
        textDecoration: 'underline',
    };

    const handleGoToRegister = (e)=>{
        e.preventDefault();
        setTitle((prevState)=>{
            return prevState === titleObj.login? titleObj.register : titleObj.login;
        });
    };

    const handleSubmit = (e)=> {
        e.preventDefault();

        if(title === titleObj.login) {
            if (!username) return alert('Please Enter the Username');
            if (!password) return alert('Please Enter the Password');
            loginUser(username, password);
        }
        else if(title === titleObj.register) {
            if (!username) return alert('Please Enter the Username');
            if (!password) return alert('Please Enter the Password');
            registerUser(username, password);
            setTitle(titleObj.registrationCompleted);
        }; 

        setUsername('');
        setPassword('');
    };

    return (
        <>
            <main style={styles}>
                <form className='form contact-form'>
                    <h5 style={titleColor}>{title}</h5>
                    <div className='form-row'>
                        <label htmlFor='username' className='form-label'>username</label>
                        <input type='text' value= {username} className='form-input username-input' 
                            onChange={(e)=> setUsername(e.target.value)}/>
                    </div>
                    <div className='form-row'>
                        <label htmlFor='password' className='form-label'>password</label>
                        <input type='password' value= {password} className='form-input password-input' 
                            onChange={(e)=> setPassword(e.target.value)}/>
                    </div>
                    <div className='text-small form-alert'>there was an error</div>
                    <button type='submit' onClick={handleSubmit} disabled={isDisabled} className='btn-form btn btn-danger btn-block'>
                        {title === titleObj.login? 'login' : 'register'}
                    </button>
                    <button style={registerBtnStyles} onClick={handleGoToRegister}>
                        {title === titleObj.login? 'register' : 'login'}
                    </button>
                </form>
            </main>
        </>
    );
};
