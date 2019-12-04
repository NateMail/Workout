import React, { Component } from "react";
import { singleCardio, remove } from "./apiCardio";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";

class DeleteCardio extends Component {
  state = {
    cardio: "",
    redirectToHome: false,
    redirectToSignIn: false
  };

  componentDidMount = () => {
    const cardioId = this.props.match.params.cardioId;
    const token = isAuthenticated().token;
    if (!token) {
      this.setState({
        redirectToSignIn: true
      });
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

  deleteCardio = () => {
    const cardioId = this.props.match.params.cardioId;
    const token = isAuthenticated().token;
    remove(cardioId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        this.setState({ redirectToHome: true });
      }
    });
  };

  renderCardio = cardio => {
    return (
      <div className="card-body">
        <ul>
          <li className="card-text">Time: {cardio.time}</li>
          <li className="card-text">{cardio.distance} Miles</li>
          <li className="card-text">{cardio.pace} pace</li>
          <li className="card-text">
            {new Date(cardio.created).toDateString()}
          </li>
        </ul>
        <br />

        <div className="d-inline-block">
          {isAuthenticated().user &&
            isAuthenticated().user._id === cardio.addedBy && (
              <>
                <button
                  className="btn btn-raised btn-danger"
                  onClick={this.deleteCardio}
                >
                  Delete Workout
                </button>
              </>
            )}
          <Link
            to={`/cardio/by/${cardio.addedBy}`}
            className="btn btn-raised btn-primary ml-5"
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

export default DeleteCardio;
