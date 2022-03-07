import { axiosIais } from "@/http";
//

export const unitTypeService = {
  findAll,
  findById,
  save,
  //update,
  //delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitTypes").then(
      (response) => {
        //console.log(response.data.unitTypes);
        resolve(response.data.unitTypes);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenUnitTypes/" + id).then(
      (response) => {
        var data = response.data.unitType ? response.data.unitType : null;
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

    axiosIais.post("structural/ClosedUnitTypes", requestBody, config).then(
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
