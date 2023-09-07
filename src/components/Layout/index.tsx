import React, { ReactNode } from 'react';
import { Box, Toolbar } from '@mui/material';
import Header from '../Header';

interface Props {
    children: ReactNode
}

const Layout = ({ children }: Props) => {
    return (
        <Box sx={{ display: 'flex' }}>
            <Header />
            <Box
                component="main"
                sx={{
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900],
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                }}
            >
                <Toolbar />
                {children}
            </Box>
        </Box>
    );
};

export default Layout;