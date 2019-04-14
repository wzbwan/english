import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class CreateNewChapterModal extends Component {
    state = {
        name: ''
    }

    handleClose = () => {
        this.props.close();
    }

    handleSubmit = () => {
        this.props.submit(this.state.name);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Create a Chapter</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        To subscribe to this website, please enter your email address here. We will send
                        updates occasionally.
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Chapter name"
                        fullWidth
                        onChange={(e) => { this.setState({ name: e.target.value }) }}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleSubmit} color="primary">
                        create
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

export default CreateNewChapterModal;