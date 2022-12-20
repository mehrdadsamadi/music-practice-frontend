<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">هدیه ها</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <div class="row">
        <div class="col-12 d-flex align-center justify-center gap-2 mb-3 mt-4">
          <p class="fw-bold">هدیه های عادی</p>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="col-6 mb-3" v-for="gift in gifts" :key="gift._id">
          <div class="br-9 d-flex flex-column gap-3 py-3 px-4 error light--text">
            <h4 class="m-0">{{ gift.name }}</h4>
            <p style="font-size: 13px;">حداقل امتیاز: <strong>{{gift.min_score}}</strong></p>
          </div>
        </div>

        <div class="col-12 d-flex align-center justify-center gap-2 mb-3 mt-4">
          <p class="fw-bold">هدیه های جشنواره</p>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="col-6 mb-3" v-for="gift in festival_gifts" :key="gift._id">
          <div class="br-9 d-flex flex-column gap-3 py-3 px-4 primary light--text">
            <h4 class="m-0">{{ gift.name }}</h4>
            <p style="font-size: 13px;">حداقل امتیاز: <strong>{{gift.min_score}}</strong></p>
            <p style="font-size: 13px;">رتبه: <strong>{{gift.rank}}</strong></p>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import axios from 'axios'
import filters from '@/mixins/filters.js';

export default {
    name: "userGiftPage",
    mixins: [filters],
    data() {
      return {
        gifts: [],
        festival_gifts: [],
        giftLoading: false,
      }
    },
    created() {
      this.getGifts()
    },
    methods: {
      getGifts() {
          this.giftLoading = true

          axios.get("gift/get-all")
              .then(({data}) => {
                  this.gifts = data.data.gifts
                  this.festival_gifts = this.gifts.filter(gift => gift.in_festival)
                  this.gifts = this.gifts.filter(gift => !gift.in_festival)
              })
              .catch(err => this.handle_error(err))
              .finally(() => this.giftLoading = false)
      },
    }
}
</script>

<style scoped>
.v-application .headline {
  font-family: unset !important;
}
</style>