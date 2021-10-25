import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import './App.css';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ReviewList from './review/ReviewList';

const App = () => {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} component={ReviewList} />
          <Route exact path={"/signup"} component={Signup} />
          <Route exact path={"/login"} component={Signin} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
