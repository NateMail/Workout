import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getLift } from "./apiLift";
import { Card, ListGroup, ListGroupItem, Row } from "react-bootstrap";

class GetLift extends Component {
  constructor() {
    super();
    this.state = {
      lifts: [],
      redirectToSignin: false,
      redirectToCreateLift: false,
      userId: ""
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
    this.setState({ userId: userId });
    this.init(userId);
  }

  cards = lifts => {
    return lifts.map(function(l, idx) {
      return (
        <div key={idx} name={l.workoutName} style={{ background: "#182B3E" }}>
          <Card style={{ width: "15rem" }}>
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>
                {l.workoutName}
              </Card.Title>
              <ListGroup
                className="list-group-flush"
                style={{ textAlign: "center" }}
              >
                <ListGroupItem>{l.weight} lbs</ListGroupItem>
                <ListGroupItem>Reps: {l.reps} </ListGroupItem>
                <ListGroupItem>Sets: {l.sets}</ListGroupItem>
                <ListGroupItem>
                  Date: {new Date(l.created).toDateString()}
                </ListGroupItem>
                <ListGroupItem>
                  <Link
                    className="btn btn-raised btn-info"
                    to={`/lift/${l._id}`}
                  >
                    Edit/Delete
                  </Link>
                </ListGroupItem>
              </ListGroup>
            </Card.Body>
          </Card>
        </div>
      );
    });
  };

  render() {
    const {
      redirectToSignin,
      redirectToCreateLift,
      lifts,
      userId
    } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateLift) return <Redirect to={`/lift/new/${userId}`} />;

    return (
      <div style={{ background: "#182B3E", height: "100vh" }}>
        <div style={{ background: "#182B3E" }}>
          <Row style={{ padding: "50px" }}>{this.cards(lifts)}</Row>
        </div>
      </div>
    );
  }
}

export default GetLift;
