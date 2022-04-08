import React, { useState, useContext, createContext } from "react";
import { Routes, Route,Navigate } from "react-router-dom"
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
import Notepad from './pages/Notepad';

const authContext = createContext([{}, () => {}]);

export function useAuth() {
    return useContext(authContext);
}

export function useProvideAuth() {
    const [user, setUser] = useState({});
  
    return [
        user, setUser
    ];
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function CheckAuth({ children }) {
  const [user] = useAuth();
  return (!user.name ? ( <Navigate to='/login'/> )
  : children
   );
}

function App() {

  return (
    <>
      <ProvideAuth>
      <Routes>
        <Route path='/' exact="exact" element={<Home/>}/>
        <Route path='/login' exact="exact" element={
          <Login />}
        />
        <Route path='/register' element={<Register />} />
        <Route path='/dash' element={
            <CheckAuth>
              <Notepad />
            </CheckAuth>}
        />
        </Routes>
        </ProvideAuth>
    </>
  );
}

export default App;
