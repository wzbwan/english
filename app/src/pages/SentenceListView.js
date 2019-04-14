import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import fetchData from '../tools/fetchData';

import CreateSentenceModal from '../components/CreateSentenceModal';
import SentenceCard from '../components/SentenceCard';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    list: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
});

class SentenceListView extends Component {
    state = {
        sentences: [],
        createSentenceModalOpen: false,
    }

    createSentenceClose = () => {
        this.setState({ createSentenceModalOpen: false });
    }

    createSentenceSubmit = (formData) => {
        fetchData("/createSentence", { ...formData, chapterId: this.props.match.params.chapterId }).then(
            response => {
                if (response.status === 1) {
                    this.fetchSentences();
                }
            }
        ).catch(
            //
        )
        this.createSentenceClose();
    }

    fetchSentences = () => {
        fetchData("/getSentenceByChapterId", { chapterId: this.props.match.params.chapterId}).then(
            response => {
                if (response.status === 1) {
                    this.setState({ sentences: response.data });
                } else {
                    // 
                }
            }
        ).catch(
            // 
        )
    }

    componentDidMount = () => {
        console.log(this.props)
        this.fetchSentences();
    }


    render() {
        const { classes } = this.props;
        const { sentences } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => { this.setState({ createSentenceModalOpen: true }) }}>添加Sentence</Button>
                    </Toolbar>
                </AppBar>
                {sentences.map((sentence, index) => {
                    return (
                        <SentenceCard key={index} {...sentence} />
                    )
                })}
                <CreateSentenceModal open={this.state.createSentenceModalOpen} close={this.createSentenceClose} submit={this.createSentenceSubmit} />
            </div>
        );
    }
}

SentenceListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SentenceListView);