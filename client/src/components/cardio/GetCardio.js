import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getCardio } from "./apiCardio";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class GetCardio extends Component {
  constructor() {
    super();
    this.state = {
      cardios: [],
      redirectToSignin: false,
      redirectToCreateCardio: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.loadCardio(data._id);
      }
    });
  };

  loadCardio = userId => {
    const token = isAuthenticated().token;
    getCardio(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.cardios.length === 0) {
          this.setState({ redirectToCreateCardio: true });
        }
        this.setState({ cardios: data.cardios });
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, redirectToCreateCardio, cardios } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateCardio) return <Redirect to="/cardio/new/:userId" />;

    return (
      <div>
        {cardios.map(function(c, idx) {
          return (
            <div key={idx}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{c.workoutName}</Card.Title>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Time: {c.time} minutes</ListGroupItem>
                    <ListGroupItem>Distance: {c.distance} miles</ListGroupItem>
                    <ListGroupItem>
                      Pace: 1 mile every {c.pace} minutes
                    </ListGroupItem>
                    <ListGroupItem>
                      Date: {new Date(c.created).toDateString()}
                    </ListGroupItem>
                    <ListGroupItem>
                      <Link to={`/cardio/${c._id}`}>Edit/Delete</Link>
                    </ListGroupItem>
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
