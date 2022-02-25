import React, { useContext, useRef, useState } from 'react';

// styles
import styles from "./ImageDisplay.module.scss"

// icons 
import { BsImageFill, BsFillTrashFill } from "react-icons/bs"
import { ImDownload } from "react-icons/im"

// context
import { editorContext } from '../context/EditorContextProvider';

const ImageDisplay = ({ dark }) => {

    const { state, dispatch } = useContext(editorContext)
    const [uploadedImage, setUploadedImage] = useState(null)
    const btnRef = useRef()
    const imageRef = useRef()

    const imageHandler = event => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            setUploadedImage(URL.createObjectURL(image))
        }
    }

    const removeHandler = () => {
        setUploadedImage(null)
        btnRef.current.value = ""
    }


    // style image
    const { radius, brightness, blur, contrast, grayscale, hue, invert, opacity, saturation, sepia, scaleX, scaleY } = state

    if (imageRef.current) {
        imageRef.current.style.borderRadius = `${radius}%`

        imageRef.current.style.transform = `scale(${scaleY}) scaleX(${scaleX})`
        // imageRef.current.style.transform = ``
        
        imageRef.current.style.filter = `
        brightness(${brightness * 2}%) 
        blur(${blur}px) 
        contrast(${contrast}%) 
        Grayscale(${grayscale}%)
        hue-rotate(${hue}deg)
        invert(${invert}%)
        opacity(${opacity}%)
        saturate(${saturation}%)
        sepia(${sepia}%)
        `
    }

    return (
        <div className={`${styles.imageDisplay} ${dark ? styles.darkImageDisplay : ''}`}>
            <div className={styles.imageContainer}>
                {
                    uploadedImage &&
                    <img ref={imageRef} className={styles.image} src={uploadedImage} alt="image" />
                }
            </div>
            <div className={`${styles.icons} ${dark ? styles.darkIcons : ''}`}>
                <label className={styles.uploadIcon} htmlFor="image_input">
                    <BsImageFill />
                    <input ref={btnRef} className={styles.imageInput} type="file" id='image_input' accept='image/png, iage/jpg' onChange={event => imageHandler(event)} />
                </label>
                <ImDownload />
                <BsFillTrashFill onClick={removeHandler} />
            </div>
        </div>
    );
};

export default ImageDisplay;