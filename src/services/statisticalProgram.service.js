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
    axios.get("/referential/statistical/programs/" + id + "?language=en").then(
      response => {
        var statisticalProgram = response.data;
        console.log(statisticalProgram);
        resolve(statisticalProgram);
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
          if (response.status == 500) {
            //unauthorized access to close resource
            const err = {
              code: response.status,
              message: response.message
            };
            reject(err);
          }
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
          if (response.status == 500) {
            //unauthorized access to close resource
            const err = {
              code: response.status,
              message: response.message
            };
            reject(err);
          }
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
    axios.delete("close/referential/statistical/programs/" + id).then(
      response => {
        if (response.status == 500) {
          //unauthorized access to close resource
          const err = {
            code: response.status,
            message: response.message
          };
          reject(err);
        }
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
