import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getBody } from "./apiBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faDumbbell } from "@fortawesome/free-solid-svg-icons";
import { Table } from "react-bootstrap";

class GetBody extends Component {
  constructor() {
    super();
    this.state = {
      bodys: [],
      redirectToSignin: false,
      redirectToCreateBody: false,
      userId: ""
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
    this.setState({ userId: userId });
    this.init(userId);
  }

  render() {
    const {
      redirectToSignin,
      redirectToCreateBody,
      bodys,
      userId
    } = this.state;
    if (redirectToSignin) return <Redirect to="/signin" />;

    if (redirectToCreateBody) return <Redirect to={`/body/new/${userId}`} />;

    if (bodys !== undefined && bodys.length !== 0) {
      bodys.forEach(bod => {
        bod.tdee = bod.tdee.toFixed(0);
        bod.bmr = bod.bmr.toFixed(0);
        bod.lose = (bod.tdee - bod.tdee * 0.2).toFixed(0);
        bod.protein = ((bod.tdee * 0.3) / 4).toFixed(0);
        bod.fats = ((bod.tdee * 0.3) / 9).toFixed(0);
        bod.carbs = ((bod.tdee * 0.4) / 4).toFixed(0);
        bod.gain = (parseInt(bod.tdee * 0.2) + parseInt(bod.tdee)).toFixed(0);
        bod.loseProtein = ((bod.lose * 0.3) / 4).toFixed(0);
        bod.loseFats = ((bod.lose * 0.3) / 9).toFixed(0);
        bod.loseCarbs = ((bod.lose * 0.4) / 4).toFixed(0);
        bod.gainProtein = ((bod.gain * 0.3) / 4).toFixed(0);
        bod.gainFats = ((bod.gain * 0.3) / 9).toFixed(0);
        bod.gainCarbs = ((bod.gain * 0.4) / 4).toFixed(0);
      });
    }

    return (
      <div>
        <div
          style={{
            position: "absolute",
            right: "2%"
          }}
        >
          <Link
            to={`/cardio/new/${this.state.userId}`}
            style={{
              color: "green",
              margin: "15px"
            }}
          >
            <FontAwesomeIcon size="lg" icon={faRunning} />+
          </Link>
          <Link
            to={`/lift/new/${this.state.userId}`}
            style={{
              color: "green",
              margin: "15px"
            }}
          >
            <FontAwesomeIcon size="lg" icon={faDumbbell} />+
          </Link>
        </div>
        {bodys.map(function(b, idx) {
          return (
            <div key={idx}>
              <h1 style={{ textAlign: "center" }}>{b.addedBy.name}</h1>
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Current Weight</th>
                    <th>Height</th>
                    <th>Age</th>
                    <th>Sex</th>
                    <th>TDEE</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th>{b.weight[b.weight.length - 1]} pounds</th>
                    <th>{b.height} inches</th>
                    <th>{b.age} years old</th>
                    <th>{b.sex}</th>
                    <th>{b.tdee} calories</th>
                  </tr>
                </tbody>
              </Table>
              <p>
                TDEE is your Total Daily Energy Expenditure. This is based off
                your Base Metabolic Rate: {b.bmr} cals. This is the base number
                at which your body uses energy when you are resting. All of this
                is based on your weight, height, age, sex, and activity level.
                As you lose weight or gain weight these numbers will change.
              </p>
              <h4>Your starting weight was: {b.weight[0]} pounds</h4>
              <h4>
                Your current weight is: {b.weight[b.weight.length - 1]} pounds
              </h4>
              <h4>
                For a differnce of:{" "}
                {b.weight[b.weight.length - 1] - b.weight[0]} pounds
              </h4>
              <Table striped bordered hover variant="light">
                <thead>
                  <tr>
                    <th>Macros</th>
                    <th>Calories</th>
                    <th>Protein</th>
                    <th>Fats</th>
                    <th>Carbs</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Losing 1 pound a week</td>
                    <td>{b.lose} cals</td>
                    <td>{b.loseProtein}g</td>
                    <td>{b.loseFats}g</td>
                    <td>{b.loseCarbs}g</td>
                  </tr>
                  <tr>
                    <td>Maintain Current Weight</td>
                    <td>{b.tdee} cals</td>
                    <td>{b.protein}g</td>
                    <td>{b.fats}g</td>
                    <td>{b.carbs}g</td>
                  </tr>
                  <tr>
                    <td>Gain Muscle</td>
                    <td>{b.gain} cals</td>
                    <td>{b.gainProtein}g</td>
                    <td>{b.gainFats}g</td>
                    <td>{b.gainCarbs}g</td>
                  </tr>
                </tbody>
              </Table>
              <Link
                className="btn btn-lg btn-raised btn-primary"
                style={{ margin: "0px 40%" }}
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
