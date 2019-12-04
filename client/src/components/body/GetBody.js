import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getBody } from "./apiBody";
import { Card, ListGroup, ListGroupItem, Button } from "react-bootstrap";

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
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

  // componentWillReceiveProps(props) {
  //   const userId = props.match.params.userId;
  //   this.init(userId);
  // }

  render() {
    const { redirectToSignin, redirectToCreateBody, bodys } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateBody) return <Redirect to="/body/new/:userId" />;

    if (bodys !== undefined && bodys.length !== 0) {
      bodys.forEach(bod => {
        bod.tdee = bod.tdee.toFixed(2);
        bod.bmr = bod.bmr.toFixed(2);
        bod.lose = (bod.tdee - bod.tdee * 0.2).toFixed(2);
      });
    }

    return (
      <div>
        {bodys.map(function(b, idx) {
          return (
            <div key={idx}>
              <Card style={{ width: "18rem" }}>
                <Card.Body>
                  <Card.Title>{b.addedBy.name}</Card.Title>
                  <Card.Text>
                    BMR is the base metabolic rate. Which is the bare minimum to
                    sustain life and ensure longevity. TDEE is an estimate of
                    your daily calorie requirements.
                  </Card.Text>
                  <ListGroup className="list-group-flush">
                    <ListGroupItem>
                      Starting Weight: {b.weight[0]} pounds
                    </ListGroupItem>
                    <ListGroupItem>
                      Current Weight: {b.weight[b.weight.length - 1]} pounds
                    </ListGroupItem>
                    <ListGroupItem>Height: {b.height} inches</ListGroupItem>
                    <ListGroupItem>Age: {b.age}</ListGroupItem>
                    <ListGroupItem>Sex: {b.sex}</ListGroupItem>
                    <ListGroupItem>BMR: {b.bmr} calories</ListGroupItem>
                    <ListGroupItem>TDEE: {b.tdee} calories</ListGroupItem>
                    <ListGroupItem>
                      Lose around one pound a week:
                      <hr />
                      {b.lose} calories a day
                    </ListGroupItem>
                    {
                      <ListGroupItem>
                        <Button>
                          <Link to={`/body/edit/${b._id}`}>Edit Body</Link>
                        </Button>
                      </ListGroupItem>
                    }
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
