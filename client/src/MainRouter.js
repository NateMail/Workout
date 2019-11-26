import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Signup from "./components/user/SignUp";
import Signin from "./components/user/SignIn";
import NewBody from "./components/body/NewBody";
import GetBody from "./components/body/GetBody";
import NewCardio from "./components/cardio/NewCardio";
import GetCardio from "./components/cardio/GetCardio";
import SingleCardio from "./components/cardio/SingleCardio";
import NewLift from "./components/lift/NewLift";
import GetLIft from "./components/lift/GetLift";
import SingleLift from "./components/lift/SingleLift";

const MainRouter = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/body/new/:userId" component={NewBody} />
      <PrivateRoute exact path="/body/by/:userId" component={GetBody} />
      <PrivateRoute exact path="/cardio/new/:userId" component={NewCardio} />
      <PrivateRoute exact path="/cardio/by/:userId" component={GetCardio} />
      <PrivateRoute exact path="/lift/new/:userId" component={NewLift} />
      <PrivateRoute exact path="/lift/by/:userId" component={GetLIft} />
      <Route exact path="/lift/:liftId" component={SingleLift} />
      <Route exact path="/cardio/:cardioId" component={SingleCardio} />
    </Switch>
  </div>
);

export default MainRouter;
