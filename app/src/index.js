import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import ChapterListView from './pages/ChapterListView';
import SentenceListView from './pages/SentenceListView';
import { Provider } from 'react-redux';
import Store from './redux/store/store';
class Wrapper extends React.Component {
    render() {
        return (
            <Provider store={Store()}>
                {this.props.children}
            </Provider>
        )
    }
}


ReactDOM.render(<Router>
    <Wrapper>
        <Route exact path="/" component={App} />
        <Route path='/chapter/:bookId' component={ChapterListView} />
        <Route path='/sentence/:chapterId' component={SentenceListView} />
    </Wrapper>
</Router>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
