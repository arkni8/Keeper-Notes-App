import React, { useCallback, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../App";
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';
import './css/Header.css';

function Header(props) {
  const [user, setUser] = useAuth();

  useEffect(() => {
    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  });

  const resizeListener = useCallback(
    () => {
      var newWidth = window.innerWidth;
      const element = document.querySelector(".right .logout-btn");
      if (newWidth > 600) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  
  window.addEventListener('resize', resizeListener);

  function dropdown() {
    const element = document.querySelector(".right .logout-btn");
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  return (
    <header className="heading">
      <div className="left">
        <Link to="/"><h1>Keeper</h1></Link>
      </div>
      <div className="right">
        <p>{user.name} <ArrowDropDownCircleIcon className="dropdown" onClick={dropdown}/></p>
        <button className="logout-btn" onClick={() => {
          localStorage.removeItem('keeperUserToken');
          setUser({});
        }}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
