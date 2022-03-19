import { axiosIais } from "@/http";

export const conceptService = {
  findAll,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenConcept").then(
      (response) => {
        resolve(response.data.unitTypes);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
