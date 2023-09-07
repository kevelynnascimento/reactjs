import React, { ReactNode } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

interface Props {
    title: string;
    children: any;
    open: any;
    setOpen: any;
    onConfirm: any;
}

const ConfirmaDialog = ({ title, children, open, setOpen, onConfirm }: Props) => {
    return (
        <Dialog
            open={open}
            onClose={() => setOpen(false)}
            aria-labelledby="confirm-dialog"
        >
            <DialogTitle id="confirm-dialog">{title}</DialogTitle>
            <DialogContent>{children}</DialogContent>
            <DialogActions>
                <Button
                    variant="contained"
                    onClick={() => setOpen(false)}
                    color="secondary"
                >
                    Cancelar
                </Button>
                <Button
                    variant="contained"
                    onClick={() => {
                        setOpen(false);
                        onConfirm();
                    }}
                    color="primary"
                >
                    Confirmar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmaDialog;