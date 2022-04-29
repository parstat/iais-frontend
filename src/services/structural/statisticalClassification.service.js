import { axiosIais } from "@/http";

//import axios from "axios";

export const statisticalClassificationService = {
  findAll,
  findByName,
  findById,
  findFlatById,
  save,
  update,
  delete: _delete,
  addLevel,
  updateLevel,
  removeLevel,
  uploadItems,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenStatisticalClassifications").then(
      (response) => {
        //console.log(response.data.statisticalClassifications);
        resolve(response.data.statisticalClassifications);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenStatisticalClassifications/" + id).then(
      (response) => {
        var data = response.data.statisticalClassification
          ? response.data.statisticalClassification
          : null;
        //console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findFlatById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenStatisticalClassifications/flat/" + id).then(
      (response) => {
        var data = response.data.statisticalClassification
          ? response.data.statisticalClassification
          : null;
        //console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findByName(name) {
  console.log(name);
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/structural/OpenStatisticalClassifications", {
        params: { name: name },
      })
      .then(
        (response) => {
          resolve(response.data.statisticalClassifications);
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
      localId: formData.localId,
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
      link: formData.link,
      version: formData.version ? formData.version : "",
    };

    axiosIais
      .post("/structural/ClosedStatisticalClassifications", requestBody, config)
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
      localId: formData.localId,
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
      link: formData.link,
      version: formData.version ? formData.version : "",
    };

    axiosIais
      .put("/structural/ClosedStatisticalClassifications", requestBody, config)
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

function addLevel(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      statisticalClassificationId: formData.statisticalClassificationId,
      localId: formData.localId,
      name: formData.name,
      description: formData.description,
      levelNumber: formData.levelNumber,
    };

    axiosIais
      .put(
        "/structural/ClosedStatisticalClassifications/levels",
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

function updateLevel(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      statisticalClassificationId: formData.statisticalClassificationId,
      levelId: formData.levelId,
      name: formData.name,
      description: formData.description,
    };

    axiosIais
      .patch(
        "/structural/ClosedStatisticalClassifications/levels",
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

function removeLevel(statisticalClassificationId, levelId) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "/structural/ClosedStatisticalClassifications/" +
          statisticalClassificationId +
          "/levels/" +
          levelId
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

function uploadItems(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      statisticalClassificationId: formData.statisticalClassificationId,
      aggregationType: formData.aggregationType,
      rootItems: formData.rootItems,
    };

    axiosIais
      .put(
        "/structural/ClosedStatisticalClassifications/upload",
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
    axiosIais.delete("/structural/ClosedStatisticalClassifications/" + id).then(
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
