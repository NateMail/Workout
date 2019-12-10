import React, { Component } from "react";
import { singleLift, remove } from "./apiLift";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class DeleteLift extends Component {
  state = {
    lift: "",
    redirectToHome: false,
    redirectToSignIn: false
  };

  componentDidMount = () => {
    const liftId = this.props.match.params.liftId;
    const token = isAuthenticated().token;
    if (!token) {
      this.setState({
        redirectToSignIn: true
      });
    } else {
      singleLift(liftId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            lift: data
          });
        }
      });
    }
  };

  deleteLift = () => {
    const liftId = this.props.match.params.liftId;
    const token = isAuthenticated().token;
    remove(liftId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  renderLift = lift => {
    return (
      <Card>
        <ListGroup>
          <ListGroupItem className="card-text">{lift.weight} lbs</ListGroupItem>
          <ListGroupItem className="card-text">{lift.reps} reps</ListGroupItem>
          <ListGroupItem className="card-text">{lift.sets} sets</ListGroupItem>
          <ListGroupItem className="card-text">
            Date: {new Date(lift.created).toDateString()}
          </ListGroupItem>
        </ListGroup>
        <br />

        <div className="d-inline-block">
          {isAuthenticated().user &&
            isAuthenticated().user._id === lift.addedBy && (
              <>
                <button
                  className="btn btn-raised btn-danger"
                  onClick={this.deleteLift}
                >
                  Delete Workout
                </button>
              </>
            )}
          <Link
            to={`/lift/by/${lift.addedBy}`}
            className="btn btn-raised btn-success ml-5"
          >
            Back to Lift
          </Link>
        </div>
      </Card>
    );
  };

  render() {
    const { lift, redirectToHome, redirectToSignIn } = this.state;

    if (redirectToHome) {
      return <Redirect to={"/"} />;
    } else if (redirectToSignIn) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div style={{ textAlign: "center" }} className="container">
        <h2 className="display-2 mt-5 mb-5">{lift.workoutName}</h2>
        <h4>Are you sure you want to delete?</h4>
        {!lift ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderLift(lift)
        )}
      </div>
    );
  }
}

export default DeleteLift;
