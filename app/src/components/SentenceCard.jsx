import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import fetchData from '../tools/fetchData';
import Avatar from '@material-ui/core/Avatar';

const styles = {
    card: {
        margin:8
    },
    actions: {
        display: 'flex',
    },
    countBtn: {
        marginLeft: 'auto',
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
    margin: {
        
    }
};

class SentenceCard extends Component {
    state = {
        en: true,
        reviewing:false,
        currentCount:0,
    }

    review = () => {
        this.setState({reviewing:true});
        fetchData("/sentenceReviewCountPlus", { sentenceId:this.props._id }).then(
            res => {
                if (res.status === 1) {
                    this.setState({reviewing:false,currentCount:this.state.currentCount + 1});
                }
            }
        )
    }

    render() {
        const { classes, _id, en, ch, title, count, openConfirmModal } = this.props;
        return (
            <Card className={classes.card}>
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        {title}
                    </Typography>
                    
                    <Typography component="pre">
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
                <CardActions className={classes.actions} >
                    <IconButton aria-label="Delete" onClick={() => { openConfirmModal(_id,title)}}>
                        <DeleteIcon fontSize="small" />
                    </IconButton>
                    {/* <Fab
                        variant="extended"
                        size="small"
                        color="primary"
                        aria-label="Add"
                        className={classes.margin}
                        onClick={() => { this.setState({ en: !this.state.en }) }}
                    >
                        <NavigationIcon className={classes.extendedIcon} />
                        {this.state.en ? "切换中文" : "切换英文"}
                    </Fab> */}
                    <Button variant="outlined" style={{width:'100%'}} size="small" color="primary" onClick={()=>{this.setState({en:!this.state.en})}}>{this.state.en?"切换中文":"切换英文"}</Button>
                    <Chip
                        avatar={<Avatar>{this.state.reviewing ? (<CircularProgress
                            className={classes.progress}
                            variant="determinate"
                            value={this.state.completed}
                        />):count+this.state.currentCount}</Avatar>}
                        label="完成复习"
                        onClick={this.review}
                        color="primary"
                        variant="outlined"
                        className={classes.countBtn}
                    />
                </CardActions>
            </Card>
        );
    }
}

SentenceCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SentenceCard);
