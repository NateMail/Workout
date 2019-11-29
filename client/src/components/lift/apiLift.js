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

export const singleLift = (liftId, token) => {
  return fetch(`http://localhost:8181/lift/${liftId}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const remove = (liftId, token) => {
  return fetch(`http://localhost:8181/lift/${liftId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    }
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const update = (liftId, token, lift) => {
  return fetch(`http://localhost:8181/lift/edit/${liftId}`, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: lift
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
