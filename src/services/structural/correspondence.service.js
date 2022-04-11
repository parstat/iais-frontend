import { axiosIais } from "@/http";

//import axios from "axios";

export const correspondenceService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
  addMapping,
  removeMapping,
  uploadMapping,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenCorrespondence").then(
      (response) => {
        console.log(response.data.correspondences);
        resolve(response.data.correspondences);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenCorrespondence/" + id).then(
      (response) => {
        var data = response.data.correspondence
          ? response.data.correspondence
          : null;
        console.log(data);
        resolve(data);
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
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      sourceId: formData.sourceId,
      targetId: formData.targetId,
      //definition: formData.definition,
      relationship: formData.relationship,
    };

    axiosIais
      .post("/structural/ClosedCorrespondence", requestBody, config)
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

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      id: formData.id,
      sourceId: formData.sourceId,
      targetId: formData.targetId,
      //definition: formData.definition,
      relationship: formData.relationship,
    };

    axiosIais
      .patch(
        "/structural/ClosedCorrespondence/" + formData.id,
        requestBody,
        config
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
    axiosIais.delete("/structural/ClosedCorrespondence/" + id).then(
      (response) => {
        resolve(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function addMapping(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      correspondenceId: formData.correspondenceId,
      sourceId: formData.sourceId,
      targetId: formData.targetId,
    };

    axiosIais
      .put("/structural/ClosedCorrespondence/mapping/add", requestBody, config)
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

function removeMapping(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "/structural/ClosedCorrespondence/" +
          formData.correspondenceId +
          "/mapping/" +
          formData.mappingId
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

function uploadMapping(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosIais
      .put("/structural/ClosedCorrespondence/mapping/upload", formData, config)
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
