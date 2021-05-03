import React from 'react';
import publicURL from 'utils/publicURL';
import css from 'style/Navbar.module.css';
import {Link} from 'react-router-dom';

export default Navbar;

function Navbar(props) {
    // render navbar
    return (
        <nav className={css.navbar}>
            <Link to='/'>
                <img src={publicURL("/assets/home.svg")} alt="Home"/>
            </Link>
            <Link to='/explore'>
                <img src={publicURL("/assets/explore.svg")} alt="Explore"/>
            </Link>
            <Link to='/new-post'>
                <img src={publicURL("/assets/newpost.svg")} alt="New Post"/>
            </Link>
            <Link to='/activity'>
                <img src={publicURL("/assets/activity.svg")} alt="Activity"/>
            </Link>
            <Link to='/profile'>
                <img src={publicURL("/assets/profile.svg")} alt="Profile"/>
            </Link>
        </nav>
    );
}