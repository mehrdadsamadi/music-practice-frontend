<template>
	<v-dialog v-model="prompt_show" max-width="290" content-class="prompt">
		<div class="card">
			<div class="card-body text-center">
				<div class="mb-5">
					<h5 class="text--primary mb-4" v-html="the_prompt.title"></h5>
					<div class="text-muted font-size-sm" v-html="the_prompt.message"></div>
				</div>

				<div class="row">
					<div class="col-6">
						<v-btn
							color="#F6F7FE"
							ref="submit"
							block
							depressed
							@click="prompt_show = false"
							v-text="the_prompt.reject_btn"
						></v-btn>
					</div>

					<div class="col-6">
						<v-btn
							color="error"
							block
							depressed
							@click="the_prompt.resolve(true);prompt_show = false;"
							v-text="the_prompt.accept_btn"
						></v-btn>
					</div>
				</div>
			</div>
		</div>
	</v-dialog>
</template>

<script>
export default {
	computed: {
		the_prompt: {
			get() {
				return this.$store.state.prompt;
			},
			set() {
				//
			}
		},

		prompt_show: {
			get() {
				return this.$store.state.prompt.show;
			},
			set(value) {
				this.$store.commit("set_state", {
					group: "prompt",
					field: "show",
					value
				});
			}
		}
	}
}
</script>

<style lang="scss">
.v-dialog.prompt {
	.v-card__title {
		word-break: break-word;
	}
}

.v-snack__wrapper {
	position: fixed !important;
	bottom: 0px;
	// left: 0px;
}
</style>
