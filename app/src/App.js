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
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import IconButton from '@material-ui/core/IconButton'
import DeleteIcon from '@material-ui/icons/Delete';
import BookIcon from '@material-ui/icons/Book';
import fetchData from './tools/fetchData';
import './App.css';
import CreateNewBookModal from './components/CreateNewBookModal';
import ConfirmModal from './components/ConfirmModal';

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

class App extends Component {
  state = {
    books:[],
    createBookModalOpen:false,
    confirmModalOpen:false,
    selectedId:'',
    selectedName:'',
  }

  createBookClose = () => {
    this.setState({createBookModalOpen:false});  
  }

  createBookSubmit = (name) => {
    // fetch("")
    console.log(name);
    fetchData("/createBook",{name:name}).then(
      response => {
        if (response.status === 1) {
          this.fetchBooks();
        }
      }
    ).catch(
      //
    )
    this.createBookClose();
  }

  openConfirmModal = (id,name) => {
    this.setState({confirmModalOpen:true,selectedId:id,selectedName:name});
  }

  confirmModalClose = () => {
    this.setState({confirmModalOpen:false})
  }

  handleConfirm = (id) => {
    fetchData("/deleteBook",{bookId:id}).then(
      res => {
        if (res.status === 1) {
          this.fetchBooks();
        }
      }
    )
    this.confirmModalClose();
  }

  fetchBooks = () => {
    fetchData("/getBooks", {}).then(
      response => {
        if (response.status === 1) {
          this.setState({ books: response.data });
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
    this.fetchBooks();
  }

  render() {
    const { classes } = this.props;
    const { books } = this.state;

    return (
      <div className="App">
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" onClick={()=>{this.setState({createBookModalOpen:true})}}>添加Book</Button>
          </Toolbar>
        </AppBar>

        <List className={classes.list}>
          {books.map((book,index)=>{
            return (
              <ListItem key={index}>
                

                <Avatar>
                  <BookIcon/>
                </Avatar>
                  <Link style={{ textDecoration: 'none', marginLeft: 8 }} to={"/chapter/" + book._id}>
                    <ListItemText primary={book.name} secondary="Jan 9, 2014" />
                  </Link>
                  <ListItemSecondaryAction>
                    <IconButton aria-label="Delete" onClick={() => { this.openConfirmModal(book._id, book.name) }} >
                      <DeleteIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
              </ListItem>
            )
          })}
        </List>
        <CreateNewBookModal open={this.state.createBookModalOpen} close={this.createBookClose} submit={this.createBookSubmit} />
        <ConfirmModal open={this.state.confirmModalOpen} close={this.confirmModalClose} confirm={this.handleConfirm} id={this.state.selectedId} name={this.state.selectedName} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
