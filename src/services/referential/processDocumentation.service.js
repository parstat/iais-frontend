import { axiosIais } from "@/http";
import qs from "querystring";

export const processDocumentationService = {
  findById,
  findByName,
  save,
  update,
  addStatisticalStandard,
  removeStatisticalStandard,
  updateMaintainer,
  delete: _delete
};

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/process/documentations/" + id + "?language=en")
      .then(
        response => {
          var data = response.data ? response.data : {};
          console.log(data);
          resolve(data);
        },
        error => {
          reject(error);
        }
      );
  });
}

function findByName(search) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get(
        "/referential/process/documentations/?name=" + search + "&language=en"
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
      local_id: formData.local_id,
    };

    axiosIais
      .put(
        "close/referential/process/documentations/program/" +
          formData.statisticalProgram + "/function/" + formData.businessFunction +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
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
      acronym: formData.acronym,
      description: formData.description,
      status: "CURRENT",
      budget: 0,
      dateInitiated: "2018-05-10T10:00:00",
      dateEnded: "2018-08-10T10:00:00"
    };

    axiosIais
      .patch(
        "close/referential/statistical/programs/" +
          formData.id +
          "?language=en",
        qs.stringify(requestBody),
        config
      )
      .then(
        response => {
          resolve(response.data);
        },
        error => {
          reject(error);
        }
      );
  });
}

//Statistical standard
function addStatisticalStandard(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/standards/" +
          formData.standard +
          "?language=en"
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

function removeStatisticalStandard(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/standards/" +
          formData.standard +
          "?language=en"
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

function updateMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/maintainer/" +
          formData.maintainer +
          "?language=en"
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
    axiosIais.delete("close/referential/process/documentations/" + id).then(
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
