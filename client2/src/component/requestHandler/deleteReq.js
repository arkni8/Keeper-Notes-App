import axios from "axios";

// Route - /dashboard/del/:id

export default async function getRequest(NoteId, token) {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }
    const response = await axios.delete(`/dashboard/del/${NoteId}`, config);
    return response.data;
}