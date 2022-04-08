import axios from "axios";

// Route - /dashboard/update/:id

export default async function getRequest(noteId, noteData, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.put(`/dashboard/update/${noteId}`, noteData, config);
    return response.data;
}