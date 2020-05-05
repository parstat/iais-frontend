import axios from "axios";

const axiosAuth = axios.create({
  baseURL: " http://localhost:8080/api/v1/security" //authentication server
});

export const authService = {
  login,
  register
};

function login({ username, password }) {
  return new Promise((resolve, reject) => {
    axiosAuth
      .post(
        "/signin?language=ENG",
        {
          username: username,
          password: password
        }
      )
      .then(
        response => {
          console.log(response);
          const data = {
            idToken: response.data.idToken,
            userId: response.data.localId
          };
          resolve(data);
        },
        error => {
          console.log(error.response.data.error.code);
          console.log(error.response.data.error.message);
          const err = {
            code: error.response.data.error.code,
            message: error.response.data.error.message
          };
          reject(err);
        }
      );
  });
}

function register({ username, password }) {
  return new Promise((resolve, reject) => {
    axiosAuth
      .post("/accounts:signUp?key=" + process.env.VUE_APP_DEV_SERVER_API_KEY, {
        username: username,
        password: password
      })
      .then(
        response => {
          //console.log(response);
          const data = {
            idToken: response.data.idToken,
            userId: response.data.localId
          };
          resolve(data);
        },
        error => {
          //console.log(error.response.data.error.code);
          //console.log(error.response.data.error.message);
          const err = {
            code: error.response.data.error.code,
            message: error.response.data.error.message
          };
          reject(err);
        }
      );
  });
}
