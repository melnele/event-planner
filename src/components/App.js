import React, { Component } from 'react';
import { HashRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Events from './Events';
import Login from './Login';
import UpdateEvent from './UpdateEvent';
import PrivateRoute from './PrivateRoute';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <header className="App-header">
            <Switch>
              <PrivateRoute exact path="/" component={Events} />
              <PrivateRoute exact path="/event/:id" component={UpdateEvent} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </header>
        </Router>
      </div>
    );
  }
}

export default App;
