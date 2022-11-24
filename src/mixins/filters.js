import dayjs from "dayjs";
dayjs.extend(require("dayjs/plugin/relativeTime"));
import jalaliday from "jalaliday";
dayjs.extend(jalaliday);
import Num2persian from 'num2persian';

export default {
	filters: {
		ago: date => dayjs(date).locale("fa").fromNow(),

		calender: date => dayjs(date).calendar("jalali").locale("fa").format("DD-MMMM-YYYY، ساعت HH:mm"),

		date: date => dayjs(date).calendar("jalali").locale("fa").format("YYYY-MMMM-DD"),

		simple_date: date => dayjs(date).calendar("jalali").locale("fa").format("DD MMMM"),

		en_to_fa_num: string => string.toString().replace(/\d/g,x => ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"][x]),

		num_to_persian(number, label = "", placeholder = "") {
			if (!number || number == 0) return placeholder;

			number = Num2persian(number)
			// number = (number
			// 	? Number.isInteger(number)
			// 	? number
			// 	: persianJs(number.replace(/,/g, "")).persianNumber() * 1
			// 	: 0
			// ).toPersianLetter();

			return `${number} ${label}`.trim();
		},

		price_label: price => {
			if ( price >= 1000000000000)
				return Math.round((price / 1000000000000) * 100) / 100 + " بیلیون";
			else if ( price >= 1000000000)
				return Math.round((price / 1000000000) * 100) / 100 + " میلیارد";
			else if ( price >= 1000000)
				return Math.round((price / 1000000) * 100) / 100 + " میلیون";
			else if ( price >= 1000)
				return Math.round((price / 1000) * 100) / 100 + " هزار";;

			return price;
		},

		comma: string => string ? string.toString().replace(/[,\D]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ",") : '',

		fullname: user => `${user.first_name || ''} ${user.last_name || ''}`.trim()
	}
}
