import axios from 'axios';

const API_URL = "/user/register"

export async function register(formData) {
    const response = await axios.post(API_URL, formData)
    return response;
}