<template>
  <div class="row">
    <div class="col-12">
      <div class="card ">
        <header class="card-header">
          Statistical processes
          <div class="card-header-actions">
            <router-link
              tag="a"
              to="/metadata/referential/add"
              class="card-header-action"
            >
              <CIcon name="cilPlus"></CIcon>
              <span>New process</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Survey Name</th>
                  <th scope="col">Acronym</th>
                  <th scope="col">Responsible Name</th>
                  <th scope="col">Responsible Division</th>
                  <th scope="col" colspan="3" width="3%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="statisticalProgram in statisticalPrograms"
                  :key="statisticalProgram.id"
                >
                  <td>{{ statisticalProgram.name }}</td>
                  <td>{{ statisticalProgram.acronym }}</td>
                  <td>{{ statisticalProgram.responsibleName }}</td>
                  <td>{{ statisticalProgram.responsibleDivision }}</td>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'statisticalProgramEdit',
                        params: { id: statisticalProgram.id }
                      }"
                    >
                      <CIcon name="cilPencil"></CIcon>
                    </router-link>
                  </td>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'statisticalProgramView',
                        params: { id: statisticalProgram.id }
                      }"
                    >
                      <CIcon name="cilMagnifyingGlass"></CIcon>
                    </router-link>
                  </td>
                  <td>
                    <router-link
                      tag="a"
                      :to="{
                        name: 'statisticalProgramDelete',
                        params: { id: statisticalProgram.id }
                      }"
                    >
                      <CIcon name="cilTrash"></CIcon>
                    </router-link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters(["statisticalPrograms"])
  },
  created() {
    this.$store.dispatch("getStatisticalPrograms");
  }
};
</script>
