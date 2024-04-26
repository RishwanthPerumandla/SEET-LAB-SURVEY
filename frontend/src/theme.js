// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        mode: 'light',  // This should enforce the light mode
    },
});

export default theme;
