<template>
  <CRow>
    <CCol class="col-sm-12 col-md-6">
      <CCard v-if="businessService">
        <CCardBody>
          <CCardTitle>{{ businessService.name }} </CCardTitle>
          <CCardText>
            <CForm>
              <label for="description">Description</label>
              <textarea
                rows="5"
                id="description"
                type="text"
                class="form-control mb-3"
                v-model.trim="businessService.description"
                disabled
              />
            </CForm>
            <CForm>
              <label for="localid">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                v-model.trim="businessService.localId"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "BusinessServiceDelete",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("businessService", ["businessService"]),
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("businessService/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("businessService/findById", this.$route.params.id);
  },
};
</script>
