<template>
    <div>
      <div class="page-title d-flex align-center justify-center mb-5">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <span class="px-3 fw-bold">هدیه ها</span>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <div class="d-flex align-center justify-center gap-2 mb-1 mt-4">
        <p class="fw-bold">هدیه های عادی</p>
        <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>
      
      <div class="d-flex gap-2 pb-2 pt-7 px-2 overflow-x-auto">
        <div class="col-6 br-9 gift-container py-8" v-for="gift in gifts" :key="gift._id">
          <v-btn
            class="mx-auto buy-gift"
            fab
            dark
            :loading="buyGiftLoading == gift._id"
            @click="buyGift(gift._id)"
            color="primary"
          >
            <v-icon dark>
              mdi-cart-plus
            </v-icon>
          </v-btn>
          <div class="d-flex flex-column align-center justify-center primary--text mt-2">
            <h5 class="m-1">{{ gift.name }}</h5>
            <p style="font-size: 13px;">حداقل امتیاز: <strong>{{gift.min_score}}</strong></p>
          </div>
        </div>
      </div>

      <div class="col-12 d-flex align-center justify-center gap-2 mb-1 mt-6">
        <p class="fw-bold">هدیه های جشنواره</p>
        <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
      </div>

      <div class="d-flex gap-2 py-2 px-2 overflow-x-auto">
        <div class="col-6 br-9 gift-container py-8" v-for="gift in festival_gifts" :key="gift._id">
          <div class="d-flex flex-column align-center justify-center primary--text">
            <h4 class="m-1">{{ gift.name }}</h4>
            <p style="font-size: 13px;">حداقل امتیاز: <strong>{{gift.min_score}}</strong></p>
            <p style="font-size: 13px;">رتبه: <strong>{{gift.rank}}</strong></p>
          </div>
        </div>
      </div>
      
      <div class="page-title d-flex align-center justify-center mt-10">
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
          <v-chip
            color="grey"
            outlined
          >
            امتیاز شما: {{ $store.getters.get_state("user")?.available_score }}
          </v-chip>
          <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
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
        buyGiftLoading: null,
      }
    },
    created() {
      this.getGifts()
    },
    methods: {
      getGifts() {
        this.$store.commit("set_state", { group: "loading", field: "show", value: true })

        axios.get("gift/get-all")
            .then(({data}) => {
                this.gifts = data.data.gifts
                this.festival_gifts = this.gifts.filter(gift => gift.in_festival)
                this.gifts = this.gifts.filter(gift => !gift.in_festival)
            })
            .catch(err => this.handle_error(err))
            .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))
      },
      buyGift(giftId) {
        
        this.prompt({title: "خرید", message: "آیا برای خرید این هدیه مطمعن هستید؟"})
        .then(() => {
            this.buyGiftLoading = giftId

            axios.patch(`user/gift/buy/${giftId}`)
              .then(({data}) => {
                this.$store.commit("set_state", {group: "user", field: "available_score", value: data.data.score})
                this.notify(data.data.message, "success")
              })
              .catch(err => this.handle_error(err))
              .finally(() => this.buyGiftLoading = null)
          })
      }
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