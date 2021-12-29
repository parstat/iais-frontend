<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
        <CCardTitle>
          <strong>Agent</strong>
        </CCardTitle>
        <CCardText>
          <CForm>
            <label for="name">Name*</label>
            <input
              id="name"
              type="text"
              class="form-control mb-3"
              :class="{ 'is-invalid': v$.name.$error }"
              placeholder="Agent name"
              v-model.trim="name"
            />
            <span class="text-dange"  v-if="v$.name.$error"
              >Please enter agent name.</span
            >
          </CForm>
          <CForm>
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control mb-3"
              placeholder="Agent description"
              v-model.trim="description"
            />
          </CForm>
          <CForm>
            <label for="type">Type*</label>
            <v-select
              label="type"
              :options="types"
              v-model="type"
              class="mb-3"
              :class="{ 'is-invalid': v$.type.$error }"
              placeholder="Select a type"
              @input="getParents"
            ></v-select>
            <span class="text-danger" v-if="v$.type.$error"
              >Please select a type.</span
            >
          </CForm>
          <CForm>
            <label for="parent">Parent</label>
            <v-select
              label="name"
              :options="parents"
              class="mb-3"
              v-model="parent"
              placeholder="Select a parent"
            ></v-select>
          </CForm>
          <div class="form-group">
            <label for="localId">Local id*</label>
            <input
              id="localId"
              type="text"
              class="form-control mb-3"
              :class="{ 'is-invalid': v$.localId.$error }"
              placeholder="Local id"
              v-model.trim="localId"
            />
            <span class="text-danger" v-if="v$.localId.$error"
              >Please specify a local id.</span
            >
          </div>
          <div class="form-mandatory">*Mandatory fields</div>
        </CCardText>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click.prevent="handleSubmit()"
            :disabled="disabled"
            >Save</CButton
          >
          <CButton
            color="danger"
            size="sm"
            @click.prevent="handleReset()"
            :disabled="disabled"
            >Reset</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";
import { Agent } from "@/common";

export default {
  name: "AgentAdd",
  data() {
    return {
      v$: useValidate(),
      name: "",
      description: "",
      type: "",
      parent: "",
      localId: "",
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("agent", ["parents"]),
    types() {
      var types = [];
      for (const key of Object.keys(Agent)) {
        types.push(Agent[key]);
      }
      return types;
    },
  },
  validations: {
    name: {
      required,
    },
    type: {
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
          type: this.type,
          parent: this.parent.id,
          localId: this.localId,
        };
        this.$store.dispatch("agent/save", formData);
        console.log(formData);
      }
    },
    handleReset() {
      this.name = "";
      this.description = "";
      this.type = "";
      this.localId = "";
      this.v$.$reset();
    },
    getParents(type) {
      if (type === "DIVISION") {
        this.$store.dispatch("agent/findByType", Agent.Organization);
        return;
      }
      if (type === "INDIVIDUAL") {
        this.$store.dispatch("agent/findByType", Agent.Division);
        return;
      }
      this.$store.dispatch("agent/clearParents");
      return;
    },
  },
};
</script>
