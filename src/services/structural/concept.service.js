import { axiosIais } from "@/http";

export const conceptService = {
  findAll,
  findById,
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
