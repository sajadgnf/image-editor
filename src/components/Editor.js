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

    const { state, dispatch } = useContext(editorContext)

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


    const RangeHandler = event => {
        setRange({
            ...range,
            [event.target.name]: event.target.value
        })

        dispatch({ type: event.target.name.toUpperCase(), payload: (event.target.value) })
    }

    const scaleHandler = event => {

        const button = event.currentTarget.dataset.name
        setRange({ ...range, [button]: !range[button] })

        if (range[button]) {
            dispatch({ type: button.toUpperCase(), payload: "-1" })
        } else {
            dispatch({ type: button.toUpperCase(), payload: "1" })
        }

    }

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
                <div className={styles.toolsIcon}>
                    <BsTools />
                    <span className={styles.line}></span>
                </div>

                <div className={styles.resetButton}>
                    <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
                </div>

                <div className={styles.radiusContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Radius</label>
                        <input
                            name="radius"
                            value={radius}
                            max='50'
                            type="range"
                            onChange={event => RangeHandler(event)}
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
                <div className={styles.settingIcon}>
                    <BiSlider />
                    <span className={styles.line}></span>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Brightness</label>
                        <input
                            name="brightness"
                            value={brightness}
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{brightness}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Blur</label>
                        <input
                            name='blur'
                            value={blur}
                            max='10'
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{blur}px</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Contrast</label>
                        <input
                            name="contrast"
                            value={contrast}
                            max="400"
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{contrast}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Grayscale</label>
                        <input
                            name="grayscale"
                            value={grayscale}
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{grayscale}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Hue</label>
                        <input
                            name="hue"
                            value={hue}
                            max="400"
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span className={styles.degree}>{hue} deg</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Invert</label>
                        <input
                            name="invert"
                            value={invert}
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{invert}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Opacity</label>
                        <input
                            name="opacity"
                            value={opacity}
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{opacity}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Saturation</label>
                        <input
                            name="saturation"
                            value={saturation}
                            max="300"
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{saturation}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>

                <div className={styles.toolsContainer}>
                    <form className={styles.rangeForm}>
                        <label htmlFor="">Sepia</label>
                        <input
                            name="sepia"
                            value={sepia}
                            type="range"
                            onChange={event => RangeHandler(event)}
                            className={styles.range}
                        />
                        <span>{sepia}%</span>
                        <div className={styles.flipButtons}>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Editor;