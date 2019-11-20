export const create = (userId, token, userBody) => {
  return fetch(`http://localhost:8181/body/new/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`
    },
    body: userBody
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getBody = (userId, token) => {
  return fetch(`http://localhost:8181/body/by/${userId}`, {
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
