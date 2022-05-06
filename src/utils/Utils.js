import {toast} from 'react-hot-toast';
export const BASEURL = 'https://helpdeskcrm.herokuapp.com';
// export const BASEURL = "http://localhost:4000";

export const successToast = (message) => toast.success(message);
export const errorToast = (message) => toast.error(message);

export const createQueryString = ({email, phone, name, page}) => {
	var query = '?';
	if (page) query = query + `page=${page}&`;
	if (email) query = query + `email=${email}&`;
	if (name) query = query + `name=${name}&`;
	if (phone) query = query + `phone=${phone}&`;

	return query?.substring(0, query.length - 1);
};

// Public API Key: 6e0b98437220f87494a76c81543e941083aa6a4c85a2c87be5820372e87b82c9;

// Private API Key: pCPsHMMMZI2J2ZF4GAKB0v9XGxs0Yknxva1
