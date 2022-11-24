/**
 * List of error messages with their status codes
 * to show appropriate notification to the user
 *
 * @var Object<number, string>
 */
const messages = {
	404: "صفحه مورد نظر شما یافت نشده است",
	403: "حساب کاربری شما دسترسی لازم جهت انجام این درخواست را دارا نیست",
	401: "برای انجام این درخواست میبایست ابتدا وارد حساب کاربری خود شوید",
	500: "خطایی در ارتباط با سرور رخ داده است ، لطفا دوباره تلاش کنید",
	503: "اتصال خود با اینترنت را بررسی کرده و دوباره تلاش کنید",
	Unkown: "ظاهرا خطایی رخ داده است ، لطفا مجددا تلاش کنید"
};

export default {
	methods: {
		/**
		 * Get the exception object and do appropriate tasks
		 *
		 * @param err Exception error catched
		 */
		handle_error(err, loading_field = null) {
			loading_field && (this[loading_field] = false);

			err.response.status === 422
				? this.handle_validation_error(err.response)
				: this.show_validation_error_notification(err.response);
		},

		/**
		 * Show notification to user base on error status code
		 *
		 * @param status error http status code
		 */
		show_validation_error_notification(res) {
			this.notify(
				res.data && res.data.message && /[\u0600-\u06FF\s]+/.test(res.data.message)
					? res.data.message
					: this.get_validation_message(res.status),
				"error"
			);
		},

		/**
		 * Get the error messages base on erroro status code
		 *
		 * @param status error http status code
		 */
		get_validation_message(status) {
			// status == 401 && setTimeout(() => window.location.href = "https://hologeram.ir/register", 1000);

			return messages[
				Object.keys(messages).includes(status.toString()) ? status : "Unkown"
			];
		},

		/**
		 * show the list of validation errors to the user
		 *
		 * @param err Exception object
		 */
		handle_validation_error(err) {
			this.notify(this.get_validation_errors_list(err.data.errors), "error");
		},

		/**
		 * cast errors object to html list content
		 *
		 * @param errors object of validation errors
		 */
		get_validation_errors_list(errors) {
			return (
				"<ul><li>" + this.flatten(Object.values(errors)).join("</li><li>") + "</li></ul>"
			);
		},

		/**
		 * Flat two dimentional array or matrix to simple array
		 *
		 * @param arr two dimentional array
		 */
		flatten(arr) {
			return Array.prototype.concat.apply([], arr);
		}
	},
}
