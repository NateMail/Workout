import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Signup from "./components/user/SignUp";
import Signin from "./components/user/SignIn";
import NewBody from "./components/body/NewBody";

const MainRouter = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/body/new/:userId" component={NewBody} />
    </Switch>
  </div>
);

export default MainRouter;
