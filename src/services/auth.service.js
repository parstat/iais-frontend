import axios from "axios";
import qs from "querystring";

const axiosAuth = axios.create({
  baseURL: "http://20.188.39.80:8080/api/v1/security" //authentication server
});

export const authService = {
  login,
  register
};

function login({ username, password }) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      username: username,
      password: password,
      language: "ENG"
    };

    axiosAuth.post("/signin", qs.stringify(requestBody), config).then(
      response => {
        console.log(response);
        const token = response.headers["jwt-auth"];
        const data = {
          token: token,
          user: response.data
        };
        resolve(data);
      },
      error => {
        console.log(error.response.data.code);
        const err = {
          code: error.response.status,
          message: error.response.data.code
        };
        reject(err);
      }
    );
  });
}

function register({ username, email, fullname, role, password }) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      username: username,
      email: email,
      name: fullname,
      role: role,
      password: password
    };

    axiosAuth
      .post("/signup?language=ENG", qs.stringify(requestBody), config)
      .then(
        response => {
          console.log(response);
          const token = response.headers["jwt-auth"];
          const data = {
            token: token,
            user: response.data
          };
          resolve(data);
        },
        error => {
          console.log(error.response.data.code);
          const err = {
            code: error.response.status,
            message: error.response.data.code
          };
          reject(err);
        }
      );
  });
}
