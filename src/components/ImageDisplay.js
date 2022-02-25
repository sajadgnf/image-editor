import React, { useContext, useRef, useState } from 'react';
import domtoimage from "dom-to-image"
import { useDropzone } from "react-dropzone"

// styles
import styles from "./ImageDisplay.module.scss"

// icons 
import { BsImageFill, BsFillTrashFill, BsPlusLg } from "react-icons/bs"
import { ImDownload } from "react-icons/im"

// context
import { editorContext } from '../context/EditorContextProvider';

const ImageDisplay = ({ dark }) => {

    const { state } = useContext(editorContext)
    const [uploadedImage, setUploadedImage] = useState(null)
    const [file, setFile] = useState([])
    const btnRef = useRef()
    const imageRef = useRef()

    // image uploader
    const imageHandler = event => {
        if (event.target.files && event.target.files[0]) {
            const image = event.target.files[0]
            setUploadedImage(URL.createObjectURL(image))
        }
    }

    //drag and drop image
    const { getRootProps, getInputProps } = useDropzone({
        accept: "image/*",
        onDrop: (acceptedFiles) => {
            setFile(
                acceptedFiles.map((file) =>
                    Object.assign(file, {
                        preview: URL.createObjectURL(file),
                    })
                )
            )
        },
    })

    //remove image handler
    const removeHandler = () => {
        setUploadedImage(null)
        setFile([])
        btnRef.current.value = ""
    }

    // add changes to image
    const { radius,
        brightness,
        blur,
        contrast,
        grayscale,
        hue,
        invert,
        opacity,
        saturation,
        sepia,
        scaleX,
        scaleY
    } = state

    if (imageRef.current) {
        imageRef.current.style.borderRadius = `${radius}%`

        imageRef.current.style.transform = `scaleY(${scaleY}) scaleX(${scaleX})`

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

    const downloadHandler = () => {
        domtoimage.toPng(imageRef.current)
            .then(dataUrl => {
                let link = document.createElement('a');
                link.setAttribute('crossorigin', "anonymous")
                link.download = 'my-image.png';
                link.href = dataUrl;
                link.click();
            });
    }
    console.log(window.innerWidth);
    return (
        <div className={`${styles.imageDisplay} ${dark ? styles.darkImageDisplay : ''}`}>

            <div className={styles.imageContainer} >
                {
                    window.innerWidth > 720 && !file.length && !uploadedImage &&
                    <div className={styles.dropContainer} {...getRootProps()}>
                        <input {...getInputProps()} />
                        <p>Drop Image Here</p>
                        <BsPlusLg />
                    </div>
                }
                {
                    file.length || uploadedImage ?
                        <img
                            ref={imageRef}
                            className={styles.image}
                            src={
                                uploadedImage && uploadedImage ||
                                file.length && file[0].preview
                            }
                            alt="image"
                        /> :
                        null
                }
            </div>

            <div className={`${styles.icons} ${dark ? styles.darkIcons : ''}`}>
                <label className={styles.uploadIcon} htmlFor="image_input">
                    <BsImageFill />
                    <input
                        ref={btnRef}
                        className={styles.imageInput}
                        type="file"
                        id='image_input'
                        accept='image/png, iage/jpg'
                        onChange={event => imageHandler(event)}
                    />
                </label>

                <ImDownload onClick={downloadHandler} />
                <BsFillTrashFill onClick={removeHandler} />
            </div>
        </div>
    );
};

export default ImageDisplay;