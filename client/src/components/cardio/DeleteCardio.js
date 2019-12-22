import React, { Component } from "react";
import { singleCardio, remove } from "./apiCardio";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

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
      <Card style={{ textAlign: "center" }} className="card-body">
        <ListGroup>
          <ListGroupItem className="card-text">
            Time: {cardio.time}
          </ListGroupItem>
          <ListGroupItem className="card-text">
            {cardio.distance} Miles
          </ListGroupItem>
          <ListGroupItem className="card-text">
            {cardio.pace} pace
          </ListGroupItem>
          <ListGroupItem className="card-text">
            {new Date(cardio.created).toDateString()}
          </ListGroupItem>
        </ListGroup>
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
            Back to Cardio
          </Link>
        </div>
      </Card>
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
      <div style={{ background: "#172B3E" }}>
        <div
          style={{
            textAlign: "center",
            background: "#172B3E",
            height: "100vh",
            width: "100vw"
          }}
          className="container"
        >
          <h2 style={{ color: "white" }}>{cardio.workoutName}</h2>
          <h4 style={{ color: "white" }}>Are you sure you want to delete?</h4>
          {!cardio ? (
            <div className="jumbotron text-center">
              <h2>Loading...</h2>
            </div>
          ) : (
            this.renderCardio(cardio)
          )}
        </div>
      </div>
    );
  }
}

export default DeleteCardio;
