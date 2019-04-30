import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import fetchData from '../tools/fetchData';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import CreateSentenceModal from '../components/CreateSentenceModal';
import SentenceCard from '../components/SentenceCard';
import SentenceMenu from '../components/SentenceMenu';
import ConfirmModal from '../components/ConfirmModal';

function mapStateToProps(state) {
    return {
        chapterList: state.mainReducer.chapterList,
        currentBook: state.mainReducer.currentBook,
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

class SentenceListView extends Component {
    state = {
        sentences: [],
        createSentenceModalOpen: false,
        menuOpen:false,
        confirmModalOpen: false,
        selectedId: '',
        selectedName: '',
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

    handleMenuClose = () => {
        this.setState({menuOpen: false})
    }


    openConfirmModal = (id, name) => {
        this.setState({ confirmModalOpen: true, selectedId: id, selectedName: name });
    }

    confirmModalClose = () => {
        this.setState({ confirmModalOpen: false })
    }

    handleConfirm = (id) => {
        fetchData("/deleteSentence", { sentenceId: id }).then(
            res => {
                if (res.status === 1) {
                    this.fetchSentences();
                }
            }
        )
        this.confirmModalClose();
    }

    fetchSentences = () => {
        this.fetchSentencesByChapterId(this.props.match.params.chapterId)
    }

    fetchSentencesByChapterId = (chapterId) => {
        fetchData("/getSentenceByChapterId", { chapterId }).then(
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

    sentenceReviewCountPlus = (sentenceId) => {
        fetchData("/sentenceReviewCountPlus", {sentenceId}).then(
            res => {
                if (res.status === 1) {
                    this.fetchSentences();
                }
            }
        )
    }

    componentDidMount = () => {
        console.log(this.props)
        this.fetchSentences();
    }

    componentWillReceiveProps = (props) => {
        console.log(props)
        if (this.props.match.params.chapterId !== props.match.params.chapterId) {
            this.fetchSentencesByChapterId(props.match.params.chapterId);
        }
    }

    render() {
        const { classes, chapterList, currentBook } = this.props;
        const { sentences } = this.state;
        return (
            <div>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={() => { this.setState({ menuOpen: true }) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            句子
                        </Typography>
                        <Button color="inherit" onClick={() => { this.setState({ createSentenceModalOpen: true }) }}>添加Sentence</Button>
                    </Toolbar>
                </AppBar>
                {sentences.map((sentence, index) => {
                    return (
                        <SentenceCard key={sentence._id} openConfirmModal={this.openConfirmModal} review={this.sentenceReviewCountPlus} {...sentence} />
                    )
                })}
                <CreateSentenceModal open={this.state.createSentenceModalOpen} close={this.createSentenceClose} submit={this.createSentenceSubmit} />
                <SentenceMenu open={this.state.menuOpen} close={this.handleMenuClose} chapterList={chapterList} book={currentBook} />
                <ConfirmModal open={this.state.confirmModalOpen} close={this.confirmModalClose} confirm={this.handleConfirm} id={this.state.selectedId} name={this.state.selectedName} />
            </div>
        );
    }
}

SentenceListView.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default connect(
    mapStateToProps,
)(withStyles(styles)(SentenceListView));