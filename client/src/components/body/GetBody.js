import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getBody } from "./apiBody";
// import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

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
              <h1 style={{ textAlign: "center" }}>{b.addedBy.name}</h1>
              <ul>
                <li>Starting Weight: {b.weight[0]} pounds</li>
                <li>Current Weight: {b.weight[b.weight.length - 1]} pounds</li>
                <li>Height: {b.height} inches</li>
                <li>Age: {b.age}</li>
                <li>Sex: {b.sex}</li>
                <li>TDEE: {b.tdee} calories</li>
                <li>Lose around one pound a week: {b.lose} calories a day</li>
                <li>
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
                  <hr />
                </li>
                <li>
                  Gain around one pound a week:
                  {parseInt(b.tdee) + 250} calories a day
                </li>
              </ul>
              <Link
                className="btn btn-raised btn-info"
                to={`/body/edit/${b._id}`}
              >
                Edit Body
              </Link>
            </div>
          );
        })}
      </div>
    );
  }
}

export default GetBody;
