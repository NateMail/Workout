import React, { Component } from "react";
import { singleLift, remove } from "./apiLift";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

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

  deletConfirmed = () => {
    let answer = window.confirm("Are you sure you want to delete this lift?");
    if (answer) {
      this.deleteLift();
    }
  };

  renderLift = lift => {
    return (
      <div className="card-body">
        <ul>
          <li className="card-text">{lift.weight} lbs</li>
          <li className="card-text">{lift.reps} reps</li>
          <li className="card-text">{lift.sets} sets</li>
          <li className="card-text">{new Date(lift.created).toDateString()}</li>
        </ul>
        <br />

        <div className="d-inline-block">
          <Link
            to={`/lift/by/${lift.addedBy}`}
            className="btn btn-raised btn-primary btn-sm mr-5"
          >
            Back to Lift
          </Link>

          {isAuthenticated().user &&
            isAuthenticated().user._id === lift.addedBy && (
              <>
                {
                  <Link
                    to={`/lift/edit/${lift._id}`}
                    className="btn btn-raised btn-warning btn-sm mr-5"
                  >
                    Update Workout
                  </Link>
                }
                <button
                  className="btn btn-raised btn-danger"
                  onClick={this.deletConfirmed}
                >
                  Delete Workout
                </button>
              </>
            )}
        </div>
      </div>
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
      <div className="container">
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
