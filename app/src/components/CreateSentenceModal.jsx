import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
});

class CreateNewSentenceModal extends Component {
    state = {
        title: '',
        en: '',
        ch: ''
    }

    handleClose = () => {
        this.props.close();
    }

    handleSubmit = () => {
        this.props.submit({...this.state});
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const { classes } = this.props;
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
                        id="outlined-name"
                        label="Name"
                        className={classes.textField}
                        value={this.state.name}
                        onChange={this.handleChange('title')}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-textarea"
                        label="英文"
                        placeholder="英文"
                        multiline
                        className={classes.textField}
                        onChange={this.handleChange('en')}
                        fullWidth
                        margin="normal"
                        variant="outlined"
                    />
                    <TextField
                        id="outlined-textarea"
                        label="中文"
                        placeholder="中文"
                        multiline
                        className={classes.textField}
                        onChange={this.handleChange('ch')}
                        fullWidth
                        margin="normal"
                        variant="outlined"
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

CreateNewSentenceModal.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewSentenceModal);
