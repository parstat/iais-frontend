import axios from "axios";

const axiosAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1" //authentication server
});

export const authService = {
  login,
  register
};

function login({ email, password }) {
  return new Promise((resolve, reject) => {
    axiosAuth
      .post(
        "/accounts:signInWithPassword?key=" +
          process.env.VUE_APP_DEV_SERVER_API_KEY,
        {
          email: email,
          password: password,
          returnSecureToken: true
        }
      )
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

function register({ email, password }) {
  return new Promise((resolve, reject) => {
    axiosAuth
      .post("/accounts:signUp?key=" + process.env.VUE_APP_DEV_SERVER_API_KEY, {
        email: email,
        password: password,
        returnSecureToken: true
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
