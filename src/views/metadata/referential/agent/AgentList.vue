<template>
  <div class="row">
    <div class="col-12">
      <div class="card">
        <header class="card-header">
          Agents
          <div class="card-header-actions">
            <router-link
              v-if="isAuthenticated"
              tag="a"
              to="/metadata/referential/gsim/agent/add"
              class="card-header-action"
            >
              <CIcon name="cilPlus"></CIcon>
              <span>New agent</span>
            </router-link>
          </div>
        </header>
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Type</th>
                  <th scope="col">Parent</th>
                  <th scope="col" colspan="2" width="2%"></th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="agent in agents" :key="agent.id">
                  <td>{{ agent.id }}</td>
                  <td>{{ agent.name }}</td>
                  <td v-if="agent.description">
                    {{ agent.description }}
                  </td>
                  <td v-else class="pl-4">&ndash;</td>
                  <td>{{ agent.type | capitalize }}</td>
                  <td v-if="agent.parent">{{ agent.parent.name }}</td>
                  <td v-else class="pl-4">&ndash;</td>
                  <template v-if="isAuthenticated">
                    <td>
                      <router-link
                        tag="a"
                        :to="{
                          name: 'AgentEdit',
                          params: { id: agent.id }
                        }"
                      >
                        <CIcon name="cilPencil"></CIcon>
                      </router-link>
                    </td>
                    <td v-if="isAdmin">
                      <router-link
                        tag="a"
                        :to="{
                          name: 'AgentDelete',
                          params: { id: agent.id }
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
                          name: 'AgentView',
                          params: { id: agent.id }
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
import { Context } from "@/common";

export default {
  name: "AgentList",
  computed: {
    ...mapGetters("auth", ["isAuthenticated", "isAdmin"]),
    ...mapGetters("agent", ["agents"])
  },
  created() {
    this.$store.dispatch("agent/findAll");
    this.$store.dispatch("coreui/setContext", Context.Referential);
  }
};
</script>
