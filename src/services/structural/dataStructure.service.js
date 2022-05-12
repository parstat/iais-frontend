import { axiosIais } from "@/http";
//

export const dataStructureService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  delete: _delete,
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

    const requestBody = {
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
      localId: formData.localId,
      version: formData.version ? formData.version : "",
    };

    axiosIais
      .put(
        "structural/ClosedDataStructures/" + formData.id,
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
