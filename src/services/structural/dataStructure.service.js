import { axiosIais } from "@/http";
//

export const dataStructureService = {
  findAll,
  findById,
  findByName,
  findByType,
  findByNameAndType,
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
    axiosIais.get("/structural/OpenDataStructures").then(
      (response) => {
        resolve(response.data.dataStructures);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenDataStructures/" + id).then(
      (response) => {
        var data = response.data.dataStructure
          ? response.data.dataStructure
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
    axiosIais.get("/structural/OpenDataStructures" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.dataStructures);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findByType(type) {
  var queryString = "?type=" + type ?? "";
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenDataStructures" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.dataStructures);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findByNameAndType(formData) {
  var queryString = "?name=" + formData.name ?? "";
  queryString += "&type=" + formData.type ?? "";
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenDataStructures" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.dataStructures);
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

    axiosIais.post("structural/ClosedDataStructures", formData, config).then(
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
    axiosIais.put("structural/ClosedDataStructures/", formData, config).then(
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
    axiosIais.delete("structural/ClosedDataStructures/" + id).then(
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
    axiosIais.post("structural/ClosedDataStructures", formData, config).then(
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
    axiosIais.put("structural/ClosedDataStructures/", formData, config).then(
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

function removeRecord(id) {
  return new Promise((resolve, reject) => {
    // TODO: Add the correct path!
    axiosIais.delete("structural/ClosedDataStructures/" + id).then(
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
    axiosIais.post("structural/ClosedDataStructures", formData, config).then(
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
    // TODO: Add the correct path!
    axiosIais.put("structural/ClosedDataStructures/", formData, config).then(
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

function removeComponent(id) {
  return new Promise((resolve, reject) => {
    // TODO: Add the correct path!
    axiosIais.delete("structural/ClosedDataStructures/" + id).then(
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
