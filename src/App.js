import * as React from 'react';
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

import { ContextProvider } from './contextProvider/Context';

// import './App.css';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ReviewList from './review/ReviewList';
import EditUser from './user/EditUser';
import CreateNewReview from './review/CreateNewReview';
import Detail from './review/Detail';
import EditReview from './review/EditReview';

import Test from './review/test';


const App = () => {
  const getIsSignin = () => {
    return localStorage.getItem("isSignin") == 'true'
  }

  return (
    <ContextProvider className="App">
      <Router>
        <div className="App">
          <Switch>
            <Route exact path={"/"} render={() => (
              getIsSignin() ? <ReviewList /> : <Redirect to="/signin"/>
            )} />
            
            <Route exact path={"/signup"} render={()=> (
              getIsSignin() ? <Redirect to="/"/> : <Signup/>
            )} />
              
            <Route exact path={"/signin"} render={() => (
              getIsSignin() ? <Redirect to="/"/> : <Signin/>
            )} />
              
            <Route exact path={"/editUser"} render={() => (
              <EditUser />
            )} />
            
            <Route exact path={"/new"} render={() => (
              <CreateNewReview />
            )} />
            
            <Route exact path={"/detail/:id"} render={() => (
              <Detail/>
            )} />
            
            <Route exact path={"/edit/:id"} render={() => (
              <EditReview />
            )} />
            
            {/* <Route exact path={"/test"} render={() => (
              getIsSignin() ? <Redirect to="/"/> : <Test/>
            )} /> */}
              
              
              {/* <Route exact path={"/signup"} render={()=> (
                <Signup/>
              )} />
              <Route exact path={"/signin"} render={() => (
                <Signin/>
              )} /> */}
          </Switch>
          
        </div>
      </Router>
    </ContextProvider>
  );
}

export default App;
