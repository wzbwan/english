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
import fetchData from './tools/fetchData';
import './App.css';
import CreateNewBookModal from './components/CreateNewBookModal';


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
              <Link key={index} style={{ textDecoration: 'none' }} to={'/chapter/'+book._id}>
              <ListItem>
                <Avatar>
                  {index}
                </Avatar>
                <ListItemText primary={book.name} secondary="Jan 9, 2014" />
              </ListItem>
              </Link>
            )
          })}
        </List>
        <CreateNewBookModal open={this.state.createBookModalOpen} close={this.createBookClose} submit={this.createBookSubmit} />
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);
