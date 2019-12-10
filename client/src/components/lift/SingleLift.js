import React, { Component } from "react";
import { singleLift } from "./apiLift";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class SingleLift extends Component {
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
                {
                  <Link
                    to={`/lift/edit/${lift._id}`}
                    className="btn btn-raised btn-info"
                    style={{ margin: "5px" }}
                  >
                    Update Workout
                  </Link>
                }
                <Link
                  to={`/lift/remove/${lift._id}`}
                  className="btn btn-raised btn-danger"
                  style={{ margin: "5px" }}
                >
                  Delete Workout
                </Link>
              </>
            )}
          <Link
            to={`/lift/by/${lift.addedBy}`}
            className="btn btn-raised btn-success"
            style={{ margin: "5px" }}
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

export default SingleLift;
