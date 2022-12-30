<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل کاربر ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="row">
            <div class="col-12 mt-3 mb-5">
                <v-text-field
                    v-model="searchField"
                    label="جستجو هنرجو"
                    class="w-100"
                    background-color="light"
                    @input="search"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
        </div>


        <v-data-table
            :headers="headers"
            :items="searchUsers"
            :items-per-page="10"
            :loading="tableLoading"
            loading-text="در حال دریافت اطلاعات ..."
            hide-default-footer
            class="elevation-1"
        >
            <template v-slot:no-data>
                <p>کاربری برای نمایش وجود ندارد</p>
            </template>

            <template #[`item.instrument`]="{item}">
                <p v-text="item.instrument.name"></p>
            </template>

            <template #[`item.createdAt`]="{item}">
                <p>{{ item.createdAt | calender }}</p>
            </template>

            <template #[`item.purchase_gifts`]="{item}">
                <v-menu offset-y>
                    <template v-slot:activator="{ on, attrs }">
                        <v-btn
                            color="primary"
                            dark
                            rounded
                            outlined
                            small
                            v-bind="attrs"
                            v-on="on"
                        >
                        نمایش هدیه ها
                        </v-btn>
                    </template>
                    <v-list>
                        <v-list-item
                            v-for="(gift) in item.purchase_gifts" 
                            :key="gift._id"
                        >
                            <v-list-item-title>
                                <v-checkbox
                                    @change="receiveGift(item._id, gift.gift._id, gift.is_receive)"
                                    v-model="gift.is_receive"
                                    :label="gift.gift.name"
                                    hide-details=""
                                ></v-checkbox>
                                <p class="text-muted mt-1" style="font-size: 10px;">{{ gift.createdAt | calender }}</p>
                                <v-divider class="mb-0"></v-divider>
                            </v-list-item-title>
                        </v-list-item>
                    </v-list>
                </v-menu>
            </template>

            <template #[`item.actions`]="{ item }">
                <v-icon
                    @click="deleteUser(item)"
                >
                    mdi-trash-can-outline
                </v-icon>
            </template>
        </v-data-table>

    </div>
</template>

<script>
import axios from "axios"
import filters from "@/mixins/filters"

export default {
    name: "usersPage",
    mixins: [filters],
    data() {
        return {
            headers: [
                { text: 'نام', value: 'first_name', sortable: false },
                { text: 'نام خانوادگی', value: 'last_name', sortable: false },
                { text: 'موبایل', value: 'mobile', sortable: false },
                { text: 'ساز', value: 'instrument', sortable: false },
                { text: 'امتیاز', value: 'available_score', sortable: false },
                { text: 'هدیه ها', value: 'purchase_gifts', sortable: false },
                { text: 'تاریخ ثبت نام', value: 'createdAt', sortable: false },
                { text: "", value: "actions", sortable: false}
            ],
            users: [],
            searchUsers: [],
            loading: false,
            tableLoading: false,
            searchField: "",
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            this.$store.commit("set_state", { group: "loading", field: "show", value: true })

            axios.get("user/get-all")
                .then(({data}) => {
                    this.users = data.data.users
                    this.searchUsers = [...this.users]
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.$store.commit("set_state", { group: "loading", field: "show", value: false }))
        },
        search() {
            if (this.searchField.length == 0) {
                return this.searchUsers = [...this.users]
            }
            this.searchUsers = this.users.filter(user => {
                if(user.first_name.includes(this.searchField) || user.last_name.includes(this.searchField)) return user
            })
        },
        receiveGift(userId, giftId, status) {
            axios.patch(`gift/receive/${userId}/${giftId}/${status}`)
                .then(({data}) => {
                    this.notify(data.data.message, "success")
                    this.getUsers()
                })
                .catch(err => this.handle_error(err))
        },
        deleteUser(item) {

            this.prompt({title: "حذف", message: `برای حذف ${item.first_name + " " + item.last_name} مطمعن هستید؟`})
                .then(() => {
                    axios.delete(`user/remove/${item._id}`)
                        .then(({data}) => {
                            this.notify(data.data.message, "success")
                            this.getUsers()
                        })
                        .catch(err => this.handle_error(err))
                })
        },
    }
}
</script>

<style>

</style>