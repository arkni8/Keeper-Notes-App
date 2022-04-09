import React, { useState, useContext, createContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from './pages/Login';
import Register from "./pages/Register";
import Notepad from './pages/Notepad';

const authContext = createContext([{}, () => { }]);
export const LoadContext = createContext([null, () => { }]);

export function useAuth() {
    return useContext(authContext);
}

// export function isLoading() {
//   return useContext(LoadContext);
// }

export function useProvideAuth() {
    const [user, setUser] = useState({});
  
    return [
        user, setUser
    ];
}

function useIsLoading() {
  const [isLoading, setLoading] = useState(false);

  return [isLoading, setLoading];
}

function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return (
    <authContext.Provider value={auth}>
      {children}
    </authContext.Provider>
  );
}

function Loader({ children }) {
  const load = useIsLoading();
  return (
    <LoadContext.Provider value={load}>
      {children}
    </LoadContext.Provider>
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
      <Loader>  
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
      </Loader>
      </ProvideAuth>
    </>
  );
}

export default App;
