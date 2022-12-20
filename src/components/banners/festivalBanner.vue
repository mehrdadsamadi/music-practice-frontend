<template>
    <TransitionGroup name="list" tag="div" class="d-flex flex-column mb-2">
        <v-banner
            v-for="festival in activeFestivals" 
            :key="festival._id"
            color="white"
            outlined
            rounded
        >
            <div class="d-flex gap-2 align-center">
                <v-icon color="error">mdi-party-popper</v-icon>
                <p>همین حالا در جشنواره تمرین {{festival.name}} شرکت کن و {{...festival.gifts.map(gift => `${gift.name} ، `)}} رو برنده شو</p>
                    
            </div>
            <template #actions>
                <v-btn
                    outlined
                    color="error"
                    @click="addToFestival(festival._id)"
                >
                    شرکت میکنم
                </v-btn>
            </template>
        </v-banner>
    </TransitionGroup>
</template>

<script>
import axios from "axios"

export default {
    name: "festivalBanner",
    data() {
        return {
            festivalLoading: false,
            festivals: [],
            activeFestivals: [],
            currentDate: new Date().toISOString().slice(0, 10),
            addToFestivalLoading: false
        }
    },
    created() {
        this.getFestivals()
    },
    methods: {
        getFestivals() {
            this.festivalLoading = true

            axios.get("festival/get-all")
                .then(({data}) => {
                    this.festivals = data.data.festivals
                    this.checkExistUserInFestival()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.festivalLoading = false)
        },
        checkExistUserInFestival() {
            this.activeFestivals = []
            
            this.festivals.forEach(festival => {
                if(festival.users.length) {
                    const notExistUser = festival.users.every(user => user._id != this.$store.getters.get_state("user")._id)
                    if(notExistUser && this.currentDate >= festival.start_in && this.currentDate <= festival.end_in) {
                        this.activeFestivals.push(festival)
                    }
                } else if(this.currentDate >= festival.start_in && this.currentDate <= festival.end_in) {
                    this.activeFestivals.push(festival)
                }
            })
        },
        addToFestival(festivalId) {
            this.addToFestivalLoading = true

            axios.patch(`/festival/add-user/${festivalId}`)
                .then(({data}) => {
                    this.notify(data.data.message,"success")
                    this.getFestivals()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.addToFestivalLoading = false)
        }
    }
}
</script>

<style scoped>
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>