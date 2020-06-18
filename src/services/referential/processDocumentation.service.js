import { axiosIais } from "@/http";
import qs from "querystring";

export const processDocumentationService = {
  findById,
  findByName,
  save,
  update,
  addStatisticalStandard,
  removeStatisticalStandard,
  addProcessMethod,
  removeProcessMethod,
  addMaintainer,
  removeMaintainer,
  delete: _delete
};

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/process/documentations/" + id + "?language=en")
      .then(
        response => {
          var data = response.data ? response.data : {};
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
      frequency: formData.frequency,
      nextSubPhase: formData.nextSubPhase
    };

    axiosIais
      .put(
        "close/referential/process/documentations/program/" +
          formData.statisticalProgram +
          "/function/" +
          formData.businessFunction +
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
      description: formData.description,
      local_id: formData.local_id,
      frequency: formData.frequency,
      nextSubPhase: formData.nextSubPhase
    };

    axiosIais
      .patch(
        "close/referential/process/documentations/" +
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

//Process Method
function addProcessMethod(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/method/" +
          formData.method +
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

function removeProcessMethod(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/method/" +
          formData.method +
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

function addMaintainer(formData) {
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

function removeMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
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
