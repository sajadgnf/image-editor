import React, { useEffect, useRef } from 'react';

// styles
import styles from "./Navbar.module.scss"

const Navbar = ({ dark, setDark }) => {

    const ref = useRef()

    useEffect(() => {
        if (dark !== null) {
            localStorage.setItem("mood", JSON.stringify(dark))
        }

        if (dark) {
            ref.current.checked = true
        }
    }, [dark])

    return (
        <div className={`${styles.navbar} ${dark ? styles.darkNav : ''}`}>
            <h1>Image<span>Editor</span></h1>
            <div className={styles.switchBtn}>
                <p className={dark ? styles.switchTitle : ""}>{dark ? "Dark" : "Light"}</p>
                <label className={styles.switch}>
                    <input type="checkbox" onClick={() => setDark(!dark)} ref={ref} />
                    <span className={styles.slider}></span>
                </label>
            </div>
        </div>
    );
};

export default Navbar;