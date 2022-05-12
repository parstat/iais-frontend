<template>
  <CCard>
    <CCardBody>
      <CCardTitle>
        <CIcon name="cil-description" />
        <span>&nbsp;{{ $t("referential.process_quality") }}</span>
      </CCardTitle>
      <CCardText>
        <CForm>
          <CFormLabel for="name">
            <span>{{ $t("referential.process_quality_name") }}*</span>
          </CFormLabel>
          <input
            id="quality_name"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.name.$error }"
            :placeholder="$t('referential.process_quality_name')"
            v-model.trim="name"
          />
          <CFormLabel for="description">
            <span>{{ $t("referential.process_quality_name") }}*</span>
          </CFormLabel>
          <textarea
            rows="5"
            id="quality_description"
            type="text"
            class="form-control mb-3"
            :class="{ 'is-invalid': v$.description.$error }"
            :placeholder="$t('referential.process_quality_description')"
            v-model.trim="description"
          />
        </CForm>
        <div>
          <CButton
            color="primary"
            size="sm"
            style="margin-right: 0.3rem"
            @click="handleSave"
            ><span v-if="isEdit">{{ $t("referential.update") }}</span>
            <span v-else> {{ $t("referential.add") }}</span>
          </CButton>
        </div>
        <CRow>
          <CCol
            class="col-md-4 mt-3"
            v-for="processQuality of processDocumentation.processQualities"
            :key="processQuality.id"
            ><CCard class="card-border bg-lighter mb-3">
              <CCardHeader>
                <CRow>
                  <CCol class="col-9">
                    <CCardTitle component="h6">
                      <span>{{ processQuality.name }}</span>
                    </CCardTitle>
                  </CCol>
                  <CCol class="col-3">
                    <CNav class="justify-content-end">
                      <CNavItem>
                        <span v-on:click="editProcessQuality(processQuality)">
                          <CIcon name="cil-pencil" />
                        </span>
                      </CNavItem>
                      <CNavItem>
                        <span v-on:click="removeProcessQuality(processQuality)">
                          <CIcon name="cil-trash" />
                        </span>
                      </CNavItem>
                    </CNav>
                  </CCol>
                </CRow>
              </CCardHeader>
              <CCardBody>
                <CCardText>
                  <span>{{ processQuality.description }}</span>
                </CCardText>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCardText>
      <CCardFooter class="bg-white">
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('back')"
          ><span>{{ $t("referential.back") }}</span>
        </CButton>
        <CButton
          color="primary"
          size="sm"
          style="margin-right: 0.3rem"
          @click="$emit('next')"
          ><span>{{ $t("referential.next") }}</span>
        </CButton>
      </CCardFooter>
    </CCardBody>
  </CCard>
</template>
<script>
import { mapGetters } from "vuex";
import useValidate from "@vuelidate/core";
import { required } from "@vuelidate/validators";

export default {
  name: "ProcessDocumentationOutputsEdit",

  data() {
    return {
      v$: useValidate(),
      qualityId: "",
      name: "",
      description: "",
      disabled: false,
      isEdit: false,
    };
  },
  computed: {
    ...mapGetters("processDocumentation", ["processDocumentation"]),
  },
  validations: {
    name: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    editProcessQuality(selectedProcessQuality) {
      this.isEdit = true;
      this.name = selectedProcessQuality.name;
      this.description = selectedProcessQuality.description;
      this.qualityId = selectedProcessQuality.id;
    },
    handleSave() {
      if (this.isEdit) {
        this.updateProcessQuality();
      } else {
        this.addProcessQuality();
      }
    },
    updateProcessQuality() {
      this.disabled = true; //disable buttons
      const formData = {
        id: this.qualityId,
        documentation: this.processDocumentation.id,
        name: this.name,
        description: this.description,
      };
      this.$store
        .dispatch("processDocumentation/editProcessQuality", formData)
        .then(() => {
          this.qualityId = "";
          this.name = "";
          this.description = "";
          this.v$.$reset();
        });
    },
    addProcessQuality() {
      this.v$.$touch();
      if (!this.v$.$invalid) {
        this.disabled = true; //disable buttons
        const formData = {
          documentation: this.processDocumentation.id,
          name: this.name,
          description: this.description,
        };
        this.$store
          .dispatch("processDocumentation/addProcessQuality", formData)
          .then(() => {
            this.name = "";
            this.description = "";
            this.v$.$reset();
          });
      }
    },
    removeProcessQuality(selectedProcessQuality) {
      const formData = {
        documentation: this.processDocumentation.id,
        quality: selectedProcessQuality.id,
      };
      this.$store.dispatch(
        "processDocumentation/removeProcessQuality",
        formData
      );
    },
  },
  created() {},
};
</script>

<style scoped>
.card {
  box-shadow: none !important;
}
.card-plain {
  padding-top: 0rem;
  scroll-padding-bottom: 1rem;
}
.card-border {
  border: 1px solid #d8dbe0 !important;
}
.bg-lighter {
  background-color: #f8f8f8 !important;
}
.card-header {
  padding-top: 1rem;
}
</style>
