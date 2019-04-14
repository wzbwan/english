import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
const styles = {
    card: {
        margin:8
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
};

class SentenceCard extends Component {
    state = {
        en: true,
    }

    render() {
        const { classes, en, ch, title } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    
                    <Typography component="p">
                        {this.state.en?en:ch}                        
                    </Typography>
                    {/* <TextField
                        id="outlined-read-only-input"
                        label={title}
                        defaultValue={this.state.en ? en : ch}
                        margin="normal"
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        fullWidth
                        variant="outlined"
                    /> */}
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={()=>{this.setState({en:!this.state.en})}}>{this.state.en?"切换中文":"切换英文"}</Button>
                </CardActions>
            </Card>
        );
    }
}

SentenceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SentenceCard);
