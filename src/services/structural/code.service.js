import { axiosIais } from "@/http";
import qs from "querystring";
//import axios from "axios";

export const codeService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenCodeLists?language=en").then(
      (response) => {
        console.log(response.data.codeLists);
        resolve(response.data.codeLists);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenCodeLists/" + id).then(
      (response) => {
        var data = response.data.codeList ? response.data.codeList : null;
        console.log(data);
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
        "/structural/ClosedCodeLists/" + formData.localId + "?language=en",
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
        "/structural/ClosedCodeLists/" + formData.id + "?language=en",
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
    axiosIais.delete("/structural/ClosedCodeLists/" + id).then(
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
