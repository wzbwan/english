import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CreateNewChapterModal from '../components/CreateNewChapterModal';
import ConfirmModal from '../components/ConfirmModal';
import { updateChapterList, updateBook } from '../redux/actions/mainAction';

function mapStateToProps(state) {
    return {
        chapterList: state.mainReducer.chapterList,
    };
}

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
        createChapterModalOpen: false,
        confirmModalOpen: false,
        selectedId: '',
        selectedName: '',
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

    openConfirmModal = (id, name) => {
        this.setState({ confirmModalOpen: true, selectedId: id, selectedName: name });
    }

    confirmModalClose = () => {
        this.setState({ confirmModalOpen: false })
    }

    handleConfirm = (id) => {
        fetchData("/deleteChapter", { chapterId: id }).then(
            res => {
                if (res.status === 1) {
                    this.fetchChapters();
                }
            }
        )
        this.confirmModalClose();
    }

    fetchChapters = () => {
        fetchData("/getChaptersByBookId", { bookId: this.props.match.params.bookId }).then(
            response => {
                if (response.status === 1) {
                    this.props.dispatch(updateChapterList(response.data))
                    
                    // this.setState({ chapters: response.data });
                } else {
                    // 
                }
            }
        ).catch(
            // 
        )
    }

    componentDidMount = () => {
        this.props.dispatch(updateBook(this.props.match.params.bookId))
        this.fetchChapters();
    }


    render() {
        const { classes, chapterList } = this.props;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <Button color="inherit" onClick={() => { this.setState({ createChapterModalOpen: true }) }}>添加Chapter</Button>
                    </Toolbar>
                </AppBar>
                <List className={classes.list}>
                    {chapterList.map((chapter, index) => {
                        return (
                        <ListItem key={index}>
                                <Avatar>
                                    <LibraryBooksIcon />
                                </Avatar>
                            <Link  style={{ textDecoration: 'none', marginLeft:8 }} to={"/sentence/" + chapter._id}>
                                <ListItemText primary={chapter.name} secondary="Jan 9, 2014" />
                            </Link>
                                <ListItemSecondaryAction>
                                    <IconButton aria-label="Delete" onClick={() => { this.openConfirmModal(chapter._id, chapter.name) }}>
                                        <DeleteIcon />
                                    </IconButton>
                                </ListItemSecondaryAction>
                        </ListItem>
                        )
                    })}
                </List>
                <CreateNewChapterModal open={this.state.createChapterModalOpen} close={this.createChapterClose} submit={this.createChapterSubmit} />
                <ConfirmModal open={this.state.confirmModalOpen} close={this.confirmModalClose} confirm={this.handleConfirm} id={this.state.selectedId} name={this.state.selectedName} />

            </div>
        );
    }
}

ChapterListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(withStyles(styles)(ChapterListView));