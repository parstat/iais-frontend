import { axiosIais } from "@/http";
//

export const variableRepresentationService = {
  findAll,
  findById,
  addRepresentation,
  deleteRepresentation,
  updateRepresentation,
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

function addRepresentation(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosIais
      .post(
        "/structural/ClosedRepresentationVariable",
        JSON.stringify(formData),
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

function updateRepresentation(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosIais
      .put(
        "/structural/ClosedRepresentationVariable",
        JSON.stringify(formData),
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

function deleteRepresentation(id) {
  return new Promise((resolve, reject) => {
    axiosIais.delete("/structural/ClosedRepresentationVariable/" + id).then(
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
