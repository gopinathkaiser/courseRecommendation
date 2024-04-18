import axios from "axios";

export default axios.create({
    withCredentials:false,
    baseURL: 'http://192.168.1.138:8080',
});