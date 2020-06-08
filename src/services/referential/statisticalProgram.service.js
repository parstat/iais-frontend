import { axiosIais } from "@/http";
import qs from "querystring";

export const statisticalProgramService = {
  findAll,
  findById,
  save,
  update,
  updateLegislativeReference,
  updateOwner,
  updateMaintainer,
  updateContact,
  deleteLegislativeReference,
  delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/statistical/programs?language=en").then(
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
    axiosIais
      .get("/referential/statistical/programs/" + id + "?language=en")
      .then(
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

    const legislativeReferences = formData.legislativeReferences;

    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.localId +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //save legislative references
          for (var legislativeReference of legislativeReferences) {
            updateLegislativeReference({
              id: response.data.id,
              legislative: legislativeReference.id
            });
          }
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

    const agents = {
      owner: formData.owner,
      maintainer: formData.maintainer,
      contact: formData.contact
    };

    const updatedReferences = formData.legislativeReferences
      ? formData.legislativeReferences
      : [];

    axiosIais
      .patch(
        "close/referential/statistical/programs/" +
          formData.id +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          const statisticalProgram = response.data;
          //console.log(response.data);
          if (agents.owner.id != statisticalProgram.owner.id) {
            updateOwner({
              id: statisticalProgram.id,
              owner: agents.owner.id
            });
          }
          if (agents.maintainer.id != statisticalProgram.maintainer.id) {
            updateMaintainer({
              id: statisticalProgram.id,
              maintainer: agents.maintainer.id
            });
          }
          if (agents.contact.id != statisticalProgram.contact.id) {
            updateContact({
              id: statisticalProgram.id,
              contact: agents.contact.id
            });
          }

          var originalReferences = statisticalProgram.legislativeReferences
            ? statisticalProgram.legislativeReferences
            : [];

          for (var i = 0; i < originalReferences.length; i++) {
            for (var j = 0; j < updatedReferences.length; j++) {
              if (originalReferences[i] == updatedReferences[j]) {
                originalReferences.splice(i, 1);
                updatedReferences.splice(j, 1);
              }
            }
          }

          for (var k = 0; k < originalReferences.length; k++) {
            deleteLegislativeReference({
              id: statisticalProgram.id,
              legislative: originalReferences[k].id
            });
          }

          for (var l = 0; l < updatedReferences.length; l++) {
            updateLegislativeReference({
              id: statisticalProgram.id,
              legislative: updatedReferences[l].id
            });
          }

          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function updateLegislativeReference(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/statistical/programs/" +
          formData.id +
          "/legislative/" +
          formData.legislative +
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

function updateOwner(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
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
    axiosIais
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
    axiosIais
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
    axiosIais.delete("close/referential/statistical/programs/" + id).then(
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

function deleteLegislativeReference(formData) {
  console.log("deleting: " + formData.id + ", " + formData.legislative);
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/statistical/programs/" +
          formData.id +
          "/legislative/" +
          formData.legislative +
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
