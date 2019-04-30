import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookIcon from '@material-ui/icons/Book';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import DescriptionIcon from '@material-ui/icons/Description';

const styles = {
    list: {
        width: 250,
    },
    fullList: {
        width: 'auto',
    },
};

class SentenceMenu extends Component {
    render() {
        const { classes, open, chapterList, book } = this.props;

        const sideList = (
            <div className={classes.list}>
                <List>
                    <ListItem component={Link} to="/">
                        <ListItemIcon><BookIcon /></ListItemIcon>
                        <ListItemText primary="Books" />
                    </ListItem>
                    <ListItem component={Link} to={'/chapter/' + book}>
                        <ListItemIcon><LibraryBooksIcon /></ListItemIcon>
                        <ListItemText primary="Chapters" />
                    </ListItem>
                </List>
                <Divider />
                <List>
                    {chapterList.map((chapter, index) => (
                        <ListItem component={Link} to={'/sentence/' + chapter._id} key={index}>
                            <ListItemIcon><DescriptionIcon /></ListItemIcon>
                            <ListItemText primary={chapter.name} />
                        </ListItem>
                    ))}
                </List>
            </div>
        );

        return (
            <Drawer open={open} onClose={this.props.close}>
                <div
                    tabIndex={0}
                    role="button"
                    onClick={this.props.close}
                    onKeyDown={this.props.close}
                >
                    {sideList}
                </div>
            </Drawer>
        );
    }
}

SentenceMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SentenceMenu);