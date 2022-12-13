<template>
    <div class="d-flex flex-column gap-2">
        <v-banner
            v-for="timeGoal in activeTimeGoals" 
            :key="timeGoal._id"
            color="white"
            outlined
            rounded
            single-line
        >
            <div class="d-flex gap-2 align-center">
                <video width="32" height="32" preload="none" autoplay="autoplay" loop="true" muted="muted" playsinline="">
                    <source src="https://cdn-icons-mp4.flaticon.com/512/6172/6172513.mp4" type="video/mp4">
                </video>
                <p>هر {{timeGoal.period == 'daily' ? 'روز' : timeGoal.period == 'weekly' ? 'هفته' : 'ماه'}} {{timeGoal.time}} دقیقه تمرین کن و {{timeGoal.score}} امتیاز بگیر</p>
                <!-- <v-icon>mdi-close</v-icon> -->
            </div>
        </v-banner>
    </div>
</template>

<script>
import axios from "axios"

export default {
    name: "timeGoalBanner",
    data() {
        return {
            timeGoalLoading: false,
            timeGoals: [],
            activeTimeGoals: []
        }
    },
    created() {
        this.getTimeGoals()
    },
    methods: {
        getTimeGoals() {
            this.timeGoalLoading = true

            axios.get("timeGoal/get-all")
                .then(({data}) => {
                    this.timeGoals = data.data.timeGoals
                    this.checkExistUserInTimeGoal()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.timeGoalLoading = false)
        },
        checkExistUserInTimeGoal() {
            this.timeGoals.forEach(timeGoal => {
                timeGoal.users.forEach(user => {
                    if(user._id == this.$store.getters.get_state("user")._id) {
                        this.activeTimeGoals.push(timeGoal)
                    }
                })
            })
        }
    }
}
</script>

<style scoped>
.banner {
    
}
</style>