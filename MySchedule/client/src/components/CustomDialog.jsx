import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const CustomDialog = ({ open, onClose, title, children, maxWidth = 'md', onSubmit, submitLabel }) => (
    <Dialog
        open={open}
        onClose={onClose}
        maxWidth={maxWidth}
        fullWidth
        PaperProps={{
            sx: { width: '90%', maxWidth: '800px' }, // Customize dialog width here
        }}
    >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>{children}</DialogContent>
        <DialogActions>
            <Button onClick={onClose} variant="outlined" color="error">
                Cancel
            </Button>
            <Button onClick={onSubmit} type="submit" variant="contained" color="primary" form="add-task-form">
                {submitLabel}
            </Button>
        </DialogActions>
    </Dialog>
);

export default CustomDialog;
