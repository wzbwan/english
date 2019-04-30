import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
class ConfirmModal extends Component {
    handleClose = () => {
        this.props.close();
    }

    handleConfirm = () => {
        this.props.confirm(this.props.id);
    }
    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.handleClose}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">确定要这么做吗？</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        确定要删除<span style={{color:"blue"}} >{this.props.name}</span>吗？
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={this.handleConfirm} color="primary">
                        confirm
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}

ConfirmModal.propTypes = {
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    open: PropTypes.bool.isRequired,
    close: PropTypes.func.isRequired,
    confirm: PropTypes.func.isRequired
};

export default ConfirmModal;