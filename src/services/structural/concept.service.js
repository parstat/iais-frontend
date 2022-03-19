import { axiosIais } from "@/http";

export const conceptService = {
  findAll,
  findById,
  save,
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
