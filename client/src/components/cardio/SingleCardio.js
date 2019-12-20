import React, { Component } from "react";
import { singleCardio } from "./apiCardio";
import { Link, Redirect } from "react-router-dom";
import { isAuthenticated } from "../auth";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

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
      <Card style={{ textAlign: "center" }}>
        <ListGroup>
          <ListGroupItem className="card-text">
            Time: {cardio.time} minutes
          </ListGroupItem>
          <ListGroupItem className="card-text">
            Distance: {cardio.distance} miles
          </ListGroupItem>
          <ListGroupItem className="card-text">
            Pace: {cardio.pace.toFixed(1)} minutes per mile
          </ListGroupItem>
          <ListGroupItem className="card-text">
            Date: {new Date(cardio.created).toDateString()}
          </ListGroupItem>
        </ListGroup>
        <br />

        <ListGroup className="d-inline-block">
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
            Back to Cardio
          </Link>
        </ListGroup>
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
      <div style={{ background: "#182B3E", height: "100vh" }}>
        <div style={{ textAlign: "center" }} className="container">
          <h2 className="display-2" style={{ color: "white" }}>
            {cardio.workoutName}
          </h2>
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

export default SingleCardio;
