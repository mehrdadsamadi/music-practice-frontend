<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">تمرین ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="d-flex flex-column gap-3 mb-10">
            <div class="d-flex flex-column gap-1">
                <p class="fw-bold">تمرین امروز شما</p>

                <v-progress-linear
                    :value="Math.floor(((practice.day * 100) / timeGoal.daily.time))"
                    color="primary"
                    height="30"
                    rounded
                    dark
                >
                    <template v-slot:default="{}">
                        <strong>{{ practice.day }} دقیقه</strong>
                    </template>
                </v-progress-linear>

                <template v-if="timeGoal.daily.time > 0">
                    <p class="text-muted p-hint" v-if="(timeGoal.daily.time - practice.day) > 0">تا آخر امروز <span class="fw-bold primary--text fs-6">{{timeGoal.daily.time - practice.day}}</span> دقیقه دیگه تمرین کن و <span class="fw-bold primary--text fs-6">{{timeGoal.daily.score}}</span> امتیاز بگیر</p>
                    <p class="text-muted p-hint" v-else>تبریک میگم! تو <span class="fw-bold primary--text fs-6">{{timeGoal.daily.score}}</span> امتیاز تمرین امروز خودت رو دریافت کردی</p>
                </template>
            </div>

            <div class="d-flex flex-column gap-1">
                <p class="fw-bold">تمرین این هفته شما</p>

                <v-progress-linear
                    :value="Math.floor(((practice.week * 100) / timeGoal.weekly.time))"
                    color="error"
                    height="30"
                    rounded
                    dark
                >
                    <template v-slot:default="{}">
                        <strong>{{ practice.week }} دقیقه</strong>
                    </template>
                </v-progress-linear>

                <template v-if="timeGoal.weekly.time > 0">
                    <p class="text-muted p-hint" v-if="(timeGoal.weekly.time - practice.week) > 0">تا آخر هفته <span class="fw-bold error--text fs-6">{{timeGoal.weekly.time - practice.week}}</span> دقیقه دیگه تمرین کن و <span class="fw-bold error--text fs-6">{{timeGoal.weekly.score}}</span> امتیاز بگیر</p>
                    <p class="text-muted p-hint" v-else>تبریک میگم! تو <span class="fw-bold primary--text fs-6">{{timeGoal.weekly.score}}</span> امتیاز تمرین این هفته خودت رو دریافت کردی</p>
                </template>
            </div>

        </div>

        <div class="row">
            <div class="col-12 d-flex align-center justify-center gap-2 mb-3">
                <p class="fw-bold">ثبت تمرین</p>
                <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            </div>
        
            <div class="col-10">
                <v-text-field
                    v-model="time"
                    label="زمان تمرین روزانه"
                    hint="زمان تمرین امروز خود را به دقیقه وارد کنید"
                    class="w-100"
                    background-color="light"
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            <div class="col-2 pr-0">
                <v-btn
                    outlined
                    fab
                    color="primary"
                    :loading="loading"
                    @click="addPractice"
                >
                    <v-icon>mdi-plus</v-icon>
                </v-btn>
            </div>
        </div>

        <div class="row mt-6">
            <div class="col-12 d-flex align-center justify-center gap-2 mb-3">
                <p class="fw-bold">تمرین های گذشته شما</p>
                <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            </div>
            
            <template v-if="practices.length">
                <div class="col-6 text-center mb-5" v-for="pr in practices" :key="pr._id">
                    <div class="d-flex flex-column align-center gap-2">
                        <p>{{ pr.createdAt | calender }}</p>
                        <v-progress-circular
                            :rotate="-90"
                            :size="100"
                            :width="15"
                            :value="Math.floor(((pr.time * 100) / timeGoal.daily.time))"
                            color="error"
                        >
                            {{ pr.time }} دقیقه
                        </v-progress-circular>
                    </div>
                </div>
            </template>
            <div class="col-12" v-else>
                <v-alert
                    border="left"
                    colored-border
                    type="error"
                    elevation="1"
                >
                    هیچ تمرینی تا حالا ثبت نکردی
                </v-alert>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "userPracticePage",
    mixins: [filters],
    data() {
        return {
            loading: null,
            time: "",
            practice: {
                day: 0,
                week: 0
            },
            timeGoal: {
                daily: {
                    time: 0,
                    score: 0
                },
                weekly: {
                    time: 0,
                    score: 0
                }
            },
            practices: [],
            timeGoals: [],
        }
    },
    created() {
        this.$store.commit("set_state", { group: "loading", field: "show", value: true })

        this.getPractice()
        this.getTimeGoals()
    },
    methods: {
        getPractice() {
            axios.get("user/practice/get-all")
                .then(({data}) => {
                    this.practices = data.data.practices.reverse();
                    ["day", "week"].forEach(item => this.practice[item] = data.data.totalPractice[item]);
                })
                .catch(err => this.handle_error(err))
        },
        getTimeGoals() {
            axios.get("timeGoal/get-all")
                .then(({data}) => {
                    this.timeGoals = data.data.timeGoals;
                    this.timeGoals.forEach(tg => {
                        this.timeGoal[tg.period].time = tg.time
                        this.timeGoal[tg.period].score = tg.score
                    })

                })
                .catch(err => this.handle_error(err))
                .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))
        },
        addPractice() {
            
            this.prompt({title: "ثبت", message: "برای ثبت زمان تمرین خود مطمعن هستید؟"})
                .then(() => {
                    this.loading = true
                    axios.patch("user/practice/add", {time: this.time})
                        .then(({data}) => {
                            this.$store.commit("set_state", {group: "user", field: "available_score", value: (data.data.score + this.$store.getters.get_state("user").available_score)})
                            this.time = ""
                            this.notify(data.data.message, "success")
                            this.getPractice()
                        })
                        .catch(err => this.handle_error(err))
                        .finally(() => this.loading = false)      
                })
        }
    },
}
</script>

<style scoped>
    .p-hint {
        font-size: 12px;
    }
</style>