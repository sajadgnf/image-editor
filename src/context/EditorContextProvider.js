import { React, createContext, useReducer } from "react"

const initialState = {
    radius: 0,
    scaleX: 1,
    scaleY: 1,
    brightness: 50,
    blur: 0,
    contrast: 100,
    grayscale: 0,
    hue: 0,
    invert: 0,
    opacity: 100,
    saturation: 100,
    sepia: 0,
    reset: false
}


const reducer = (state, action) => {
    switch (action.type) {
        case "RADIUS":
            return {
                ...state,
                reset: false,
                radius: action.payload
            }
        case "SCALEX":
            return {
                ...state,
                reset: false,
                scaleX: action.payload
            }
        case "SCALEY":
            return {
                ...state,
                reset: false,
                scaleY: action.payload
            }
        case "BRIGHTNESS":
            return {
                ...state,
                reset: false,
                brightness: action.payload
            }
        case "BLUR":
            return {
                ...state,
                reset: false,
                blur: action.payload
            }
        case "CONTRAST":
            return {
                ...state,
                reset: false,
                contrast: action.payload
            }
        case "GRAYSCALE":
            return {
                ...state,
                reset: false,
                grayscale: action.payload
            }
        case "HUE":
            return {
                ...state,
                reset: false,
                hue: action.payload
            }
        case "INVERT":
            return {
                ...state,
                reset: false,
                invert: action.payload
            }
        case "OPACITY":
            return {
                ...state,
                reset: false,
                opacity: action.payload
            }
        case "SATURATION":
            return {
                ...state,
                reset: false,
                saturation: action.payload
            }
        case "SEPIA":
            return {
                ...state,
                reset: false,
                sepia: action.payload
            }
        case "RESET":
            return {
                radius: 0,
                scaleX: 1,
                scaleY: 1,
                brightness: 50,
                blur: 0,
                contrast: 100,
                grayscale: 0,
                hue: 0,
                invert: 0,
                opacity: 100,
                saturation: 100,
                sepia: 0,
                reset: true
            }
        default:
            return state
    }
}

export const editorContext = createContext()

const EditorContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(reducer, initialState)

    return (
        <editorContext.Provider value={{ state, dispatch, initialState }}>
            {children}
        </ editorContext.Provider>
    )
}


export default EditorContextProvider