import React from 'react';
import publicURL from 'utils/publicURL'
import css from 'style/Navbar.module.css'

export default Navbar;

function Navbar(props) {
    // nav items and url
    const navList = [
        "Home", "Explore", "NewPost", "Activity", "Profile",
    ];
    const navURL = navList.map(item => `/assets/${item.toLowerCase()}.svg`);

    // lifting up state (clicked page) to App
    function handleNavChange(page) {
        if (props.onNavChange) return props.onNavChange(page.toLowerCase());
    }

    // navigation buttons
    function NavButton(props) {
        return (
            <div className={css.navItem}>
                <button onClick={() => handleNavChange(props.name)}>
                    <img src={publicURL(props.url)} alt={props.name}/>
                </button>
            </div>
        );
    }

    // render navbar
    return (
        <nav className={css.navbar}>
            {navURL.map((url, i) => 
                <NavButton url={url} name={navList[i]} key={url}/>
            )}
        </nav>
    );
}