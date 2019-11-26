import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getLift } from "./apiLift";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class GetCardio extends Component {
  constructor() {
    super();
    this.state = {
      lifts: [],
      redirectToSignin: false,
      redirectToCreateLift: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.loadLift(data._id);
      }
    });
  };

  loadLift = userId => {
    const token = isAuthenticated().token;
    getLift(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.lifts.length === 0) {
          this.setState({ redirectToCreateLift: true });
        }
        this.setState({ lifts: data.lifts });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, redirectToCreateLift, lifts } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateLift) return <Redirect to="/lift/new/:userId" />;

    return (
      <div>
        {lifts.map(function(l, idx) {
          return (
            <div key={idx}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{l.workoutName}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>{l.weight} lbs</ListGroupItem>
                    <ListGroupItem>Reps: {l.reps} </ListGroupItem>
                    <ListGroupItem>Sets: {l.sets}</ListGroupItem>
                  </ListGroup>
                </Card.Body>
              </Card>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GetCardio;
