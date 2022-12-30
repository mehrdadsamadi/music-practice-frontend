<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">امتیاز های این هفته</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <v-timeline>
        <v-timeline-item
          v-for="(user, i) in users"
          :key="user._id"
          color="secondary"
          small
        >
          <template v-slot:opposite>
            <span
              :class="`headline font-weight-bold secondary--text`"
              v-text="i + 1"
            ></span>
          </template>
          <div class="py-4">
            <h6 :class="`font-weight-bold mb-4 primary--text`">
              {{ user | fullname }}
            </h6>
            <div>
              امتیاز : {{ user.score }}
            </div>
          </div>
        </v-timeline-item>
      </v-timeline>

    </div>
</template>

<script>
import axios from 'axios'
import filters from '@/mixins/filters.js';

export default {
    name: "userScorePage",
    mixins: [filters],
    data() {
      return {
        users: [],
      }
    },
    created() {
      this.getUsers()
    },
    methods: {
      getUsers() {
        this.$store.commit("set_state", { group: "loading", field: "show", value: true })

        axios.get("user/score/get-all-users-score")
            .then(({data}) => {
                this.users = data.data.users
            })
            .catch(err => this.handle_error(err))
            .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))
      },
    }
}
</script>

<style scoped>
.v-application .headline {
  font-family: unset !important;
}
</style>