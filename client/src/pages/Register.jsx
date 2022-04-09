import { useContext, useLayoutEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../component/css/Login.css'
import {register} from '../auth/register'
import { useAuth } from '../App';
import Footer from '../component/Footer';
import { LoadContext } from '../App';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

export default function Register() {
    const auth = useAuth();
    const [isLoading, setLoading] = useContext(LoadContext);

    let mounted = useRef(true);
    const [form, setForm] = useState({
        name: '', email: '', password: '',
    });

    const navigate = useNavigate();
  
    useLayoutEffect(() => {
        mounted.current = true;
        let savedToken = JSON.parse(localStorage.getItem('keeperUserToken'));
        if (savedToken && mounted.current) {
            auth.setUser(savedToken);
        }
        if (auth.user && mounted.current) {
            navigate('/');
        }
        return () => mounted.current = false;
    }, [auth, navigate]);

    function formData(e) {
        setForm(prevVal => {
            return {...prevVal,
                [e.target.name]: e.target.value
            }
        });
    }

    async function submithandler(e) {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await register(form);
            if (response.status === 201 && mounted.current) {
                setLoading(false);
                navigate('/login');
            }       
        } catch (error) {
            setLoading(false);
            setForm({
                name: '',
                email: '',
                password: ''
            });
        }
    }

    return (
        <section className='login-page'>
            <div className='login-div'>
                <h2 className='login-heading'>Welcome to Notepad!</h2>
                <p className='login-para'>Please enter the following info to register （づ￣3￣）づ╭❤️～</p>
                {isLoading
                    ? <Box sx={{ textAlign: 'center', paddingTop: '15px' }}>
                            <CircularProgress style={{color: 'darkgoldenrod'}}/>
                    </Box>
                    : <form className='login-form' autoComplete='off' onSubmit={submithandler}>
                        <input type="text" name="name" onChange={formData} 
                        placeholder="Enter your name" value={form.name}/>
                        <input type="email" name="email" onChange={formData} 
                            placeholder="Enter Email Address" value={form.email} />
                        <input name="DummyPassword" type="password" style={{ display: "none" }}></input>
                        <input type="password" name="password" onChange={formData} 
                        placeholder="Enter Password" value={form.password}/>
                        <button type="submit">Register</button>
                        <Link className='home-btn' to='/'>Back to Home</Link>
                    </form>
                }
            </div>
            <Footer/>
        </section>
    )
}