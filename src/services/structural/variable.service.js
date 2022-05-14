import { axiosIais } from "@/http";

//import axios from "axios";

export const variableService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  delete: _delete,
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
    axiosIais.get("/structural/OpenVariables/" + id).then(
      (response) => {
        var data = response.data.variable ? response.data.variable : null;
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

function findByName(name) {
  var queryString = "?name=" + name ?? "";
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenVariables" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.variables);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function save(variable) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    axiosIais
      .post("/structural/ClosedVariables", JSON.stringify(variable), config)
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
      name: formData.name,
      description: formData.description,
      definition: formData.definition,
    };

    axiosIais
      .put("/structural/ClosedVariables/", JSON.stringify(requestBody), config)
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
    axiosIais.delete("/structural/ClosedVariables/" + id).then(
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
