<template>
  <CRow class="col-sm-12 col-md-6">
    <CCard>
      <CCardHeader>
        <span>Code</span>
      </CCardHeader>
      <CCardBody>
        <CCardGroup>
          <label for="name"><span>Name*</span></label>
          <input
            id="name"
            type="text"
            class="form-control"
            :class="{ 'is-invalid': v$.name.$error }"
            placeholder="Code name"
            v-model.trim="form.name"
          />
          <span class="help-block" :class="{ show: v$.name.$error }"
            >Please enter variable name.</span
          >
        </CCardGroup>
        <CCardGroup>
          <label for="description"><span>Description</span></label>
          <textarea
            rows="5"
            id="description"
            type="text"
            class="form-control"
            placeholder="Code description"
            v-model.trim="form.description"
          />
          <span class="help-block">Please enter a description</span>
        </CCardGroup>
        <CCardGroup>
          <label for="definition"><span>Language</span></label>
          <input
            id="language"
            type="text"
            class="form-control"
            placeholder="Code language"
            v-model.trim="form.language"
          />
          <span class="help-block">Please enter a language</span>
        </CCardGroup>
        <CCardGroup>
          <label for="localId"><span>Local id*</span></label>
          <input
            id="localId"
            type="text"
            class="form-control capitalize"
            :class="{ 'is-invalid': v$.localId.$error }"
            placeholder="Local id"
            v-model.trim="form.localId"
          />
          <span class="help-block" :class="{ show: v$.localId.$error }"
            >Please specify a local id.</span
          >
        </CCardGroup>
        <div class="form-mandatory"><span>*Mandatory fields</span></div>
      </CCardBody>
      <CCardFooter>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click.prevent="Submit()"
          :disabled="disabled"
          ><span>Save</span></CButton
        >
        <CButton
          color="danger"
          size="sm"
          @click.prevent="handleReset()"
          :disabled="disabled"
          ><span>Reset</span></CButton
        >
      </CCardFooter>
    </CCard>
  </CRow>
</template>
<script>
//import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
//import { Variable } from "@/common";
import axios from "axios";

let axiosConfig = {
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

export default {
  name: "CodeAdd",
  data() {
    return {
      v$: useValidate(),
      form: {
        name: "",
        description: "",
        language: "",
        localId: "",
      },
      disabled: false,
      //variable: []
    };
  },
  mounted() {
    this.loading = true;
    axios
      //.get("http://localhost:5300/variables/" + this.$route.params.id)
      //.get("http://iais.francecentral.cloudapp.azure.com:8080/api/v1/referential/agents")
      .get(
        "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/OpenVariables" +
          this.$route.params.id
      )
      .then((response) => (this.variables = response.data.variables))
      .catch((error) => console.log(error))
      .finally(() => (this.loading = false));
  },
  /*
  computed: {
    ...mapGetters("variable", ["parents"]),
    types() {
      var types = [];
      for (const key of Object.keys(Variable)) {
        types.push(Variable[key]);
      }
      return types;
    }
  },
  */
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
    localId: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.v$.$touch(); //validate form data
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          language: this.language,
          localId: this.localId,
        };
        this.$store.dispatch("code/save", formData);
        console.log(formData);
      }
    },
    Submit() {
      axios
        .post(
          "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/ClosedCodeLists",
          this.form,
          axiosConfig
        )
        .then(
          function () {
            alert("Code has been saved with success!");
          }.bind(this)
        );
    },
    handleReset() {
      this.form.name = "";
      this.form.description = "";
      this.form.language = "";
      this.form.localId = "";
      this.v$.$reset();
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
