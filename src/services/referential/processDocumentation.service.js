import { axiosIais } from "@/http";

export const processDocumentationService = {
  findById,
  findLatest,
  findByName,
  save,
  clone,
  update,
  addStatisticalStandard,
  removeStatisticalStandard,
  addProcessMethod,
  removeProcessMethod,
  addBusinessService,
  removeBusinessService,
  addMaintainer,
  removeMaintainer,
  addProcessInput,
  removeProcessInput,
  addProcessOutput,
  removeProcessOutput,
  addProcessQuality,
  removeProcessQuality,
  addProcessDocument,
  removeProcessDocument,
  delete: _delete,
};

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/process/documentations/" + id).then(
      (response) => {
        var data = response.data ? response.data : {};
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findLatest(statisticalProgram, businessFunction) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get(
        "/referential/process/documentations/program/" +
          statisticalProgram +
          "/function/" +
          businessFunction
      )
      .then(
        (response) => {
          var data = response.data ? response.data : {};
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
    axiosIais.get("/referential/process/documentations/?name=" + search).then(
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
      local_id: formData.local_id,
      frequency: formData.frequency,
      nextSubPhase: formData.nextSubPhase,
    };

    axiosIais
      .put(
        "close/referential/process/documentations/program/" +
          formData.statisticalProgram +
          "/function/" +
          formData.businessFunction,
        new URLSearchParams(requestBody).toString(),
        config
      )
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function clone(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      local_id: formData.local_id,
      frequency: formData.frequency,
      nextSubPhase: formData.nextSubPhase,
      versionRationale: formData.versionRationale,
    };

    axiosIais
      .put(
        "close/referential/process/documentations/program/" +
          formData.statisticalProgram +
          "/function/" +
          formData.businessFunction +
          "/version/" +
          formData.version,
        new URLSearchParams(requestBody).toString(),
        config
      )
      .then(
        (response) => {
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
      local_id: formData.local_id ? formData.local_id : "",
      frequency: formData.frequency,
      nextSubPhase: formData.nextSubPhase,
    };

    axiosIais
      .patch(
        "close/referential/process/documentations/" + formData.id,
        new URLSearchParams(requestBody).toString(),
        config
      )
      .then(
        (response) => {
          resolve(response.data);
        },
        (error) => {
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
          formData.standard
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

function removeStatisticalStandard(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/standards/" +
          formData.standard
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

//Process Method
function addProcessMethod(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/method/" +
          formData.method
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

function removeProcessMethod(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/method/" +
          formData.method
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

//Business Service
function addBusinessService(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/service/" +
          formData.service
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

function removeBusinessService(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/service/" +
          formData.service
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

//Process Input
function addProcessInput(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
    };

    axiosIais
      .post(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/inputs/",
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

function removeProcessInput(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/inputs/" +
          formData.input
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

//Process Output
function addProcessOutput(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
    };

    axiosIais
      .post(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/outputs/",
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

function removeProcessOutput(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/outputs/" +
          formData.output
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

//Process Quality
function addProcessQuality(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
    };

    axiosIais
      .post(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/qualities/",
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

function removeProcessQuality(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/qualities/" +
          formData.quality
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

//Process Document
function addProcessDocument(formData) {
  return new Promise((resolve, reject) => {
    const config = {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };

    const requestBody = {
      name: formData.name,
      description: formData.description,
      link: formData.link,
      type: formData.type,
    };

    axiosIais
      .post(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/documents/",
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

function removeProcessDocument(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.documentation +
          "/documents/" +
          formData.document
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

function addMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .put(
        "close/referential/process/documentations/" +
          formData.id +
          "/maintainer/" +
          formData.maintainer
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

function removeMaintainer(formData) {
  return new Promise((resolve, reject) => {
    axiosIais
      .delete(
        "close/referential/process/documentations/" +
          formData.id +
          "/maintainer/" +
          formData.maintainer
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
    axiosIais.delete("close/referential/process/documentations/" + id).then(
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
