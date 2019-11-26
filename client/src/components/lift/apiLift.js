export const create = (userId, token, userLift) => {
  console.log(userLift);
  return fetch(`http://localhost:8181/lift/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userLift
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getLift = (userId, token) => {
  return fetch(`http://localhost:8181/lift/by/${userId}`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};
