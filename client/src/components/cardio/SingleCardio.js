import React, { Component } from "react";
import { singleCardio } from "./apiCardio";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class SingleCardio extends Component {
  state = {
    cardio: "",
    redirectToHome: false,
    redirectToSignIn: false
  };

  componentDidMount = () => {
    const cardioId = this.props.match.params.cardioId;
    const token = isAuthenticated().token;
    if (!token) {
      this.setState({ redirectToSignIn: true });
    } else {
      singleCardio(cardioId, token).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({
            cardio: data
          });
        }
      });
    }
  };

  renderCardio = cardio => {
    return (
      <div className="card-body">
        <ul>
          <li className="card-text">Time: {cardio.time} minutes</li>
          <li className="card-text">Distance: {cardio.distance} miles</li>
          <li className="card-text">
            Pace: {cardio.pace.toFixed(1)} minutes per mile
          </li>
        </ul>
        <br />

        <div className="d-inline-block">
          {isAuthenticated().user &&
            isAuthenticated().user._id === cardio.addedBy && (
              <>
                {
                  <Link
                    to={`/cardio/edit/${cardio._id}`}
                    className="btn btn-raised btn-info"
                    style={{ margin: "5px" }}
                  >
                    Update Workout
                  </Link>
                }
                <Link
                  to={`/cardio/remove/${cardio._id}`}
                  className="btn btn-raised btn-danger"
                  style={{ margin: "5px" }}
                >
                  Delete Workout
                </Link>
              </>
            )}
          <Link
            to={`/cardio/by/${cardio.addedBy}`}
            className="btn btn-raised btn-primary"
            style={{ margin: "5px" }}
          >
            Back to Cardio's
          </Link>
        </div>
      </div>
    );
  };

  render() {
    const { cardio, redirectToHome, redirectToSignIn } = this.state;

    if (redirectToHome) {
      return <Redirect to={"/"} />;
    } else if (redirectToSignIn) {
      return <Redirect to={"/signin"} />;
    }
    return (
      <div className="container">
        <h2 className="display-2 mt-5 mb-5">{cardio.workoutName}</h2>
        {!cardio ? (
          <div className="jumbotron text-center">
            <h2>Loading...</h2>
          </div>
        ) : (
          this.renderCardio(cardio)
        )}
      </div>
    );
  }
}

export default SingleCardio;
