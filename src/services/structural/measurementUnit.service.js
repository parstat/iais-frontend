import { axiosIais } from "@/http";

export const measurementUnitService = {
  findAll,
  findById,
  save,
  update,
  delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenMeasurementUnit").then(
      (response) => {
        resolve(response.data.measurementUnits);
      },
      (error) => {
        reject(error);
      }
    );
  });
}

function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenMeasurementUnit/" + id).then(
      (response) => {
        var data = response.data.measurementUnit
          ? response.data.measurementUnit
          : null;
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
      abbreviation: formData.abbreviation ? formData.abbreviation : "",
      localId: formData.localId,
      isStandard: formData.isStandard,
      convertionRule: formData.convertionRule ? formData.convertionRule : "",
      measurementTypeId: formData.measurementTypeId,
    };

    axiosIais
      .post("structural/ClosedMeasurementUnit", requestBody, config)
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
        "Content-Type": "application/json",
      },
    };

    const requestBody = {
      id: formData.id,
      name: formData.name,
      description: formData.description,
      abbreviation: formData.abbreviation ? formData.abbreviation : "",
      localId: formData.localId,
      isStandard: formData.isStandard,
      convertionRule: formData.convertionRule ? formData.convertionRule : "",
      measurementTypeId: formData.measurementTypeId,
    };

    axiosIais
      .put("structural/ClosedMeasurementUnit/", requestBody, config)
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
    axiosIais.delete("structural/ClosedMeasurementUnit/" + id).then(
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
