import React from 'react';
import css from 'style/Header.module.css';
import publicURL from 'utils/publicURL';

export default Header;

function Header() {
    return (
        <div className={css.header}>
            <div className={css.headerItem}>
                <button>
                    <img src={publicURL("/assets/camera.svg")} alt="camera"/>
                </button>
            </div>
            <div className={css.headerItem}>
                <img src={publicURL("/assets/logo.png")} alt="logo"/>
            </div>
            <div className={css.headerItem}>
                <button>
                    <img src={publicURL("/assets/message.svg")} alt="message"/>
                </button>
            </div>
        </div>
    );
}