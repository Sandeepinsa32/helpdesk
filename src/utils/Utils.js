import { toast } from "react-hot-toast";
// export const BASEURL = 'https://helpdeskcrm.herokuapp.com';
export const BASEURL = "http://localhost:4000";

export const successToast = (message) => toast.success(message);
export const errorToast = (message) => toast.error(message);
