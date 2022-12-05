import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
		content: "",
		show: false,
		color: "success",
		timeout: 5000
	},

	prompt: {
		title: "",
		message: "",
		accept_btn: "",
		reject_btn: "",
		show: false,
		resolve: null,
	},

	seenMessage: true,

	user: null
  },
  getters: {
	get_state: (state) => (key) => {
		return state[key]
	}
  },
  mutations: {
	set_data(state, { key, data }) {
		state[key] = data;
	},

	set_state(state, { group, field, value }) {
		state[group][field] = value;
	},
  },
  actions: {
	loginUser({commit}) {
		axios.get('/auth/get-user')
			.then(({data}) => {
				commit("set_data", {key: "user", data: data.data.user})
			})
	},
	checkUnreadMessages({getters, commit}) {
		const user = getters.get_state("user")
		let seenResult = true

		user.messages.forEach(message => {
			if(message?.seen == false) {
				return seenResult = false
			}
		});
		
		commit("set_data", {key: "seenMessage", data: seenResult})
	},
  },
})
