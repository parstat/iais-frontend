import { axiosIais } from "@/http";

export const legislativeReferenceService = {
  findAll,
  findById,
  save,
  update,
  findByName,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/legislative/references").then(
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

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get(
        "/referential/legislative/references/?name=" + search
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

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/legislative/references/" + id)
      .then(
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
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId,
    };

    axiosIais
      .post(
        "close/referential/legislative/references",
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
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId,
    };

    axiosIais
      .patch(
        "close/referential/legislative/references/" +
          formData.id,
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
    axiosIais.delete("close/referential/legislative/references/" + id).then(
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
