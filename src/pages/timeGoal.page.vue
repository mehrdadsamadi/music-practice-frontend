<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل اهداف زمانی</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <v-data-table
            :headers="headers"
            :items="timeGoals"
            :items-per-page="10"
            :loading="tableLoading"
            loading-text="در حال دریافت اطلاعات ..."
            hide-default-footer
            class="elevation-1"
        >

            <template v-slot:no-data>
                <p>هدف زمانی برای نمایش وجود ندارد</p>
            </template>

            <template #[`item.time`] = "{item}">
                <div class="d-flex gap-2">
                    <p class="fw-bold">{{item.time}}</p>
                    <p>دقیقه</p>
                </div>
            </template>

            <template #[`item.period`]="{item}">
                <v-chip
                    v-text="item.period == 'daily' ? 'روزانه' : item.period == 'weekly' ? 'هفتگی' : 'ماهانه'"
                    :color="item.period == 'daily' ? 'primary' : item.period == 'weekly' ? 'error' : 'secondary'"
                    small
                ></v-chip>
            </template>

            <template #[`item.users`]="{item}">

                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            rounded
                            small
                            v-bind="attrs"
                            v-on="on"
                        >
                        نمایش کاربران دریافتی
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(user) in item.users" 
                            :key="user._id"
                        >
                            <v-list-item-title>{{user | fullname}}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <template #[`item.actions`]="{ item }">
                <v-icon
                    @click="setUpdateTimeGoal(item)"
                    class="ml-3"
                >
                    mdi-pencil-outline
                </v-icon>
                <v-icon
                    @click="deleteTimeGoal(item)"
                >
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>

        <div class="row mt-10">
            <div class="col-12">
                <v-text-field
                    v-model="form.time"
                    label="زمان تمرین"
                    hint="زمان را به دقیقه وارد کنید"
                    class="w-100"
                    background-color="light"
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            
            <div class="col-12">
                <v-text-field
                    v-model="form.score"
                    label="امتیاز دریافتی"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            
            <div class="col-12 mt-3">
                <v-select
                    v-model="form.period"
                    :items="periods"
                    item-text="text"
                    item-value="value"
                    label="بازه تمرینی"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-select>
            </div>

            <div class="col-12 mt-3">
                <v-autocomplete
                    v-model="form.users"
                    :items="users"
                    :loading="userLoading"
                    :item-text="item => `${item.first_name} ${item.last_name}`"
                    item-value="_id"
                    label="کاربران دریافتی"
                    hide-details
                    clearable
                    deletable-chips
                    dense
                    filled
                    multiple
                    rounded
                    small-chips
                ></v-autocomplete>
            </div>
            <div class="col-12 w-100 mt-5">
                <v-btn
                    v-if="isUpdate"
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="updateTimeGoal"
                    v-text="'ویرایش هدف زمانی'"
                ></v-btn>
                <v-btn
                    v-else
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="addTimeGoal"
                    v-text="'ایجاد هدف زمانی'"
                ></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "timeGoal",
    mixins: [filters],
    data() {
        return {
            headers: [
                { text: 'زمان(دقیقه)', value: 'time', sortable: false },
                { text: 'امتیاز', value: 'score', sortable: false },
                { text: 'دوره زمانی', value: 'period', sortable: false },
                { text: 'کاربران دریافتی', value: 'users', sortable: false },
                { text: "", value: "actions", sortable: false}
            ],
            timeGoals: [],
            users: [],
            periods: [
                {text: 'روزانه' , value: 'daily'}, 
                {text: 'هفتگی' , value: 'weekly'}, 
                {text: 'ماهانه' , value: 'monthly'}
            ],
            form: {
                time: "",
                score: "",
                period: "",
                users: [],
            },
            loading: false,
            timeGoalLoading: false,
            userLoading: false,
            tableLoading: false,
            isUpdate: false,
            updateId: ""
        }
    },
    created() {
        this.getTimeGoals()
        this.getUsers()
    },
    methods: {
        getTimeGoals() {
            this.timeGoalLoading = true

            axios.get("timeGoal/get-all")
                .then(({data}) => {
                    this.timeGoals = data.data.timeGoals
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.timeGoalLoading = false)
        },
        getUsers() {
            this.userLoading = true

            axios.get("user/get-all")
                .then(({data}) => {
                    this.users = data.data.users
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.userLoading = false)
        },
        resetForm() {
            this.form = {
                time: "",
                score: "",
                period: "",
                users: [],
            }
        },
        deleteTimeGoal(item) {
            this.prompt({title: "حذف", message: "برای حذف این هدف زمانی مطمعن هستید؟"})
                .then(() => {
                    axios.delete(`TimeGoal/remove/${item._id}`)
                        .then(({data}) => {
                            this.notify(data.data.message, "success")
                            this.getTimeGoals()
                        })
                        .catch(err => this.handle_error(err))
                })
        },
        addTimeGoal(){
            this.loading = true

            axios.post("timeGoal/add", this.form)
                .then(({data}) => {
                    this.notify(data.data.message,"success")
                    this.resetForm()
                    this.getTimeGoals()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        setUpdateTimeGoal(item) {
            this.isUpdate = true
            this.loading = true

            axios.get(`timeGoal/get/${item._id}`)
                .then(({data}) => {
                    
                    Object.keys(this.form).forEach(field => {
                        this.form[field] = data.data.timeGoal[field]
                    })

                    this.updateId = item._id

                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        updateTimeGoal() {
            this.loading = true

            axios.patch(`timeGoal/update/${this.updateId}`, this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.isUpdate = false
                    this.resetForm()
                    this.getTimeGoals()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>

</style>