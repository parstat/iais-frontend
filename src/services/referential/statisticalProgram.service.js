import { axiosIais } from "@/http";

export const statisticalProgramService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  addLegislativeReference,
  removeLegislativeReference,
  addStatisticalStandard,
  removeStatisticalStandard,
  updateOwner,
  updateMaintainer,
  updateContact,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/statistical/programs").then(
      (response) => {
        var data = response.data ? response.data : [];
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/statistical/programs/" + id).then(
      (response) => {
        var data = response.data ? response.data : {};
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/statistical/programs/?name=" + search).then(
      (response) => {
        //console.log(response.data);
        resolve(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function save(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
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
      dateEnded: "2018-08-10T10:00:00",
    };

    axiosIais
      .put(
        "close/referential/statistical/programs/" + formData.localId,
        new URLSearchParams(requestBody).toString(),
        config
      )
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      acronym: formData.acronym,
      description: formData.description,
      status: "CURRENT",
      budget: 0,
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00",
    };

    axiosIais
      .patch(
        "close/referential/statistical/programs/" + formData.id,
        new URLSearchParams(requestBody).toString(),
        config
      )
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function addLegislativeReference(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/legislative/" +
          formData.legislative
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function removeLegislativeReference(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/statistical/programs/" +
          formData.id +
          "/legislative/" +
          formData.legislative
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

//Statistical standard
function addStatisticalStandard(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/standards/" +
          formData.standard
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function removeStatisticalStandard(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/statistical/programs/" +
          formData.id +
          "/standards/" +
          formData.standard
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function updateOwner(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/owner/" +
          formData.owner
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function updateContact(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/contact/" +
          formData.contact
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function updateMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/maintainer/" +
          formData.maintainer
      )
      .then(
        (response) => {
          //console.log(response.data);
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosIais.delete("close/referential/statistical/programs/" + id).then(
      (response) => {
        //console.log(response.data);
        resolve(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
