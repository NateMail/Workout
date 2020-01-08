export const create = (userId, token, userCardio) => {
  return fetch(
    `https://mighty-temple-74779.herokuapp.com/cardio/new/${userId}`,
    {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: userCardio
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const getCardio = (userId, token) => {
  return fetch(
    `https://mighty-temple-74779.herokuapp.com/cardio/by/${userId}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(err => console.log(err));
};

export const singleCardio = (cardioId, token) => {
  return fetch(`https://mighty-temple-74779.herokuapp.com/cardio/${cardioId}`, {
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

export const remove = (cardioId, token) => {
  return fetch(
    `https://mighty-temple-74779.herokuapp.com/cardio/remove/${cardioId}`,
    {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

export const update = (cardioId, token, cardio) => {
  return fetch(
    `https://mighty-temple-74779.herokuapp.com/cardio/edit/${cardioId}`,
    {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`
      },
      body: cardio
    }
  )
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};
