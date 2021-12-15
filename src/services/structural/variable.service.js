import { axiosIais } from "@/http";
import qs from "querystring";
//import axios from "axios";

export const variableService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenVariables?language=en").then(
      (response) => {
        console.log(response.data.variables);
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
        console.log(data);
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

function save(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      //definition: formData.definition,
      local_id: formData.localId,
    };

    axiosIais
      .post(
        "/structural/ClosedVariables" + formData.localId + "?language=en",
        qs.stringify(requestBody),
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

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      //definition: formData.definition,
      local_id: formData.localId,
    };

    axiosIais
      .patch(
        "/structural/ClosedVariables/" + formData.id + "?language=en",
        qs.stringify(requestBody),
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
