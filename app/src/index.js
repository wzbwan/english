import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import ChapterListView from './pages/ChapterListView';
import SentenceListView from './pages/SentenceListView';

class Wrapper extends React.Component {
    render() {
        return (
            <div>
                {this.props.children}
            </div>
        )

    }
}

const B = () => (
    <div>
        <Link to='/a'>组件A</Link>
        <h1>B component</h1>
    </div>
)

const A = () => (
    <div>
        <Link to='/b'>组件B</Link>
        <Link to='/'>Home</Link>
        <h1>A component</h1>
    </div>
)


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
