<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">هدیه های من</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <template v-if="gifts.length">
        <div class="d-flex flex-column gap-2">
          <div class="col-11 mx-auto br-9 gift-container" v-for="gift in gifts" :key="gift._id">
            <div class="d-flex flex-column align-center justify-center primary--text my-2">
              <h5 class="m-1">{{ gift.gift.name }}</h5>
              <p style="font-size: 13px;">حداقل امتیاز: <strong>{{gift.gift.min_score}}</strong></p>
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
        هیج هدیه ای تهیه نکردی
      </v-alert>

    </div>
</template>

<script>
import axios from 'axios'
import filters from '@/mixins/filters.js';

export default {
    name: "userMyGiftsPage",
    mixins: [filters],
    data() {
      return {
        gifts: [],
      }
    },
    created() {
      this.getGifts()
    },
    methods: {
      getGifts() {
        this.$store.commit("set_state", { group: "loading", field: "show", value: true })

        axios.get("/user/gift/get-all")
            .then(({data}) => {
                this.gifts = data.data.purchase_gifts
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

.gift-container {
  box-shadow: 0px 2px 10px rgb(0 0 0 / 8%);
  position: relative;
}

.buy-gift {
  position: absolute;
  top: -1.5rem;
  right: 35%;
}
</style> 