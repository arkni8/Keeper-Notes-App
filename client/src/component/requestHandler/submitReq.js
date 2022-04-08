import axios from "axios";

// Route - /dashboard/add

export default async function getRequest(noteData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.post('/dashboard/add', noteData, config);
    return response.data;
}