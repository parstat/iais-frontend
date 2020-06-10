import { axiosIais } from "@/http";
import qs from "querystring";

export const legislativeReferenceService = {
  findAll,
  findById,
  save,
  update,
  findByName,
  delete: _delete
};

function findAll() {
  return new Promise(resolve => {
    resolve([
      {
        id: 1,
        localID: "hbsreg",
        link: "http://www.eurostat.eu/regulation/moldova/reg123.pdf",
        name: "HBS regulation",
        description: "Very important regulation for hbs survey"
      },
      {
        id: 2,
        localID: "lfsreg",
        link: "http://www.eurostat.eu/regulation/moldova/reg123.pdf",
        name: "LFS regulation",
        description: "Very important regulation for LFS survey"
      },
      {
        id: 3,
        localID: "census",
        link: "http://www.eurostat.eu/regulation/moldova/reg123.pdf",
        name: "Census regulation",
        description: "Very important regulation for census"
      }
    ]);
  });
}

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get(
        "/referential/legislative/references/?name=" + search + "&language=en"
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/legislative/references/" + id + "?language=en")
      .then(
        response => {
          var data = response.data ? response.data : null;
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function save(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId
    };

    axiosIais
      .post(
        "close/referential/legislative/references?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function update(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      link: formData.link ? formData.link : "",
      version: formData.version ? formData.version : "",
      type: formData.type,
      localId: formData.localId
    };

    axiosIais
      .patch(
        "close/referential/legislative/references/" +
          formData.id +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          //console.log(response.data);
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function _delete(id) {
  return new Promise((resolve, reject) => {
    axiosIais.delete("close/referential/legislative/references/" + id).then(
      response => {
        //console.log(response.data);
        resolve(response.data);
      },
      error => {
        reject(error);
      }
    );
  });
}
