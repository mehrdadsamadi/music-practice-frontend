<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">جشنواره</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <template v-if="festival && festival.end_in"> 
        <countDown :end="festival.end_in">
          <template #default="{days, hours, minutes, seconds}">
            
            {{ days }}
            
            {{ hours }}
            
            {{ minutes }}
            
            {{ seconds }}
          </template>
        </countDown>
      </template>

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
        festival: [],
        festivalLoading: false,
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
              })
              .catch(err => this.handle_error(err))
              .finally(() => this.festivalLoading = false)
      },
      daysLeft(endDate) {
        const date1 = new Date();
        const date2 = new Date(endDate);
          
        // To calculate the time difference of two dates
        const Difference_In_Time = date2.getTime() - date1.getTime();
          
        // To calculate the no. of days between two dates
        return (Difference_In_Time / (1000 * 3600 * 24));
      }
    },
}
</script>

<style scoped>
.v-application .headline {
  font-family: unset !important;
}
</style>