import { axiosIais } from "@/http";
//

export const unitDataStructureService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  delete: _delete,
  addRecord,
  updateRecord,
  removeRecord,
  addComponent,
  updateComponent,
  removeComponent,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitDataStructures").then(
      (response) => {
        resolve(response.data.unitDataStructures);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitDataStructures/" + id).then(
      (response) => {
        var data = response.data.unitDataStructures
          ? response.data.unitDataStructure
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
  var queryString = "?name=" + name ?? "";
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitDataStructures" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.unitDataStructures);
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

    axiosIais
      .post("structural/ClosedUnitDataStructures", formData, config)
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
        "Content-Type": "application/json",
      },
    };
    axiosIais
      .put("structural/ClosedUnitDataStructures/", formData, config)
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
    axiosIais.delete("structural/ClosedUnitDataStructures/" + id).then(
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

function addRecord(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // TODO: Add the correct path!
    axiosIais
      .post("structural/ClosedUnitDataStructures", formData, config)
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

function updateRecord(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    // TODO: Add the correct path!
    axiosIais
      .put("structural/ClosedUnitDataStructures/", formData, config)
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

function removeRecord(dataStructureId, recordId) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "structural/ClosedUnitDataStructures/" +
          dataStructureId +
          "/records/" +
          recordId
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

function addComponent(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    // TODO: Add the correct path!
    axiosIais
      .post("structural/ClosedUnitDataStructures", formData, config)
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

function updateComponent(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axiosIais
      .patch("structural/ClosedUnitDataStructures/components", formData, config)
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

function removeComponent(dataStructureId, componentId) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "structural/ClosedUnitDataStructures/" +
          dataStructureId +
          "/componets/" +
          componentId
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
