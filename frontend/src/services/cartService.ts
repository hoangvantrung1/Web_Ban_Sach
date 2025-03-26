import axios from "axios";

const API_URL = "http://localhost:3000/api/cart"; // Kiểm tra cổng đúng chưa

export const addToCart = async (userId: string, bookId: string, quantity: number) => {
    return await axios.post(`${API_URL}/add`, { userId, bookId, quantity });
};
