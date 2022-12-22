<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">جشنواره</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <template v-if="festival && festival.end_in"> 
        <countDown :end="festival.end_in">
          <template #default="{time}">
            
            <div id="countdown">
              <h4 class="text-center">پایان جشنواره</h4>
              <ul class="p-0 text-center" dir="ltr">
                <li class="text-center"><span id="days">{{ time.days }}</span>روز</li>
                <li class="text-center"><span id="hours">{{ time.hours }}</span>ساعت</li>
                <li class="text-center"><span id="minutes">{{ time.minutes }}</span>دقیقه</li>
                <li class="text-center"><span id="seconds">{{ time.seconds }}</span>ثانیه</li>
              </ul>
            </div>

          </template>
        </countDown>

        <div class="point d-flex gap-2 mb-7">
          <v-icon color="error" class="align-baseline">mdi-star</v-icon>
          <p>در جشنواره ، امتیاز ها بر اساس میزان تمرین شما محاسبه میشود</p>
        </div>

        <div class="row gap-3">
          <div class="col-11 mx-auto br-9 white border py-2 px-4 ranking-container">
            <div class="d-flex align-center justify-content-between">
              <p class="fw-bold error--text">رتبه</p>
              <p class="primary--text">نام</p>
              <p class="fw-bold error--text">امتیاز</p>
              <p class="primary--text">ساز</p>
            </div>
          </div>

          <v-divider class="m-0"></v-divider>

          <div class="col-11 mx-auto br-9 white border py-3 px-4 ranking-container" v-for="(user, index) in ranking" :key="index">
            <div class="d-flex align-center justify-content-between">
              <h4 class="fw-bold error--text m-0">{{ index + 1 }}</h4>
              <p class="primary--text">{{ user | fullname }}</p>
              <h4 class="fw-bold error--text m-0">{{ user.score }}</h4>
              <p class="text-muted" style="font-size: 12px;">{{ user.instrument }}</p>
            </div>
          </div>
        </div>
      </template>

      <v-alert
        v-else
        border="left"
        colored-border
        type="error"
        elevation="1"
      >
        هیچ جشنواره ای وجود ندارد
      </v-alert>

    </div>
</template>

<script>
import axios from 'axios'
import countDown from '@/components/tools/countDown.vue';
import filters from '@/mixins/filters.js';

export default {
    name: "userFestivalPage",
    mixins: [filters],
    components: {
      countDown
    },
    data() {
      return {
        festival: null,
        festivalLoading: false,
        ranking: []
      }
    },
    created() {
      this.getFestival()
    },
    methods: {
      getFestival() {
          this.festivalLoading = true
          this.$store.commit("set_state", { group: "loading", field: "show", value: true })

          axios.get("festival/active")
              .then(({data}) => {
                  this.festival = data.data.festival
                  if(this.festival) this.getRanking()
                  else this.$store.commit("set_state", { group: "loading", field: "show", value: false })
              })
              .catch(err => {
                this.$store.commit("set_state", { group: "loading", field: "show", value: false })
                this.handle_error(err)
              })
      },
      getRanking() {
        axios.get(`festival/get-ranking/${this.festival._id}`)
          .then(({data}) => {
            this.ranking = data.data.ranking
          })
          .catch(err => this.handle_error(err))
          .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))

      }
    },
}
</script>

<style scoped>
.v-application .headline {
  font-family: unset !important;
}

.ranking-container {
  box-shadow: 0px 2px 10px rgb(0 0 0 / 8%);
}

li {
  display: inline-block;
  font-size: 1.3rem;
  list-style-type: none;
  padding: 1em;
  text-transform: uppercase;
}

li span {
  display: block;
  font-size: 2.5rem;
}
</style>