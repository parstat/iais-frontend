import axios from "axios";
import qs from "querystring";

export const agentService = {
  getAll,
  getById,
  save,
  update,
  delete: _delete
};

function getAll() {
  return new Promise((resolve, reject) => {
    axios.get("/referential/agents?language=en").then(
      response => {
        var agents = response.data;
        console.log(agents);
        resolve(agents);
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

function getById(id) {
  return new Promise((resolve, reject) => {
    axios.get("/referential/agents/" + id + "?language=en").then(
      response => {
        var agent = response.data;
        console.log(agent);
        resolve(agent);
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

function save(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      account: formData.account,
      type: formData.type,
      local_id: formData.localId
    };

    if ("parent" in formData) {
      requestBody.parent = formData.parent;
    }

    axios
      .post(
        "close/referential/agents?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
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

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      account: formData.account,
      type: formData.type,
      parent: formData.parent,
      local_id: formData.localId
    };

    axios
      .patch(
        "close/referential/agents/" + formData.id + "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
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

function _delete(id) {
  return new Promise((resolve, reject) => {
    axios.delete("close/referential/agents/" + id).then(
      response => {
        resolve(response);
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
