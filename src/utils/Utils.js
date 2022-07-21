import {toast} from 'react-hot-toast';

export const BASEURL = 'http://thdworkbook.com:4000';

// export const BASEURL = "http://localhost:4000";

export const successToast = (message) => toast.success(message);
export const errorToast = (message) => toast.error(message);
export const pnrUrl = `https://api.pnrconverter.com/api`;
export const publicAppkey = `b8737f5ec27b026c77ffbfd96da9dfe4c8fe29cba2bef0740a62d2b989442eec`;
export const privateAppKey = `RcvPfDN8XtsQcwCGGQeZV1AKwgzPjpMSznM`;
export const createQueryString = ({email, phone, bookingid, page}) => {
	var query = '?';
	if (page) query = query + `page=${page}&`;
	if (email) query = query + `email=${email}&`;
	if (bookingid) query = query + `bookingid=${bookingid}&`;
	if (phone) query = query + `phone=${phone}&`;

	return query?.substring(0, query.length - 1);
};
