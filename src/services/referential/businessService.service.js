import { axiosIais } from "@/http";

export const businessServiceService = {
  findAll,
  findById,
  findByName,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/business/services").then(
      (response) => {
        console.log(response.data);
        resolve(response.data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/business/services/" + id).then(
      (response) => {
        var data = response.data ? response.data : null;
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/business/services/?name=" + search).then(
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
      version: formData.version ? formData.version : "",
    };

    axiosIais
      .put(
        "close/referential/business/services/" + formData.localId,
        new URLSearchParams(requestBody).toString(),
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
      version: formData.version ? formData.version : "",
      localId: formData.localId,
    };

    axiosIais
      .patch(
        "close/referential/business/services/" + formData.id,
        new URLSearchParams(requestBody).toString(),
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
    axiosIais.delete("close/referential/business/services/" + id).then(
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
