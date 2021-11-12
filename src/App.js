import * as React from 'react';
import { useEffect, useContext } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

// import './App.css';
import Signup from './auth/Signup';
import Signin from './auth/Signin';
import ReviewList from './review/ReviewList';
import EditUser from './user/EditUser';




import { AuthContext } from './contextProvider/AuthContext';



const App = () => {
  const isSignin = localStorage.getItem("isSignin") == 'true'
  // console.log(`isSignin: ${isSignin}`)
  console.log(localStorage.getItem("token"))
  
  const { isAuth, setIsAuth } = useContext(AuthContext)
  
  
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact path={"/"} render={() => (
            isAuth ? <ReviewList /> : <Redirect to="/signin"/>
          )} />
          <Route exact path={"/signup"} render={()=> (
            <Signup/>
          )} />
          <Route exact path={"/signin"} render={() => (
            <Signin/>
          )} />
          
          {/* <Route exact path={"/signup"} render={()=> (
            isSignin ? <Redirect to="/"/> : <Signup/>
          )} /> */}
          {/* <Route exact path={"/signin"} render={() => (
            isAuth ? <Redirect to="/"/> : <Signin/>
          )} /> */}
          <Route exact path={"/editUser"} render={() => (
            <EditUser />
          )} />
        </Switch>
        
      </div>
    </Router>
  );
}

export default App;
