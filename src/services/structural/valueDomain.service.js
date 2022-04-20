import { axiosIais } from "@/http";

//import axios from "axios";

export const valueDomainService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  //   delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenValueDomain").then(
      (response) => {
        console.log(response);
        resolve(response.data.valueDomains);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenValueDomain/" + id).then(
      (response) => {
        var data = response.data.valueDomain ? response.data.valueDomain : null;
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findByName(name, scope) {
  var queryString = "?name=" + name ?? "";
  queryString += "&scope=" + scope ?? "";
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenValueDomain" + queryString).then(
      (response) => {
        console.log(response);
        resolve(response.data.valueDomains);
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
      .post("/structural/ClosedValueDomain", JSON.stringify(variable), config)
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
      definition: formData.definition,
    };

    axiosIais
      .patch(
        "/structural/ClosedValueDomain/" + formData.id,
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

// function _delete(id) {
//   return new Promise((resolve, reject) => {
//     axiosIais.delete("/structural/ClosedVariables/" + id).then(
//       (response) => {
//         //console.log(response.data);
//         resolve(response.data);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// }
