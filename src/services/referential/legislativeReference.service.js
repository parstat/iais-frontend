import axios from "axios";
import qs from "querystring";

export const legislativeReferenceService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axios.get("/referential/legislative/references?language=en").then(
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
    axios
      .get("/referential/legislative/references/" + id + "?language=en")
      .then(
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
      type: formData.type,
      local_id: formData.localId
    };

    axios
      .post(
        "close/referential/legislative/references?language=en",
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
      type: formData.type,
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
