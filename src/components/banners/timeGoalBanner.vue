<template>
    <TransitionGroup name="list" tag="div" class="d-flex flex-column gap-2">
        <v-banner
            v-for="timeGoal in activeTimeGoals" 
            :key="timeGoal._id"
            color="white"
            outlined
            rounded
        >
            <div class="d-flex gap-2 align-center">
                <v-icon color="secondary">mdi-bullseye-arrow</v-icon>
                
                <p>هر {{timeGoal.period == 'daily' ? 'روز' : timeGoal.period == 'weekly' ? 'هفته' : 'ماه'}} {{timeGoal.time}} دقیقه تمرین کن و {{timeGoal.score}} امتیاز بگیر</p>

                <v-icon @click="deleteBanner(timeGoal._id)">mdi-close</v-icon>
            </div>
        </v-banner>
    </TransitionGroup>
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
        },
        deleteBanner(timeGoalId) {
            this.activeTimeGoals = this.activeTimeGoals.filter(tg => tg._id != timeGoalId)
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