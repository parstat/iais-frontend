import { axiosIais } from "@/http";

//import axios from "axios";

export const statisticalClassificationService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais
      .get("/structural/OpenStatisticalClassifications")
      .then(
        (response) => {
          console.log(response.data.statisticalClassifications);
          resolve(response.data.statisticalClassifications);
        },
        (error) => {
          reject(error);
        }
      );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenStatisticalClassifications/" + id).then(
      (response) => {
        var data = response.data.statisticalClassification
          ? response.data.statisticalClassification
          : null;
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
      //definition: formData.definition,
      local_id: formData.localId,
    };

    axiosIais
      .post(
        "/structural/ClosedStatisticalClassifications/" +
          formData.localId,
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
      //definition: formData.definition,
      local_id: formData.localId,
    };

    axiosIais
      .patch(
        "/structural/ClosedStatisticalClassifications/" +
          formData.id,
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
    axiosIais.delete("/structural/ClosedStatisticalClassifications/" + id).then(
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
