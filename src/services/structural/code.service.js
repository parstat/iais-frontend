import { axiosIais } from "@/http";

//import axios from "axios";

export const codeService = {
  findAll,
  findById,
  save,
  update,
  addCodeItem,
  removeCodeItem,
  updateCodeItem,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenCodeLists").then(
      (response) => {
        //console.log(response.data.codeLists);
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
      localId: formData.localId,
      isSentinel: formData.isSentinel,
      // language: formData.language,
    };

    axiosIais.post("/structural/ClosedCodeLists/", requestBody, config).then(
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
      localId: formData.localId,
    };

    axiosIais.put("/structural/ClosedCodeLists", requestBody, config).then(
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

function addCodeItem(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      code: formData.codeName,
      description: formData.description,
      value: formData.label,
      nodeSetId: formData.nodeSetId,
    };

    axiosIais
      .put("/structural/ClosedCodeLists/codeitems", requestBody, config)
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

function removeCodeItem(id) {
  return new Promise((resolve, reject) => {
    axiosIais.delete("/structural/ClosedCodeLists/codeitems/remove/" + id).then(
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

function updateCodeItem(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      code: formData.codeName,
      description: formData.description,
      value: formData.label,
      id: formData.id,
    };

    // TODO: This endpoint does not exists.
    axiosIais
      .put("/structural/ClosedCodeLists/codeitems/update", requestBody, config)
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
