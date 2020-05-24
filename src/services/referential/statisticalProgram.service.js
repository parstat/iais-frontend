import axios from "axios";
import qs from "querystring";

export const statisticalProgramService = {
  findAll,
  findById,
  save,
  update,
  updateOwner,
  updateMaintainer,
  updateContact,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axios.get("/referential/statistical/programs?language=en").then(
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

function findById(id) {
  return new Promise((resolve, reject) => {
    axios.get("/referential/statistical/programs/" + id + "?language=en").then(
      response => {
        var data = response.data ? response.data : {};
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
      acronym: formData.acronym,
      description: formData.description,
      owner: formData.owner,
      maintainer: formData.maintainer,
      contact: formData.contact,
      status: "CURRENT",
      budget: 0,
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
      budget: 0,
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

function updateOwner(formData) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/owner/" +
          formData.owner +
          "?language=en"
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

function updateContact(formData) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/contact/" +
          formData.contact +
          "?language=en"
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

function updateMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axios
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/maintainer/" +
          formData.maintainer +
          "?language=en"
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
        //console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}
