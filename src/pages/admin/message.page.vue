<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل پیام ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="showMessage row">
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
            <TransitionGroup name="list">

                <!-- <template v-if="searchUsers.length"> -->
                    
                    <div 
                        class="mt-3 col-12"
                        v-for="(user) in searchUsers"
                        :key="user._id"
                    >
                        <v-card>

                            <v-card-text>
                                <h3 class="text--primary">{{user | fullname}}</h3>

                                <v-divider></v-divider>

                                <template v-if="user?.messages.length">
                                    <p class="d-flex align-baseline">{{user.messages[user.messages.length - 1]?.createdAt | calender}} <v-icon class="mr-2" v-if="user.messages[user.messages.length - 1].seen">mdi-check-all</v-icon></p>
                                    <div class="text--primary" v-text="user.messages[user.messages.length - 1]?.message"></div>
                                </template>
                                <v-alert
                                    v-else
                                    border="left"
                                    colored-border
                                    type="error"
                                    elevation="1"
                                >
                                    این شخص هیچ پیامی ندارد
                                </v-alert>

                            </v-card-text>

                            <v-card-actions v-if="user?.messages.length">
                                <v-btn
                                    rounded
                                    depressed
                                    color="secondary"
                                    class="px-3"
                                    @click="getUserMessages(user._id)"
                                >
                                    همه پیام ها
                                </v-btn>
                            </v-card-actions>
            
                            <v-expand-transition>
                                <v-card
                                    v-if="reveal == user._id"
                                    class="transition-fast-in-fast-out v-card--reveal"
                                    style="height: 100%;"
                                >
                                    <template v-if="messages.length">
                                        <v-divider></v-divider>

                                        <v-card-text v-for="(message) in messages" :key="message._id" class="pb-0 pt-0">
                                            <p class="d-flex align-baseline">{{message?.createdAt | calender}}  <v-icon class="mr-2" v-if="message.seen">mdi-check-all</v-icon></p>
                                            <div class="text--primary" v-text="message?.message"></div>
                                            <v-divider></v-divider>
                                        </v-card-text>
                                    </template>
                                    <v-card-text v-else>
                                        <v-alert
                                            border="left"
                                            colored-border
                                            type="error"
                                            elevation="1"
                                        >
                                            این شخص هیچ پیام دیگری ندارد
                                        </v-alert>
                                    </v-card-text>
                                    <v-card-actions class="pt-0">
                                        <v-btn
                                            rounded
                                            depressed
                                            color="error"
                                            class="px-3"
                                            @click="closeReveal"
                                        >
                                            بستن
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                            </v-expand-transition>
                            
                        </v-card>
                    </div>

                <!-- </template> -->
                <!-- <template v-else> -->
                    <div class="col-12" key="alert" v-if="!searchUsers.length">
                        <v-alert
                            border="left"
                            colored-border
                            type="error"
                            elevation="1"
                        >
                            هنرجویی یافت نشد
                        </v-alert>
                    </div>
                <!-- </template> -->

            </TransitionGroup>
        </div>

        <div class="row mt-10">
            <div class="col-12">
                <v-text-field
                    v-model="message"
                    label="پیام"
                    class="w-100"
                    background-color="light"
                    hide-details
                    filled
                    rounded
                    dense
                ></v-text-field>
            </div>
            <div class="col-12 mt-3">
                <v-autocomplete
                    v-model="selectedUsers"
                    :items="users"
                    :loading="userLoading"
                    :item-text="item => `${item.first_name} ${item.last_name}`"
                    item-value="_id"
                    label="کاربران"
                    clearable
                    deletable-chips
                    hide-details
                    dense
                    filled
                    multiple
                    rounded
                    small-chips
                ></v-autocomplete>
            </div>
            <div class="col-12 mt-5 w-100">
                <v-btn
                    outlined
                    color="primary"
                    block
                    :loading="loading"
                    @click="sendMessage"
                    v-text="'ارسال پیام'"
                ></v-btn>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "messagePage",
    mixins: [filters],
    data() {
        return {
            message: "",
            searchField: "",
            users: [],
            searchUsers: [],
            selectedUsers: [],
            userLoading: false,
            loading: false,
            timeOut: null,
            reveal: null,
            messages: []
        }
    },
    created() {
        this.getUsers()
    },
    beforeDestroy() {
        clearTimeout(this.timeOut)
    },
    methods: {
        getUsers() {
            this.$store.commit("set_state", { group: "loading", field: "show", value: true })

            this.userLoading = true

            axios.get("user/get-all")
                .then(({data}) => {
                    this.users = data.data.users.filter(user => user.role != "ADMIN")
                    this.searchUsers = [...this.users]
                })
                .catch(err => this.handle_error(err))
                .finally(() => {
                    this.userLoading = false
                    this.$store.commit("set_state", { group: "loading", field: "show", value: false })
                })
        },
        search() {
            if (this.searchField.length == 0) {
                return this.searchUsers = [...this.users]
            }
            this.searchUsers = this.users.filter(user => {
                if(user.first_name.includes(this.searchField) || user.last_name.includes(this.searchField)) return user
            })
        },
        closeReveal() {
            this.messages = []
            this.reveal = null
        },
        getUserMessages(userId) {
            this.users.forEach((user) => {
                if(user._id == userId) {
                    this.messages = [...user.messages]
                    this.messages.pop()
                    this.messages.reverse()
                }
            })
            
            this.reveal = userId
        },  
        sendMessage() {
            if(this.message.length == 0) return this.notify("لطفا پیام خود را بنویسید","error")

            this.prompt({title: "ارسال پیام", message: "آیا برای ارسال پیام مطمعن هستید؟"})
                .then(() => {
                    this.loading = true

                    this.selectedUsers.forEach(userId => {
                        axios.patch(`user/message/add/${userId}`, {message: this.message})
                            .then(({data}) => {
                                this.notify(data.data.message, "success")
                                this.message = ""
                                this.selectedUsers = []
                                this.getUsers()
                            })
                            .catch(err => this.handle_error(err))
                            .finally(() => this.loading = false)

                        this.timeOut = setTimeout(() => {}, 1000);
                    })
                })
        }
    },
}
</script>

<style>
.v-card--reveal {
  bottom: 0;
  opacity: 1 !important;
  position: absolute;
  width: 100%;
}
.transition-fast-in-fast-out.v-card--reveal.v-card.v-sheet.theme--light {
    overflow-y: auto;
}

.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  /* opacity: 0; */
  transform: translateX(30rem);
}

/* ensure leaving items are taken out of layout flow so that moving
   animations can be calculated correctly. */
/* .list-leave-active {
  position: absolute;
} */
</style>