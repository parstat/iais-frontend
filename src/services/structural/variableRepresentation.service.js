import { axiosIais } from "@/http";
//

export const variableRepresentationService = {
  findAll,
  findById,
  //save,
  //update,
  //delete: _delete
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenVariables").then(
      (response) => {
        //console.log(response.data.variables);
        resolve(response.data.variables);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenRepresentationVariable/" + id).then(
      (response) => {
        var data = response.data.representedVariable
          ? response.data.representedVariable
          : null;
        //console.log(data);
        resolve(data);
        //console.log(response.data.variable);
        //resolve(response.data.variable);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
