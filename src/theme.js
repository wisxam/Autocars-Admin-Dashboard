//setup to get all the colors and the typogrophy in the website (light and dark mode)

import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
//use these two to establish the theme steup through the entire web

// color design tokens (the colors that i will be using which will be 5 colors)
// use tailwind extension
// creates different options of the same 
// create token function and pass in the mode so this mode will represent dark or light mode 
// ... if mode, and then pass in it as ternary operator
export const tokens = (mode) => ({
    ...(mode === "dark" //if the mode is dark then im gonna be using these colors : after the double dots it will be for the light mode
        ? {
            handle: {
                100: '#1A1820',
                200: '#52392F',
                300: '#8C614F',
                400: '#FFFAE7'
            },
            grey: {
                100: "#e0e0e0",
                200: "#c2c2c2",
                300: "#a3a3a3",
                400: "#858585",
                500: "#666666",
                600: "#525252",
                700: "#3d3d3d",
                800: "#292929",
                900: "#141414"
            },
            primary: {
                100: "#d0d1d5",
                200: "#a1a4ab",
                300: "#727681",
                400: "#434957",
                500: "#141b2d",
                600: "#101624",
                700: "#0c101b",
                800: "#080b12",
                900: "#040509"
            },
            greenAccent: {
                100: "#dbf5ee",
                200: "#b7ebde",
                300: "#94e2cd",
                400: "#70d8bd",
                500: "#4cceac",
                600: "#3da58a",
                700: "#2e7c67",
                800: "#1e5245",
                900: "#0f2922"
            },
            redAccent: {
                100: "#f8dcdb",
                200: "#f1b9b7",
                300: "#e99592",
                400: "#e2726e",
                500: "#db4f4a",
                600: "#af3f3b",
                700: "#832f2c",
                800: "#58201e",
                900: "#2c100f"
            },
            blueAccent: {
                100: "#e1e2fe",
                200: "#c3c6fd",
                300: "#a4a9fc",
                400: "#868dfb",
                500: "#6870fa",
                600: "#535ac8",
                700: "#3e4396",
                800: "#2a2d64",
                900: "#151632"
            },
        } :
        { //ctrl p then >sort lines descending (i invert the colors above)
            handle: {
                100: '#52392F',
                200: '#8C614F',
                300: '#FFFAE7',
                400: '#1A1820',
                500: 'FFF4E7',
                600: 'FFF6E7',
                600: 'FFF8E7',
                600: 'FFFaE7',
            },
            grey: {
                100: "#141414",
                200: "#292929",
                300: "#3d3d3d",
                400: "#525252",
                500: "#666666",
                600: "#858585",
                700: "#a3a3a3",
                800: "#c2c2c2",
                900: "#e0e0e0"
            },
            primary: {
                100: "#040509",
                200: "#080b12",
                300: "#0c101b",
                400: "#1F2A40", //try #f2f0f0 after
                500: "#141b2d",
                600: "#434957",
                700: "#727681",
                800: "#a1a4ab",
                900: "#d0d1d5"
            },
            greenAccent: {
                100: "#0f2922",
                200: "#1e5245",
                300: "#2e7c67",
                400: "#3da58a",
                500: "#4cceac",
                600: "#70d8bd",
                700: "#94e2cd",
                800: "#b7ebde",
                900: "#dbf5ee",
            },
            redAccent: {
                100: "#2c100f",
                200: "#58201e",
                300: "#832f2c",
                400: "#af3f3b",
                500: "#db4f4a",
                600: "#e2726e",
                700: "#e99592",
                800: "#f1b9b7",
                900: "#f8dcdb",
            },
            blueAccent: {
                100: "#151632",
                200: "#2a2d64",
                300: "#3e4396",
                400: "#535ac8",
                500: "#6870fa",
                600: "#868dfb",
                700: "#a4a9fc",
                800: "#c3c6fd",
                900: "#e1e2fe",
            },
        }
    )
});

// material ui theme settings
export const themeSettings = (mode) => {
    const colors = tokens(mode); // returning which color token will be used

    return {
        // return the material ui settings that i want (inside the palette will be an object)
        palette: {
            mode: mode,
            ...(mode === 'dark'
                ? {
                    //give it an object which will be the palette
                    primary: {
                        main: colors.primary[700],
                    },
                    secondary: {
                        main: colors.greenAccent[800],
                    },
                    neutral: {
                        dark: colors.grey[600],
                        main: colors.grey[700],
                        light: colors.grey[200]
                    },
                    background: {
                        default: colors.handle[100], //from primary to background is the official setup for darkmode
                    }
                } : {
                    primary: {
                        main: colors.primary[300],
                    },
                    secondary: {
                        main: colors.greenAccent[200],
                    },
                    neutral: {
                        dark: colors.grey[500],
                        main: colors.grey[700],
                        light: colors.grey[200]
                    },
                    background: {
                        default: "#ffefb4", //from primary to background is the official setup for light mode
                    }
                }
            )
        },
        typography: { //whenever im using the material ui component such as typography component its gonna change its context to my objects
            fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
            fontSize: 12,
            h1: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 40,
            },
            h2: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 32,
            },
            h3: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 24,
            },
            h4: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 20,
            },
            h5: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 16,
            },
            h6: { //setup font family for each one (all the heading tags)
                fontFamily: ["Source Sans Pro", "sans-serif"].join(","),
                fontSize: 14,
            },
        },
    };
};

// context for the color mode
export const ColorModeContext = createContext({
    toggleColorMode: () => { } // this is a function that will allow us to change the color 
});

export const useMode = () => {
    const [mode, setMode] = useState("dark"); // this will be the state thats gonna be storing the condition or the state of the dark or light mode 

    // create another function now called colorMode

    const colorMode = useMemo(
        () => ({
            toggleColorMode: () =>
                setMode((prev) => (prev === "light" ? "dark" : "light"))
        }),
        []
    );

    const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
    // what this is doing is creating the theme from material UI and im passing in the mode using themeSettings method that i created which that gives me an object of the proper format, depending on the dark or light mode 

    return [theme, colorMode];
}