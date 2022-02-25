import React from 'react';

// styles
import styles from "./Navbar.module.scss"

const Navbar = ({dark, setDark}) => {

    return (
        <div className={`${styles.navbar} ${dark ? styles.darkNav : ''}`}>
            <h1>Image<span>Editor</span></h1>
            <div className={styles.switchBtn}>
                <p className={dark ? styles.switchTitle : ""}>{dark ? "Dark" : "Light"}</p>
                <label className={styles.switch}>
                    <input type="checkbox" onClick={() => setDark(!dark)} />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    );
};

export default Navbar;