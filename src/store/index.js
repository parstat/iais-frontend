import { createStore } from "vuex";

import { auth } from "./modules/auth";
import { error } from "./modules/error";
import { coreui } from "./modules/coreui";
import { message } from "./modules/message";
import { statisticalProgram } from "./modules/referential/statisticalProgram";
import { agent } from "./modules/referential/agent";
import { legislativeReference } from "./modules/referential/legislativeReference";
import { statisticalStandard } from "./modules/referential/statisticalStandard";
import { businessService } from "./modules/referential/businessService";
import { businessFunction } from "./modules/referential/businessFunction";
import { processMethod } from "./modules/referential/processMethod";
import { processDocumentation } from "./modules/referential/processDocumentation";
import { variable } from "./modules/structural/variable"; //added by GV
import { code } from "./modules/structural/code"; //added by GV
import { correspondence } from "./modules/structural/correspondence"; //added by GV
import { statisticalClassification } from "./modules/structural/statisticalClassification"; //added by GV
import { variableRepresentation } from "./modules/structural/variableRepresentation"; //added by GV
import { unitType } from "./modules/structural/unitType";

export default createStore({
  modules: {
    auth,
    error,
    coreui,
    message,
    statisticalProgram,
    agent,
    legislativeReference,
    statisticalStandard,
    businessFunction,
    businessService,
    processMethod,
    processDocumentation,
    variable, //added by GV
    code, //added by GV
    correspondence, //added by GV
    statisticalClassification,
    variableRepresentation,
    unitType,
  },
});
