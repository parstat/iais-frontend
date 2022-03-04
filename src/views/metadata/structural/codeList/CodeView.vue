<template>
  <CRow>
    <div class="jumbotron jumbotron-fluid col-lg-12 p-2 mb-3" v-if="code">
      <div class="p-3">
        <h2 class="display-5">
          {{ code.name }}
          <span class="lead">( {{ code.version || code.localId }} )</span>
        </h2>
        <p class="lead">
          <span><strong>Description:</strong></span> {{ code.description }}
        </p>
      </div>
    </div>
    <CCard>
      <CCardBody>
        <CCardTitle>
          <span>Code Items</span>
        </CCardTitle>
        <CCardText>
          <table class="table table-hover" v-if="code">
            <thead>
              <tr>
                <th scope="col"><span>Code</span></th>
                <th scope="col"><span>Value</span></th>
                <th scope="col" colspan="2" width="2%"><span>Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in code.codeItems" :key="item.index">
                <td>{{ item.code }}</td>
                <td>{{ item.value }}</td>
                <template v-if="isAuthenticated">
                  <td>
                    <!--  <router-link
                    tag="a"
                    :to="{
                      name: 'CodeItemsEdit',
                      params: { id: code.id },
                    }"
                  >
                    <CIcon name="cil-pencil" />
                  </router-link> -->
                  </td>
                  <td v-if="isAdmin">
                    <!--  <router-link
                    tag="a"
                    :to="{
                      name: 'CodeItemsDelete',
                      params: { id: code.id },
                    }"
                  >
                    <CIcon name="cil-trash" />
                  </router-link> -->
                  </td>
                </template>
                <template v-else>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'CodeView',
                        params: { id: code.id },
                      }"
                    >
                      <CIcon name="cil-magnifying-glass" />
                    </router-link>
                  </td>
                </template>
              </tr>
            </tbody>
          </table>
        </CCardText>
        <CButton
          color="primary"
          size="sm"
          @click.prevent="handleBack()"
          :disabled="disabled"
          >Back</CButton
        >
      </CCardBody>
    </CCard>
  </CRow>
</template>

<script>
import { mapGetters } from "vuex";
//import { Context } from "@/common";

export default {
  name: "CodeView",
  data() {
    return {
      disabled: false,
    };
  },
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("coreui", ["isLoading"]),
    ...mapGetters("code", ["code"]),
  },
  methods: {
    handleBack() {
      this.disabled = true; //disable button
      this.$router.push("/metadata/structural/codelist");
    },
  },
  created() {
    this.$store.dispatch("code/findById", this.$route.params.id);
    //this.$store.dispatch("coreui/setContext", Context.Structural);
  },
};
</script>
<style scoped>
.jumbotron {
  border: 1px solid #ced2d8;
  box-shadow: 0 1px 1px 0 rgba(60, 75, 100, 0.14),
    0 2px 1px -1px rgba(60, 75, 100, 0.12), 0 1px 3px 0 rgba(60, 75, 100, 0.2);
}
@media (min-width: 576px) {
  .jumbotron {
    padding: 1.5rem 2rem;
  }
}
</style>
