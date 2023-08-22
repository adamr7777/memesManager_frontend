import React, {useState} from 'react';

import './LoginModal.css';



export default function LoginModal() {
    const titleObj = {
        login: 'Login', 
        register: 'Register', 
        registrationCompleted: 'registration completed,  please go to login section'
    };

    const [title, setTitle] = useState(titleObj.login);


    const styles = {
        position: 'fixed',
        top: '30%',
        right: '40%',
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


    return (
        <>
            <main style={styles}>
                <form className='form contact-form'>
                    <h5 style={titleColor }>{title}</h5>
                    <div className='form-row'>
                        <label htmlFor='username' className='form-label'>username</label>
                        <input type='text' className='form-input username-input' />
                    </div>
                    <div className='form-row'>
                        <label htmlFor='password' className='form-label'>password</label>
                        <input type='password' className='form-input password-input' />
                    </div>
                    <div className='text-small form-alert'>there was an error</div>
                    <button type='submit' className='btn-form btn btn-danger btn-block'>submit</button>
                    <button style={registerBtnStyles} onClick={handleGoToRegister}>
                        {title === titleObj.login? 'register' : 'login'}
                    </button>
                </form>
            </main>
        </>
    );
};