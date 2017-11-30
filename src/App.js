import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware  } from 'redux';
import promiseMiddleware from 'redux-promise-middleware';

import reducer from './reducers/index';
import StoryList from './containers/StoryList';
import CommenterList from './containers/CommenterList';
import './App.css';

const store = createStore(reducer, applyMiddleware(promiseMiddleware()));

class App extends Component {
 render() {
    return (
      <Provider store={store}>
        <div className="content">
          <h2>Hacker News</h2>
          <div className="list-wrapper">
            <StoryList />
            <CommenterList />
          </div>
        </div>
      </Provider>
    );
  }
}

export default App;