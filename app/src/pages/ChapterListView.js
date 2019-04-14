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
import fetchData from '../tools/fetchData';

import CreateNewChapterModal from '../components/CreateNewChapterModal';

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

class ChapterListView extends Component {
    state = {
        chapters: [],
        createChapterModalOpen: false,
    }

    createChapterClose = () => {
        this.setState({ createChapterModalOpen: false });
    }

    createChapterSubmit = (name) => {
        // fetch("")
        console.log(name);
        fetchData("/createChapter", { name: name, bookId: this.props.match.params.bookId }).then(
            response => {
                if (response.status === 1) {
                    this.fetchChapters();
                }
            }
        ).catch(
            //
        )
        this.createChapterClose();
    }

    fetchChapters = () => {
        fetchData("/getChaptersByBookId", { bookId: this.props.match.params.bookId }).then(
            response => {
                if (response.status === 1) {
                    this.setState({ chapters: response.data });
                } else {
                    // 
                }
            }
        ).catch(
            // 
        )
    }

    componentDidMount = () => {
        this.fetchChapters();
    }


    render() {
        const { classes } = this.props;
        const { chapters } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => { this.setState({ createChapterModalOpen: true }) }}>添加Chapter</Button>
                    </Toolbar>
                </AppBar>
                <List className={classes.list}>
                    {chapters.map((chapter, index) => {
                        return (
                            <Link key={index} style={{ textDecoration: 'none' }} to={"/sentence/"+chapter._id}>
                                <ListItem>
                                    <Avatar>
                                        {index}
                                    </Avatar>
                                    <ListItemText primary={chapter.name} secondary="Jan 9, 2014" />
                                </ListItem>
                            </Link>
                        )
                    })}
                </List>
                <CreateNewChapterModal open={this.state.createChapterModalOpen} close={this.createChapterClose} submit={this.createChapterSubmit} />
            </div>
        );
    }
}

ChapterListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ChapterListView);