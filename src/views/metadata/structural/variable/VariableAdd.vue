<template>
  <div class="row">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Variable</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name*</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.name.$error }"
              placeholder="Variable name"
              v-model.trim="form.name"
            />
            <span class="help-block" :class="{ show: $v.name.$error }"
              >Please enter variable name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="Variable description"
              v-model.trim="form.description"
            />
            <span class="help-block">Please enter a description</span>
          </div>
          <div class="form-group">
            <label for="definition">Definition</label>
            <input
              id="definition"
              type="text"
              class="form-control"
              placeholder="Variable Definition"
              v-model.trim="form.definition"
            />
            <span class="help-block">Please enter a definition</span>
          </div>
          <div class="form-group">
            <label for="localId">Local id*</label>
            <input
              id="localId"
              type="text"
              class="form-control capitalize"
              :class="{ 'is-invalid': $v.localId.$error }"
              placeholder="Local id"
              v-model.trim="form.localId"
            />
            <span class="help-block" :class="{ show: $v.localId.$error }"
              >Please specify a local id.</span
            >
          </div>
          <div class="form-mandatory">*Mandatory fields</div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="Submit()"
            :disabled="disabled"
            >Save</CButton
          >
          <CButton
            color="danger"
            shape="square"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
        </div>
      </div>
    </div>
  </div>
</template>
<script>
//import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";
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
  name: "VariableAdd",
  data() {
    return {
      form: {
        name: "",
        description: "",
        definition: "",
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
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          name: this.name,
          description: this.description,
          definition: this.definition,
          localId: this.localId,
        };
        this.$store.dispatch("variable/save", formData);
        console.log(formData);
      }
    },
    Submit() {
      axios
        .post(
          "http://iais.francecentral.cloudapp.azure.com:8080/api/v1/structural/ClosedVariables/",
          this.form,
          axiosConfig
        )
        .then(
          function () {
            alert("Variable has been saved with success!");
          }.bind(this)
        );
    },
    handleReset() {
      this.form.name = "";
      this.form.description = "";
      this.form.definition = "";
      this.form.localId = "";
      this.$v.$reset();
    },
  },
};
</script>
<style scoped>
.capitalize {
  text-transform: uppercase;
}
</style>
