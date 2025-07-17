import axios from 'axios';

const API_URL = 'http://localhost:3000/api/sweets';

export const getAllSweets = async (query = {}) => {
    try {
        const params = new URLSearchParams(query).toString();
        const response = await axios.get(`${API_URL}?${params}`);
        return response.data;
    } catch (err) {
        console.error('Error fetching sweets:', err);
        throw err;
    }
};

export const addSweet = (sweet) => axios.post(API_URL, sweet).then(res => res.data);

export const purchaseSweet = (id, quantity) =>
  axios.put(`${API_URL}/purchase/${id}`, { quantity }).then(res => res.data);

export const restockSweet = (id, quantity) =>
  axios.put(`${API_URL}/restock/${id}`, { quantity }).then(res => res.data);

export const deleteSweet = (id) => axios.delete(`${API_URL}/${id}`).then(res => res.data);

export const updateSweet = (id, sweetData) => axios.put(`${API_URL}/${id}`, sweetData).then(res => res.data);
