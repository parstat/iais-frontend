<template>
  <div class="row" v-if="businessFunction">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>businessFunction</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.businessFunction.name.$error }"
              placeholder="businessFunction name"
              v-model.trim="businessFunction.name"
            />
            <span
              class="help-block"
              :class="{ show: $v.businessFunction.name.$error }"
              >Please enter businessFunction name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="businessFunction description"
              v-model.trim="businessFunction.description"
            />
            <span class="help-block"> Please enter a business function</span>
          </div>
          <div class="form-group">
            <label for="localId">GSBPM sub-phase number</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="businessFunction.localId"
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
  name: "BusinessFunctionEdit",
  computed: {
    ...mapGetters("businessFunction", ["businessFunction"])
  },
  data() {
    return {
      disabled: false
    };
  },
  validations: {
    businessFunction: {
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
          id: this.businessFunction.id,
          name: this.businessFunction.name,
          description: this.businessFunction.description,
          version: this.businessFunction.version,
          localId: this.businessFunction.localId
        };
        this.$store.dispatch("businessFunction/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.businessFunction.name = "";
      this.businessFunction.description = "";
      this.businessFunction.version = "";
      this.businessFunction.localId = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("businessFunction/findById", this.$route.params.id);
  }
};
</script>
