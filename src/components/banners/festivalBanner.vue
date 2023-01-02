<template>
    <div>
        <div class="d-flex flex-column gap-2 mb-2" v-if="activeFestival">
            <v-banner
                :key="festival._id"
                color="white"
                outlined
                rounded
            >
                <div class="d-flex gap-2 align-center">
                    <v-icon color="error">mdi-party-popper</v-icon>
                    <p>همین حالا در جشنواره تمرین {{festival.name}} شرکت کن و {{...festival.gifts.map(gift => `${gift.name} و ... `)}} رو برنده شو</p>
                        
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
        </div>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "festivalBanner",
    data() {
        return {
            festivalLoading: false,
            festival: null,
            activeFestival: false,
            currentDate: null,
            addToFestivalLoading: false
        }
    },
    created() {
        let tzoffset = (new Date()).getTimezoneOffset() * 60000; //offset in milliseconds
        this.currentDate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1).slice(0, 10);

        this.getFestival()
    },
    methods: {
        getFestival() {
            this.festivalLoading = true

            axios.get("festival/active")
                .then(({data}) => {
                    this.festival = data.data.festival
                    this.checkExistUserInFestival()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.festivalLoading = false)
        },
        checkExistUserInFestival() {
            this.activeFestival = false
            
            if(this.festival.users.length) {
                
                const notExistUser = this.festival.users.for(user => user.user._id != this.$store.getters.get_state("user")._id)
                
                if(notExistUser && this.currentDate >= this.festival.start_in && this.currentDate <= this.festival.end_in) {
                    this.activeFestival = true
                }
                
            } else if(this.currentDate >= this.festival.start_in && this.currentDate <= this.festival.end_in) {
                this.activeFestival = true
            }
        },
        addToFestival(festivalId) {
            this.addToFestivalLoading = true

            axios.patch(`/festival/add-user/${festivalId}`)
                .then(({data}) => {
                    this.activeFestival = false
                    this.notify(data.data.message,"success")
                    
                    if(this.$router.history.current.path != "/user-festival") {
                        this.$router.push("/user-festival")
                    }
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.addToFestivalLoading = false)
        }
    }
}
</script>

<style scoped>
</style>