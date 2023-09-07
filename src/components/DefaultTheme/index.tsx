import React, { ReactNode } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { createTheme, ThemeProvider } from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

declare module '@mui/material' {
    interface Theme {
        status: {
            danger: string;
        };
    }
    interface ThemeOptions {
        status?: {
            danger?: string;
        };
    }
}

const theme = createTheme({
    typography: {
        h1: {
            fontFamily: ['Roboto'].join(','),
            fontWeight: 700,
            fontSize: 30,
        },
        h2: {
            fontFamily: ['Roboto'].join(','),
            fontWeight: 700,
            fontSize: 24,
        },
        h3: {
            fontFamily: ['Roboto'].join(','),
            fontWeight: 600,
            fontSize: 18,
        },
    },
});

interface Props {
    children: ReactNode
}

const DefaultTheme = ({ children }: Props) => {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </ThemeProvider>
    );
};

export default DefaultTheme;