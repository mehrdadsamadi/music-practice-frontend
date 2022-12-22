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

          axios.get("festival/active")
              .then(({data}) => {
                  this.festival = data.data.festival
                  if(this.festival) this.getRanking()
                  else this.festivalLoading = false
              })
              .catch(err => {
                this.festivalLoading = false
                this.handle_error(err)
              })
      },
      getRanking() {
        axios.get(`festival/get-ranking/${this.festival._id}`)
          .then(({data}) => {
            console.log(data);
            this.ranking = data.data.ranking
          })
          .catch(err => this.handle_error(err))
          .finally(() => this.festivalLoading = false)

      }
    },
}
</script>

<style scoped>
.v-application .headline {
  font-family: unset !important;
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