import React, { useState, useContext, useEffect } from 'react';

// styles
import styles from "./Editor.module.scss"

// context
import { editorContext } from "../context/EditorContextProvider"

// icons
import { BsTools } from "react-icons/bs"
import { BiSlider } from "react-icons/bi"
import { ImUndo2 } from "react-icons/im"
import { CgEditFlipH, CgEditFlipV } from "react-icons/cg"

const Editor = ({ dark }) => {

    const { state, dispatch, initialState } = useContext(editorContext)

    const [range, setRange] = useState({
        radius: 0,
        scaleX: true,
        scaleY: true,
        brightness: 50,
        blur: 0,
        contrast: 100,
        grayscale: 0,
        hue: 0,
        invert: 0,
        opacity: 100,
        saturation: 100,
        sepia: 0
    })

    // get the inputs changes 
    const rangeHandler = event => {

        setRange({
            ...range,
            [event.target.name]: event.target.value
        })

        dispatch({
            type: event.target.name.toUpperCase(),
            payload: event.target.value
        })
    }

    // undo the change for each input
    const undoHandler = event => {
        event.preventDefault()
        const name = event.currentTarget.parentNode.nextElementSibling.name

        setRange({
            ...range,
            [name]: initialState[name]
        })

        dispatch({
            type: name.toUpperCase(),
            payload: initialState[name]
        })
    }

    // image change scale handle
    const scaleHandler = event => {

        const button = event.currentTarget.dataset.name
        setRange({ ...range, [button]: !range[button] })

        if (range[button]) {
            dispatch({ type: button.toUpperCase(), payload: "-1" })
        } else {
            dispatch({ type: button.toUpperCase(), payload: "1" })
        }

    }

    // render page after restart 
    useEffect(() => {
        if (state.reset) {
            setRange({ ...state })
        }
    }, [state])

    const {
        radius,
        brightness,
        blur,
        contrast,
        grayscale,
        hue,
        invert,
        opacity,
        saturation,
        sepia
    } = range


    return (
        <div className={`${styles.editorContainer} ${dark ? styles.darkEditor : ''}`}>

            {/* radius */}
            <div>

                {/* top line */}
                <div className={styles.toolsIcon}>
                    <BsTools />
                    <span className={styles.line}></span>
                </div>

                <div className={styles.resetButton}>
                    <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
                </div>

                {/* radius input */}
                <div className={styles.radiusContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Radius</label>
                            <button className={styles.undo} onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="radius"
                            value={radius}
                            max='50'
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{radius}%</span>
                    </form>

                    <div className={styles.flipButtons}>
                        <button
                            data-name='scaleX'
                            onClick={event => scaleHandler(event)}>
                            <CgEditFlipH />
                        </button>
                        <button
                            data-name='scaleY'
                            onClick={event => scaleHandler(event)}>
                            <CgEditFlipV />
                        </button>
                    </div>
                </div>
            </div>

            {/* setting */}
            <div className={styles.settingContainer}>

                {/* top line */}
                <div className={styles.settingIcon}>
                    <BiSlider />
                    <span className={styles.line}></span>
                </div>

                {/* range inputs */}
                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Brightness</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="brightness"
                            value={brightness}
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{brightness}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Blur</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name='blur'
                            value={blur}
                            max='10'
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{blur}px</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Contrast</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="contrast"
                            value={contrast}
                            max="400"
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{contrast}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Grayscale</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="grayscale"
                            value={grayscale}
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{grayscale}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Hue</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="hue"
                            value={hue}
                            max="400"
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span className={styles.degree}>{hue} deg</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Invert</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="invert"
                            value={invert}
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{invert}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Opacity</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="opacity"
                            value={opacity}
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{opacity}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Saturation</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="saturation"
                            value={saturation}
                            max="300"
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{saturation}%</span>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <div className={styles.rangeContent}>
                            <label htmlFor="">Sepia</label>
                            <button onClick={event => undoHandler(event)}><ImUndo2 /></button>
                        </div>

                        <input
                            name="sepia"
                            value={sepia}
                            type="range"
                            onChange={event => rangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{sepia}%</span>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editor;