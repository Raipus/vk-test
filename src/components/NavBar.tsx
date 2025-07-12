import React from 'react';
import { Link } from "react-router-dom";
import "./NavBar.css"

const NavBar: React.FC = () => {
    return (
        <div className="nav-bar">
            <Link to={`/movies`} className='nav-bar__items'>
                Главная
            </Link>
            <Link to={`/favorites`} className='nav-bar__items'>
                Избранное
            </Link>
        </div>
    );
};

export default NavBar;