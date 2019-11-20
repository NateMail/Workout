import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getBody } from "./apiBody";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

class GetBody extends Component {
  constructor() {
    super();
    this.state = {
      bodys: [],
      redirectToSignin: false,
      redirectToCreateBody: false
    };
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.loadBody(data._id);
      }
    });
  };

  loadBody = userId => {
    const token = isAuthenticated().token;
    getBody(userId, token).then(data => {
      if (data.error) {
        console.log(data.error);
      } else {
        if (data.body.length === 0) {
          this.setState({ redirectToCreateBody: true });
        }
        this.setState({ bodys: data.body });
        console.log("This is bodys", this.state.bodys);
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  componentWillReceiveProps(props) {
    const userId = props.match.params.userId;
    this.init(userId);
  }

  render() {
    const { redirectToSignin, redirectToCreateBody, bodys } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateBody) return <Redirect to="/body/new/:userId" />;

    return (
      <div>
        {bodys.map(function(b, idx) {
          return (
            <div key={idx}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{b.addedBy.name}</Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make
                    up the bulk of the card's content.
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>Weight: {b.weight}</ListGroupItem>
                    <ListGroupItem>Height: {b.height}</ListGroupItem>
                    <ListGroupItem>Age: {b.age}</ListGroupItem>
                    <ListGroupItem>Sex: {b.sex}</ListGroupItem>
                    <ListGroupItem>BMR: {b.bmr}</ListGroupItem>
                    <ListGroupItem>TDEE: {b.tdee}</ListGroupItem>
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

export default GetBody;
