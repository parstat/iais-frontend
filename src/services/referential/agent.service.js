import { axiosIais } from "@/http";

export const agentService = {
  findAll,
  findById,
  findByType,
  findByName,
  findByNameAndType,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/agents?language=en").then(
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
    axiosIais.get("/referential/agents/" + id + "?language=en").then(
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

function findByType(type) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/agents/?language=en&type=" + type).then(
      (response) => {
        var data = response.data ? response.data : [];
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findByName(name) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/referential/agents/?language=en&name=" + name).then(
      (response) => {
        var data = response.data ? response.data : [];
        console.log(data);
        resolve(data);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findByNameAndType(name, type) {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/referential/agents/?language=en&name=" + name + "&type=" + type)
      .then(
        (response) => {
          var data = response.data ? response.data : [];
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
      type: formData.type,
      parent: formData.parent,
      local_id: formData.localId,
    };

    if ("parent" in formData) {
      requestBody.parent = formData.parent;
    }

    axiosIais
      .post(
        "close/referential/agents?language=en",
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
      type: formData.type,
      parent: formData.parent,
      local_id: formData.localId,
    };

    axiosIais
      .patch(
        "close/referential/agents/" + formData.id + "?language=en",
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
    axiosIais.delete("close/referential/agents/" + id).then(
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
