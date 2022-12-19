<template>
    <div>
        <div class="page-title d-flex align-center justify-center mb-5">
            <v-divider style="border-color: rgba(0,0,0,1);"></v-divider>
            <span class="px-3 fw-bold">کنترل تمرین ها</span>
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

                                <template v-if="user?.practices.length">
                                    <p class="d-flex align-baseline">{{user.practices[user.practices.length - 1]?.createdAt | calender}}</p>
                                    <div class="text--primary fw-bold" v-text="user.practices[user.practices.length - 1]?.time + ' دقیقه '"></div>
                                </template>
                                <v-alert
                                    v-else
                                    border="left"
                                    colored-border
                                    type="error"
                                    elevation="1"
                                >
                                    این شخص هیچ تمرینی ندارد
                                </v-alert>

                            </v-card-text>

                            <v-card-actions v-if="user?.practices.length">
                                <v-btn
                                    rounded
                                    depressed
                                    color="secondary"
                                    class="px-3"
                                    @click="getUserPractices(user._id)"
                                >
                                    همه تمرین ها
                                </v-btn>
                            </v-card-actions>
            
                            <v-expand-transition>
                                <v-card
                                    v-if="reveal == user._id"
                                    class="transition-fast-in-fast-out v-card--reveal"
                                    style="height: 100%;"
                                >
                                    <template v-if="practices.length">
                                        <v-divider></v-divider>

                                        <v-card-text v-for="(practice) in practices" :key="practice._id" class="pb-0 pt-0">
                                            <p class="d-flex align-baseline">{{practice?.createdAt | calender}}</p>
                                            <div class="text--primary fw-bold" v-text="practice?.time + ' دقیقه '"></div>
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
                                            این شخص هیچ تمرین دیگری ندارد
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
    </div>
</template>

<script>
import axios from "axios"
import filters from '@/mixins/filters.js';

export default {
    name: "practicePage",
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
            practices: []
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
                    this.searchUsers = [...this.users]
                })
                .catch(err => this.handle_error(err))
                .finally(() => this.userLoading = false)
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
            this.practices = []
            this.reveal = null
        },
        getUserPractices(userId) {
            this.users.forEach((user) => {
                if(user._id == userId) {
                    this.practices = [...user.practices]
                    this.practices.pop()
                    this.practices.reverse()
                }
            })
            
            this.reveal = userId
        },
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