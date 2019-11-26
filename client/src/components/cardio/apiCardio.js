export const create = (userId, token, userCardio) => {
  return fetch(`http://localhost:8181/cardio/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userCardio
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getCardio = (userId, token) => {
  return fetch(`http://localhost:8181/cardio/by/${userId}`, {
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
