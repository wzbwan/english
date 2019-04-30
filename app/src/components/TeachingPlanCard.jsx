import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
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
        margin: 8,
        height: 293
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

class TeachingPlanCard extends Component {
    state = {
    }

    render() {
        const { classes, content, title, secTitle, avatar } = this.props;
        return (
            <Card className={classes.card}>
                <CardHeader
                    avatar={
                        <Avatar aria-label="Recipe" className={classes.avatar}>
                            {avatar}
                        </Avatar>
                    }
                    title={<h2 style={{padding:0,margin:0}}>{title}</h2>}
                    subheader={secTitle}
                />
                <CardContent>
                    <Typography component="pre">
                        {content}
                    </Typography>
                </CardContent>
                <CardActions className={classes.actions} >
                    
                </CardActions>
            </Card>
        );
    }
}

TeachingPlanCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TeachingPlanCard);
