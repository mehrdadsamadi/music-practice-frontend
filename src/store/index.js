import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    snackbar: {
		content: "",
		show: false,
		color: "info",
		timeout: 5000
	},

	prompt: {
		title: "",
		message: "",
		accept_btn: "",
		reject_btn: "",
		show: false,
		resolve: null
	},

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
  },
  modules: {
  }
})
