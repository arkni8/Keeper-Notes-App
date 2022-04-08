import axios from 'axios';


const API_URL = "/user/login"

export default async function login(formData) {
    const response = await axios.post(API_URL, formData);
    return response;
}