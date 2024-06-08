import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#34495e",
        },
        secondary: {
            main: "#fc5c65",
        },

    },
    components: {
        MuiButton: {
            defaultProps: {
                variant: "contained",
            },
        },
        MuiContainer: {
            defaultProps: {
                maxWidth: "lg",
            },
        },
    },
    typography: {
        fontFamily: [
            "Poppins",
            "-apple-system",
            "BlinkMacSystemFont",
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(","),
        fontSize: 15,
        fontWeightLight: 300,
        fontWeightRegular: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
    },
});

export default theme;