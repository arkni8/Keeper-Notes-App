import axios from "axios";

// Route - /dashboard
// Return - all the notes for the authorised user.

export default async function getRequest(token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.get('/dashboard', config);
    return response.data;
}