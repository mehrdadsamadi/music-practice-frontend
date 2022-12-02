import dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/relativeTime"));
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);

export default {
	filters: {
		ago: date => dayjs(date).locale("fa").fromNow(),

		calender: date => dayjs(date).calendar("jalali").locale("fa").format("DD-MMMM-YYYY، ساعت HH:mm"),

		date: date => dayjs(date).calendar("jalali").locale("fa").format("DD-MMMM-YYYY"),

		comma: string => string ? string.toString().replace(/[,\D]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '',

		fullname: user => `${user.first_name || ''} ${user.last_name || ''}`.trim()
	}
}
