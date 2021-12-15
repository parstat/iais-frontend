import { axiosIais } from "@/http";
import qs from "querystring";

export const businessFunctionService = {
  findAll,
  findById,
  findByLocalId,
  findByName,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/business/functions?language=en").then(
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
    axiosIais
      .get("/referential/business/functions/" + id + "?language=en")
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

function findByLocalId(localId) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get(
        "/referential/business/functions/sub-phase/" + localId + "?language=en"
      )
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

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/business/functions/?name=" + search + "&language=en")
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
        "close/referential/business/functions/" +
          formData.localId +
          "?language=en",
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
      version: formData.version ? formData.version : "",
      localId: formData.localId,
    };

    axiosIais
      .patch(
        "close/referential/business/functions/" + formData.id + "?language=en",
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
    axiosIais.delete("close/referential/business/functions/" + id).then(
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
