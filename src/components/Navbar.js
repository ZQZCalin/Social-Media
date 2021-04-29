import React from 'react';
import publicURL from 'utils/publicURL'
import css from 'style/Navbar.module.css'

export default Navbar;

function Navbar() {
    let navItems = [
        "home", "explore", "newpost", "activity", "profile",
    ];
    let navItemsURL = navItems.map(item => `/assets/${item}.svg`);
    return (
        <nav className={css.navbar}>
            {
                navItemsURL.map((url,i) => (
                    <div className={publicURL(css.navItem)} key={url}>
                        <button>
                            <img src={url} alt={navItems[i]}/>
                        </button>
                    </div>
                ))
            }
        </nav>
    );
}