import { axiosIais } from "@/http";

export const conceptService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenConcept").then(
      (response) => {
        resolve(response.data.concepts);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenConcept/" + id).then(
      (response) => {
        var data = response.data.concept ? response.data.concept : null;
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
      definition: formData.definition,
      localId: formData.localId,
      link: formData.link,
    };

    axiosIais.post("structural/ClosedConcept", requestBody, config).then(
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
      definition: formData.definition,
      localId: formData.localId,
      link: formData.link,
      version: formData.version ? formData.version : "",
    };

    axiosIais.put("structural/ClosedConcept/", requestBody, config).then(
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
    axiosIais.delete("structural/ClosedConcept/" + id).then(
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
