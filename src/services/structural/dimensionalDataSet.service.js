import { axiosIais } from "@/http";
//

export const dimensionalDataSetService = {
  findAll,
  findById,
  // save,
  // update,
  // delete: _delete,
};

function findAll() {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenDimensionalDataSets/").then(
      (response) => {
        console.log(response);
        resolve(response.data.dimensionalDataSets);
      },
      (error) => {
        reject(error);
      }
    );
  });
}
function findById(id) {
  return new Promise((resolve, reject) => {
    axiosIais.get("/structural/OpenDimensionalDataSets/" + id).then(
      (response) => {
        console.log(response);
        var data = response.data.dimensionalDataSet
          ? response.data.dimensionalDataSet
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
// function save(formData) {
//   return new Promise((resolve, reject) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const requestBody = {
//       localId: formData.localId,
//       structureId: formData.structureId,
//       statisticalProgramId: formData.statisticalProgramId,
//       name: formData.name,
//       description: formData.description,
//       version: formData.version,
//       versionDate: formData.versionDate,
//       versionRationale: formData.versionRationale,
//       exchangeChannel: formData.exchangeChannel,
//       exchangeDirection: formData.exchangeDirection,
//       reportingBegin: formData.reportingBegin,
//       reportingEnd: formData.reportingEnd,
//       connection: formData.connection,
//       filterExpression: formData.filterExpression,
//     };

//     axiosIais.post("structural/ClosedUnitDataSets", requestBody, config).then(
//       (response) => {
//         //console.log(response.data);
//         resolve(response.data);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// }

// function update(formData) {
//   return new Promise((resolve, reject) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     const requestBody = {
//       id: formData.id,
//       localId: formData.localId,
//       structureId: formData.structureId,
//       statisticalProgramId: formData.statisticalProgramId,
//       name: formData.name,
//       description: formData.description,
//       version: formData.version,
//       versionDate: formData.versionDate,
//       versionRationale: formData.versionRationale,
//       exchangeChannel: formData.exchangeChannel,
//       exchangeDirection: formData.exchangeDirection,
//       reportingBegin: formData.reportingBegin,
//       reportingEnd: formData.reportingEnd,
//       connection: formData.connection,
//       filterExpression: formData.filterExpression,
//     };

//     axiosIais.put("structural/ClosedUnitDataSets", requestBody, config).then(
//       (response) => {
//         //console.log(response.data);
//         resolve(response.data);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// }

// function _delete(id) {
//   return new Promise((resolve, reject) => {
//     axiosIais.delete("structural/ClosedUnitDataSets/" + id).then(
//       (response) => {
//         //console.log(response.data);
//         resolve(response.data);
//       },
//       (error) => {
//         reject(error);
//       }
//     );
//   });
// }
