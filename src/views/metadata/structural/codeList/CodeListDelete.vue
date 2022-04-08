<template>
  <CRow v-if="codeList">
    <CCol class="col-sm-12 col-md-6">
      <CCard>
        <CCardBody>
          <CCardTitle>
            <span>Sattistical Classificaion</span>
          </CCardTitle>
          <CCardText>
            <CForm>
              <label for="localId">Local id</label>
              <input
                id="localId"
                type="text"
                class="form-control mb-3"
                placeholder="Local id"
                v-model.trim="codeList.localId"
                disabled
              />
            </CForm>
            <CForm>
              <label for="name">Name</label>
              <input
                id="name"
                type="text"
                class="form-control mb-3"
                placeholder="Code List name"
                v-model.trim="codeList.name"
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
                placeholder="Code List description"
                v-model.trim="codeList.description"
                disabled
              />
            </CForm>
          </CCardText>
          <CButton
            color="primary"
            size="sm"
            @click.prevent="handleDelete()"
            :disabled="disabled"
            ><span>Delete</span></CButton
          >
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>
<script>
import { mapGetters } from "vuex";

export default {
  name: "CodeListDelete",
  computed: {
    ...mapGetters("codeList", ["codeList"]),
  },
  data() {
    return {
      disabled: false,
    };
  },
  methods: {
    handleDelete() {
      this.disabled = true; //disable button
      this.$store.dispatch("codeList/delete", this.$route.params.id);
    },
  },
  created() {
    this.$store.dispatch("codeList/findById", this.$route.params.id);
  },
};
</script>
<style></style>
