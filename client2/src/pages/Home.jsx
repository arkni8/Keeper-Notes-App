import React from 'react';
import { Link } from 'react-router-dom';
import '../component/css/Home.css'
import { useAuth } from '../App';
import Footer from '../component/Footer';
import Header from '../component/Header';

function Home() {
    const [user] = useAuth();

    return (
        <>
            <main className='home-body'>
                {user.name && <Header/>}
                <section className='container'>
                    <h1>Notepad App</h1>
                    <h3 style={{lineHeight: '1.5'}}>This app was made for people who forget stuff 
                    and want a quick write up before they forget about it.</h3>
                    <p style={{lineHeight: '1.5'}}>Note - The notes are not encrypted yet, so 
                    refarin from saving private information. :)</p>
                    <p style={{ marginTop: '15px' }}>Click below to get started!</p>
                    {user.name
                        ? <>
                            <Link className='auth-btn' to='/dash'>Got to Notepad</Link>
                        </>
                        : <><Link className='auth-btn' to='/login'>Login</Link>
                            <Link className='auth-btn' to='/register'>Register</Link>
                        </>}
                </section>
                <Footer/>
            </main>
        </>
        
    )
}

export default Home;