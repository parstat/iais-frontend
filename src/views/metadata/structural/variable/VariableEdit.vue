<template>
  <div class="row" v-if="variable">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Variable</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.variable.name.$error }"
              placeholder="Variable name"
              v-model.trim="variable.name"
            />
            <span class="help-block" :class="{ show: $v.variable.name.$error }"
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
              v-model.trim="variable.description"
            />
            <span class="help-block"> Please enter a variable description</span>
          </div>

          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="variable.localId"
            />
          </div>
        </div>
        <div class="card-footer">
          <CButton
            color="primary"
            shape="square"
            size="sm"
            style="margin-right:0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Update</CButton
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
import { mapGetters } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "VariableEdit",
  computed: {
    ...mapGetters("variable", ["variable"])
  },
  data() {
    return {
      disabled: false
    };
  },
  validations: {
    variable: {
      name: {
        required
      },
      description: {
        required
      },
      localId: {
        required
      }
    }
  },
  methods: {
    handleSubmit() {
      this.$v.$touch(); //validate form data
      if (!this.$v.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          id: this.variable.id,
          name: this.variable.name,
          description: this.variable.description,
          //definition: this.variable.definition,
          localId: this.variable.localId
        };
        this.$store.dispatch("variable/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.variable.name = "";
      this.variable.description = "";
      //this.variable.definition = "";
      this.variable.localId = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("variable/findById", this.$route.params.id);
  }
};
</script>
