import { axiosIais } from "@/http";
//

export const unitDataSetService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitDataSets").then(
      (response) => {
        resolve(response.data.unitDataSets);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitDataSets/" + id).then(
      (response) => {
        var data = response.data.unitDataSet ? response.data.unitDataSet : null;
        //console.log(data);
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
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
      localId: formData.localId,
    };

    axiosIais.post("structural/ClosedUnitDataSets", requestBody, config).then(
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
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
      localId: formData.localId,
      version: formData.version ? formData.version : "",
    };

    axiosIais
      .put("structural/ClosedUnitDataSets/" + formData.id, requestBody, config)
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
    axiosIais.delete("structural/ClosedUnitDataSets/" + id).then(
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
