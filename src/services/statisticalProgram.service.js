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
        console.log("[ERROR - status] " + error.response.status);
        console.log("[ERROR - message] " + error.response.data.error);
        const err = {
          status: error.response.status,
          message: error.response.data.error
        };
        reject(err);
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
        console.log("[ERROR - status] " + error.response.status);
        console.log("[ERROR - message] " + error.response.data.error);
        const err = {
          status: error.response.status,
          message: error.response.data.error
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
        "close/referential/statistical/programs/" + formData.localId + "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
        },
        error => {
          console.log("[ERROR - status] " + error.response.status);
          console.log("[ERROR - message] " + error.response.data.error);
          const err = {
            status: error.response.status,
            message: error.response.data.error
          };
          reject(err);
        }
      );
  });
}

function update(token, formData) {
  return new Promise((resolve, reject) => {
    let statisticalProgram = {
      [formData.id]: {
        name: formData.name,
        acronym: formData.acronym,
        responsibleName: formData.responsibleName,
        responsibleDivision: formData.responsibleDivision
      }
    };
    axios
      .patch("/statisticalPrograms.json" + "?auth=" + token, statisticalProgram)
      .then(
        response => {
          var statisticalProgram = null;
          for (const [key, value] of Object.entries(response.data)) {
            //console.log(key, value);
            statisticalProgram = {
              id: key,
              name: value.name,
              acronym: value.acronym,
              responsibleName: value.responsibleName,
              responsibleDivision: value.responsibleDivision
            };
          }
          //console.log(statisticalProgram);
          resolve(statisticalProgram);
        },
        error => {
          console.log("[ERROR - status] " + error.response.status);
          console.log("[ERROR - message] " + error.response.data.error);
          const err = {
            status: error.response.status,
            message: error.response.data.error
          };
          reject(err);
        }
      );
  });
}

function _delete(token, formData) {
  return new Promise((resolve, reject) => {
    axios
      .delete(
        "/statisticalPrograms/" + formData.id + ".json" + "?auth=" + token
      )
      .then(
        response => {
          resolve(response);
        },
        error => {
          console.log("[ERROR - status] " + error.response.status);
          console.log("[ERROR - message] " + error.response.data.error);
          const err = {
            status: error.response.status,
            message: error.response.data.error
          };
          reject(err);
        }
      );
  });
}
