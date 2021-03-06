import React from "react";
import { Route, Switch } from "react-router-dom";
import PrivateRoute from "./components/auth/PrivateRoute";
import Home from "./components/Home";
import Nav from "./components/Nav";
import Signup from "./components/user/SignUp";
import Signin from "./components/user/SignIn";
import NewBody from "./components/body/NewBody";
import GetBody from "./components/body/GetBody";
import SingleBody from "./components/body/SingleBody";
import EditBody from "./components/body/EditBody";
import NewCardio from "./components/cardio/NewCardio";
import GetCardio from "./components/cardio/GetCardio";
import SingleCardio from "./components/cardio/SingleCardio";
import EditCardio from "./components/cardio/EditCardio";
import DeleteCardio from "./components/cardio/DeleteCardio";
import NewLift from "./components/lift/NewLift";
import GetLift from "./components/lift/GetLift";
import SingleLift from "./components/lift/SingleLift";
import EditLift from "./components/lift/EditLift";
import DeleteLift from "./components/lift/DeleteLift";

const MainRouter = () => (
  <div>
    <Nav />
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signin" component={Signin} />
      <PrivateRoute exact path="/body/new/:userId" component={NewBody} />
      <PrivateRoute exact path="/body/by/:userId" component={GetBody} />
      <PrivateRoute exact path="/body/:bodyId" component={SingleBody} />
      <PrivateRoute exact path="/body/edit/:bodyId" component={EditBody} />
      <PrivateRoute exact path="/cardio/new/:userId" component={NewCardio} />
      <PrivateRoute exact path="/cardio/by/:userId" component={GetCardio} />
      <PrivateRoute exact path="/lift/new/:userId" component={NewLift} />
      <PrivateRoute exact path="/lift/by/:userId" component={GetLift} />
      <PrivateRoute exact path="/lift/:liftId" component={SingleLift} />
      <PrivateRoute exact path="/cardio/:cardioId" component={SingleCardio} />
      <PrivateRoute
        exact
        path="/cardio/edit/:cardioId"
        component={EditCardio}
      />
      <PrivateRoute
        exact
        path="/cardio/remove/:cardioId"
        component={DeleteCardio}
      />
      <PrivateRoute exact path="/lift/edit/:liftId" component={EditLift} />
      <PrivateRoute exact path="/lift/remove/:liftId" component={DeleteLift} />
    </Switch>
  </div>
);

export default MainRouter;
