import { axiosAuth } from "@/http";

export const authService = {
  authenticate,
  login,
  logout,
  register
};

function authenticate() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axiosAuth.post("/authenticate", config).then(
      response => {
        //console.log(response);
        const data = {
          token: response.headers["jwt-auth"],
          status: response.status
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

    axiosAuth
      .post("/signin", new URLSearchParams(requestBody).toString(), config)
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

function logout() {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    axiosAuth.post("/signout", config).then(
      response => {
        //console.log(response);
        const data = {
          status: response.status
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

function register({ username, email, fullname, password }) {
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
      role: "USER",
      password: password
    };

    axiosAuth
      .post(
        "/signup?language=ENG",
        new URLSearchParams(requestBody).toString(),
        config
      )
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
