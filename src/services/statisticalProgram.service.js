import axios from "axios";
import qs from "querystring";

export const statisticalProgramService = {
  getAll,
  getById,
  save,
  update,
  delete: _delete
};

function getAll() {
  return new Promise((resolve, reject) => {
    axios.get("/referential/statistical/programs?language=en").then(
      response => {
        var statisticalPrograms = response.data;
        console.log(statisticalPrograms);
        resolve(statisticalPrograms);
      },
      error => {
        reject(error);
      }
    );
  });
}

function getById(id) {
  return new Promise((resolve, reject) => {
    axios.get("/referential/statistical/programs/" + id + "?language=en").then(
      response => {
        var statisticalProgram = response.data;
        console.log(statisticalProgram);
        resolve(statisticalProgram);
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
      acronym: formData.acronym,
      description: formData.description,
      status: "CURRENT",
      budget: 2000,
      funding: "NBS",
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00"
    };

    axios
      .put(
        "close/referential/statistical/programs/" +
          formData.localId +
          "?language=en",
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
      acronym: formData.acronym,
      description: formData.description,
      status: "CURRENT",
      budget: 2000,
      funding: "NBS",
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00"
    };

    axios
      .patch(
        "close/referential/statistical/programs/" +
          formData.id +
          "?language=en",
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
    axios.delete("close/referential/statistical/programs/" + id).then(
      response => {
        resolve(response);
      },
      error => {
        reject(error);
      }
    );
  });
}
