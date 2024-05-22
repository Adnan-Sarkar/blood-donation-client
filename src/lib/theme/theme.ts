import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: "#fc5c65",
        },
        secondary: {
            main: "#34495e",
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
        }
    }
});

export default theme;