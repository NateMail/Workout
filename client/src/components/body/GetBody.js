import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import { getBody } from "./apiBody";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRunning, faDumbbell } from "@fortawesome/free-solid-svg-icons";

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
        bod.tdee = bod.tdee.toFixed(2);
        bod.bmr = bod.bmr.toFixed(2);
        bod.lose = (bod.tdee - bod.tdee * 0.2).toFixed(2);
        bod.protein = bod.weight[bod.weight.length - 1];
        bod.fats = bod.protein * 0.5;
        bod.carbs = bod.protein * 4 + bod.fats * 9;
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
                  Protein: {b.protein}g
                  <hr />
                  Fats: {b.fats}g
                  <hr />
                  Carbs: {(Math.abs(b.lose - b.carbs) / 4).toFixed(0)}
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
        <FontAwesomeIcon size="lg" icon={faRunning} />
        <FontAwesomeIcon size="lg" icon={faDumbbell} />
      </div>
    );
  }
}

export default GetBody;
