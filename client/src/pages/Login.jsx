import React, { useEffect, useState } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import '../component/css/Login.css';
import login from '../auth/login'
import { useAuth } from '../App';
import { useRef } from 'react';
import Footer from '../component/Footer';

function Login() {
    let mounted = useRef(true);
    const navigate = useNavigate();
    
    const [user, setUser] = useAuth();
    const [form, setForm] = useState({
        email: '',
        password: '',
    });
    const [alert, setAlert] = useState(false);

    useEffect(() => {
        mounted.current = true;
        let savedToken = JSON.parse(localStorage.getItem('keeperUserToken'));
        if (savedToken && mounted.current) {
            setUser(savedToken);
        }
        if (user.name && mounted.current) {
            navigate('/');
        }
        return () => mounted.current = false;
    }, [user, navigate]);

    useEffect(() => {
        if (mounted.current && alert) {
            setTimeout(() => setAlert(!alert), 4000);
        }
    }, [alert]);
    
    function formData(e) {
        setForm(prevVal => {
            return {...prevVal,
                [e.target.name]: e.target.value
            }
        });
    }


    async function submithandler(e) {
        e.preventDefault();
        try {
            const response = await login(form);
            if (response.status === 201 && mounted.current) {
                setUser({ token: response.data.token, name: response.data.name });
                localStorage.setItem('keeperUserToken', JSON.stringify(response.data));
            }
            else {
                setAlert(true);
                document.querySelector('.login-div form input').value = '';
            }
        } catch (error) {
            // console.log(error.message);
            setAlert(true);
            document.querySelector('.login-div form').reset();
        }
        setForm({
            email: '',
            password: '',
        });
    }

    return(
        <section className='login-page'>
            <div className='login-div'>
                <h2 className='login-heading'>Welcome to Notepad!</h2>
                <p className='login-para'>Just enter your existing username to get back in ^ ^</p>
                <form className='login-form' autoComplete='no' aria-autocomplete='no' onSubmit={submithandler}>
                    <label htmlFor="email" style={{ display: "none" }}>Email</label>
                    <input id='email' type="text" name="email" onChange={formData} 
                        placeholder="Enter Email Address" value={form.email} />
                    <input name="DummyPassword" type="password" style={{ display: "none" }}></input>
                    <label htmlFor="password" style={{ display: "none" }}>Password</label>
                    <input id='password' type="password" name="password" onChange={formData} 
                        placeholder="Enter Password" value={form.password}/>
                    <button type="submit">Login</button>
                    <Link className='home-btn' to='/'>Back to Home</Link>
                </form>
            </div>
            {alert && <p style={{ marginBlockStart: '14px' }}>Invalid Credentials, please try again</p>}
            <Footer/>
        </section>
    )
}

export default Login;