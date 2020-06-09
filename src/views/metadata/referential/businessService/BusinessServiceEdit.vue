<template>
  <div class="row" v-if="businessService">
    <div class="col-sm-12 col-md-6">
      <div class="card">
        <header class="card-header">
          <strong>Business Service</strong>
        </header>
        <div class="card-body">
          <div class="form-group">
            <label for="name">Name</label>
            <input
              id="name"
              type="text"
              class="form-control"
              :class="{ 'is-invalid': $v.businessService.name.$error }"
              placeholder="businessService name"
              v-model.trim="businessService.name"
            />
            <span
              class="help-block"
              :class="{ show: $v.businessService.name.$error }"
              >Please enter businessService name.</span
            >
          </div>
          <div class="form-group">
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control"
              placeholder="businessService description"
              v-model.trim="businessService.description"
            />
            <span class="help-block"> Please enter a business service</span>
          </div>
          <div class="form-group">
            <label for="localId">Local id</label>
            <input
              id="localId"
              type="text"
              class="form-control"
              placeholder="Local id"
              v-model.trim="businessService.localId"
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
  name: "BusinessServiceEdit",
  data() {
    return {
      disabled: false
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"])
  },
  validations: {
    businessService: {
      name: {
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
          id: this.businessService.id,
          name: this.businessService.name,
          description: this.businessService.description,
          version: this.businessService.version,
          localId: this.businessService.localId
        };
        this.$store.dispatch("businessService/update", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.businessService.name = "";
      this.businessService.description = "";
      this.businessService.version = "";
      this.businessService.localId = "";
      this.$v.$reset();
    }
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  }
};
</script>
