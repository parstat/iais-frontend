<template>
  <CRow v-if="dataStructure" class="mb-4">
    <CCol class="col-12">
      <CCard>
        <CCardHeader class="bg-white" component="h5">
          <span>Delete data structure</span>
        </CCardHeader>
        <CCardBody>
          <CForm>
            <label for="localId">Local id*</label>
            <input
              id="localId"
              type="text"
              class="form-control capitalize"
              placeholder="Local id"
              v-model.trim="dataStructure.localId"
              disabled
            />
          </CForm>
          <CForm>
            <label for="name">Name*</label>
            <input
              id="name"
              type="text"
              class="form-control"
              placeholder="Data structure name"
              v-model.trim="dataStructure.name"
              disabled
            />
          </CForm>
          <CForm>
            <label for="description">Description</label>
            <textarea
              rows="5"
              id="description"
              type="text"
              class="form-control mb-3"
              placeholder="Data structure description"
              v-model.trim="dataStructure.description"
              disabled
            />
          </CForm>
          <CForm>
            <label for="version">Version</label>
            <input
              id="version"
              type="text"
              class="form-control mb-3"
              placeholder="Data structure version"
              v-model.trim="dataStructure.version"
              disabled
            />
          </CForm>
          <CForm>
            <CFormLabel for="versionDate">
              <span>Version date</span>
            </CFormLabel>
            <Datepicker
              id="versionDate"
              class="mb-3"
              v-model="dataStructure.versionDate"
              disabled
            />
          </CForm>
          <CForm>
            <label for="versionRationale">Version rationale</label>
            <textarea
              id="versionRationale"
              type="text"
              class="form-control mb-3"
              placeholder="Unit data set version rationale"
              v-model.trim="dataStructure.versionRationale"
              rows="5"
              disabled
            ></textarea>
          </CForm>
        </CCardBody>
        <CCardFooter class="bg-white">
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="handleDelete()"
            :disabled="disabled"
            >Delete</CButton
          >
        </CCardFooter>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "UnitDataStructureEdit",
  data() {
    return {
      disabled: false,
      activeTab: 0,
    };
  },
  methods: {
    handleDelete() {
      this.disabled = true;
      this.$store.dispatch("unitDataStructure/delete", this.$route.params.id);
    },
  },
  computed: {
    ...mapGetters("unitDataStructure", ["unitDataStructure"]),
  },
  created() {
    this.$store.dispatch("unitDataStructure/findById", this.$route.params.id);
  },
};
</script>
