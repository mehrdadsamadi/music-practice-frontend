<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل جشنواره ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <v-data-table
            :headers="headers"
            :items="festivals"
            :items-per-page="10"
            :loading="tableLoading"
            loading-text="در حال دریافت اطلاعات ..."
            hide-default-footer
            class="elevation-1"
        >

            <template v-slot:no-data>
                <p>فستیوالی برای نمایش وجود ندارد</p>
            </template>

            <template #[`item.name`] = "{item}">
                <p class="fw-bold">{{item.name}}</p>
            </template>

            <template #[`item.start_in`] = "{item}">
                <v-chip
                    small
                    color="secondary"
                >{{item.start_in | date}}</v-chip>
            </template>

            <template #[`item.end_in`] = "{item}">
                <v-chip
                    small
                    color="error"
                >{{item.end_in | date}}</v-chip>
            </template>

            <template #[`item.gifts`]="{item}">
                <!-- <v-chip
                    v-for="(gift) in item.gifts" 
                    :key="gift._id"
                    v-text="gift.name"
                    small
                    class="mr-1"
                    color="primary"
                ></v-chip> -->
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
                        نمایش هدیه ها
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(gift) in item.gifts" 
                            :key="gift._id"
                        >
                            <v-list-item-title>{{ gift.name }}</v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <template #[`item.users`]="{item}">

                <!-- <v-chip
                    v-for="(user) in item.users" 
                    :key="user._id"
                    small
                    class="mr-1"
                    color="secondary"
                >{{user | fullname}}</v-chip> -->

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
                        نمایش شرکت کنندگان
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
                    @click="setUpdateFestival(item)"
                    class="ml-3"
                >
                    mdi-pencil-outline
                </v-icon>
                <v-icon
                    @click="deleteFestival(item)"
                >
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>

        <div class="row mt-10">
            <div class="col-12">
                <v-text-field
                    v-model="form.name"
                    label="نام فستیوال"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>

            <div class="col-12 mt-3">
                <v-dialog
                    ref="startIn"
                    v-model="dialog.start_in"
                    :return-value.sync="form.start_in"
                    persistent
                    width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :value="form.start_in | date"
                            label="تاریخ شروع جشنواره"
                            prepend-inner-icon="mdi-calendar"
                            filled
                            hide-details
                            rounded
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.start_in"
                        scrollable
                        locale="fa"
                        :first-day-of-week="6"
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="error"
                            @click="dialog.start_in = false"
                        >
                            انصراف
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.startIn.save(form.start_in)"
                        >
                            ثبت
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </div>

            <div class="col-12 mt-3">
                <v-dialog
                    ref="endIn"
                    v-model="dialog.end_in"
                    :return-value.sync="form.end_in"
                    persistent
                    width="290px"
                >
                    <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                            :value="form.end_in | date"
                            label="تاریخ پایان جشنواره"
                            prepend-inner-icon="mdi-calendar"
                            filled
                            hide-details
                            rounded
                            dense
                            readonly
                            v-bind="attrs"
                            v-on="on"
                        ></v-text-field>
                    </template>
                    <v-date-picker
                        v-model="form.end_in"
                        scrollable
                        locale="fa"
                        :first-day-of-week="6"
                    >
                        <v-spacer></v-spacer>
                        <v-btn
                            text
                            color="error"
                            @click="dialog.end_in = false"
                        >
                            انصراف
                        </v-btn>
                        <v-btn
                            text
                            color="primary"
                            @click="$refs.endIn.save(form.end_in)"
                        >
                            ثبت
                        </v-btn>
                    </v-date-picker>
                </v-dialog>
            </div>

            <div class="col-12 mt-3">
                <v-autocomplete
                    v-model="form.gifts"
                    :items="gifts"
                    :loading="giftLoading"
                    item-text="name"
                    item-value="_id"
                    label="هدیه ها"
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
            <div class="col-12 mt-3" v-if="isUpdate">
                <v-autocomplete
                    v-model="form.users"
                    :items="users"
                    :loading="userLoading"
                    :item-text="item => `${item.first_name} ${item.last_name}`"
                    item-value="_id"
                    label="شرکت کنندگان"
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
                    @click="updateFestival"
                    v-text="'ویرایش فستیوال'"
                ></v-btn>
                <v-btn
                    v-else
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="addFestival"
                    v-text="'ایجاد فستیوال'"
                ></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "festivalPage",
    mixins: [filters],
    data() {
        return {
            headers: [
                { text: 'نام', value: 'name', sortable: false },
                { text: 'تاریخ شروع', value: 'start_in', sortable: false },
                { text: 'تاریخ پایان', value: 'end_in', sortable: false },
                { text: 'هدیه ها', value: 'gifts', sortable: false },
                { text: 'شرکت کنندگان', value: 'users', sortable: false },
                { text: "", value: "actions", sortable: false}
            ],
            festivals: [],
            gifts: [],
            users: [],
            form: {
                name: "",
                start_in: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                end_in: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                gifts: [],
                users: [],
            },
            dialog: {
                start_in: false,
                end_in: false,
            },
            loading: false,
            giftLoading: false,
            userLoading: false,
            tableLoading: false,
            isUpdate: false,
            updateId: ""
        }
    },
    created() {
        this.getFestivals()
        this.getGifts()
        this.getUsers()
    },
    methods: {
        getFestivals() {
            this.tableLoading = true
            axios.get("festival/get-all")
                .then(({data}) => {
                    this.festivals = data.data.festivals
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.tableLoading = false)
        },
        getGifts() {
            this.giftLoading = true

            axios.get("gift/get-all")
                .then(({data}) => {
                    this.gifts = data.data.gifts.filter(gift => gift.in_festival)
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.giftLoading = false)
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
                name: "",
                start_in: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                end_in: (new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10),
                gifts: [],
                users: [],
            }
        },
        deleteFestival(item) {
            this.prompt({title: "حذف", message: "برای حذف این فستیوال مطمعن هستید؟"})
                .then(() => {
                    axios.delete(`festival/remove/${item._id}`)
                        .then(({data}) => {
                            this.notify(data.data.message, "success")
                            this.getFestivals()
                        })
                        .catch(err => this.handle_error(err))
                })
        },
        addFestival() {
            this.loading = true

            axios.post("festival/add", this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.resetForm()
                    this.getFestivals()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        setUpdateFestival(item) {
            this.isUpdate = true
            this.loading = true

            axios.get(`festival/get/${item._id}`)
                .then(({data}) => {
                    
                    Object.keys(this.form).forEach(field => {
                        this.form[field] = data.data.festival[field]
                    })

                    this.updateId = item._id

                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        },
        updateFestival() {
            this.loading = true

            axios.patch(`festival/update/${this.updateId}`, this.form)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.isUpdate = false
                    this.resetForm()
                    this.getFestivals()
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.loading = false)
        }
    }
}
</script>

<style>

</style>