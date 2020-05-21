<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Statistical processes
          <div class="card-header-actions">
            <router-link
              v-if="isAdmin"
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
                  <th scope="col">Id</th>
                  <th scope="col">Survey Name</th>
                  <th scope="col">Acronym</th>
                  <th scope="col">Description</th>
                  <th scope="col">Owner</th>
                  <th scope="col">Maintainer</th>
                  <th scope="col">Contact</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="statisticalProgram in statisticalPrograms"
                  :key="statisticalProgram.id"
                >
                  <td>{{ statisticalProgram.localId }}</td>
                  <td>{{ statisticalProgram.name }}</td>
                  <td>{{ statisticalProgram.acronym }}</td>
                  <td>{{ statisticalProgram.description }}</td>
                  <td>{{ statisticalProgram.owner.name }}</td>
                  <td>{{ statisticalProgram.maintainer.name }}</td>
                  <td>{{ statisticalProgram.contact.name }}</td>
                  <template v-if="isAdmin">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalProgramEdit',
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
                          name: 'StatisticalProgramDelete',
                          params: { id: statisticalProgram.id }
                        }"
                      >
                        <CIcon name="cilTrash"></CIcon>
                      </router-link>
                    </td>
                  </template>
                  <template v-else>
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'StatisticalProgramView',
                          params: { id: statisticalProgram.id }
                        }"
                      >
                        <CIcon name="cilMagnifyingGlass"></CIcon>
                      </router-link>
                    </td>
                  </template>
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
    ...mapGetters("auth", ["isAdmin"]),
    ...mapGetters("statisticalProgram", ["statisticalPrograms"])
  },
  created() {
    this.$store.dispatch("statisticalProgram/findAll");
  }
};
</script>
