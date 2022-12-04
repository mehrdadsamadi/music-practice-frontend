<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل پیام ها</span>
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
        </div>

        <div class="showMessage row">
            <div 
                class="mt-3 col-12"
                v-for="(user) in users"
                :key="user._id"
            >
                <v-card>
                    <v-card-text>
                        <h3 class="text--primary">{{user | fullname}}</h3>
                        <v-divider></v-divider>
                        <template v-if="user?.messages.length">
                            <p>{{user.messages[user.messages.length - 1]?.createdAt | calender}}</p>
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
                                <v-card-text v-for="(message) in messages" :key="message._id" class="pb-0">
                                    <p>{{message?.createdAt | calender}}</p>
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
            users: [],
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
            this.userLoading = true

            axios.get("user/get-all")
                .then(({data}) => {
                    this.users = data.data.users.filter(user => user.role != "ADMIN")
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.userLoading = false)
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
</style>