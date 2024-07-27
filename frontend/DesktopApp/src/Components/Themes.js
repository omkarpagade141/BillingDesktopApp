import { createTheme } from '@mui/material/styles';

// Define your custom theme
const theme = createTheme({
    palette: {
        primary: {
            main: '#70df16',  
            darker:'#66b128'
            // main: '#ff0000',
        },
        secondary: {
            main: '#e9e3e3',  
        },
        background: {
            default: 'white',

        },
        
    },
    typography: {
        fontFamily: 'Roboto, Arial, sans-serif',  
        
    },
});

export default theme;
