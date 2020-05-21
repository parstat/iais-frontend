import axios from "axios";
import qs from "querystring";

export const agentService = {
  findAll,
  findById,
  findByType,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axios.get("/referential/agents?language=en").then(
      response => {
        console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axios.get("/referential/agents/" + id + "?language=en").then(
      response => {
        var data = response.data ? response.data : null;
        console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
      }
    );
  });
}

function findByType(type) {
  return new Promise((resolve, reject) => {
    axios.get("/referential/agents/?language=en&type=" + type).then(
      response => {
        var data = response.data ? response.data : [];
        console.log(data);
        resolve(data);
      },
      error => {
        reject(error);
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
          reject(error);
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
          reject(error);
        }
      );
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    axios.delete("close/referential/agents/" + id).then(
      response => {
        //console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}
