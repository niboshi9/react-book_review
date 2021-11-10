import * as React from 'react';
import { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Redirect, Link } from 'react-router-dom';

// import './App.css';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ReviewList from './review/ReviewList';






const App = () => {
  const isSignin = localStorage.getItem("isSignin") == 'true'
  console.log(`isSignin: ${isSignin}`)
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} render={() => (
            isSignin ? <ReviewList /> : <Redirect to="/signin"/>
          )} />
          <Route exact path={"/signup"} render={()=> (
            isSignin ? <Redirect to="/"/> : <Signup/>
          )} />
          <Route exact path={"/signin"} render={() => (
            isSignin ? <Redirect to="/"/> : <Signin/>
          )} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
