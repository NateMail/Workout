import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
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
      }
    });
  };

  componentDidMount() {
    const userId = this.props.match.params.userId;
    this.init(userId);
  }

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
                    TDEE is an estimate of your daily calorie requirements to
                    maintain your current weight.
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
                    <ListGroupItem>TDEE: {b.tdee} calories</ListGroupItem>
                    <ListGroupItem>
                      Lose around one pound a week:
                      <hr />
                      {b.lose} calories a day
                    </ListGroupItem>
                    <ListGroupItem>
                      Losing around pound a Week Macros:
                      <hr />
                      Protein: {b.weight[b.weight.length - 1]}g
                      <hr />
                      Fats: {b.weight[b.weight.length - 1] * 0.5}g
                      <hr />
                      Carbs:{" "}
                      {(
                        (b.lose -
                          b.weight[b.weight.length - 1] * 4 -
                          b.weight[b.weight.length - 1] * 0.5 * 9) /
                        4
                      ).toFixed(0)}
                      g
                    </ListGroupItem>
                    <ListGroupItem>
                      Gain around one pound a week:
                      <hr />
                      {parseInt(b.tdee) + 250} calories a day
                    </ListGroupItem>
                    {
                      <ListGroupItem>
                        <Link
                          className="btn btn-raised btn-info"
                          to={`/body/edit/${b._id}`}
                        >
                          Edit Body
                        </Link>
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
