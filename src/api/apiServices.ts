import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000";

export const getScores = async (sbd: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/user/${sbd}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu điểm số:", error);
        return null;
    }
};
export const getTop10 = async (name: string) => {
    try {
        const response = await axios.get(`${BASE_URL}/top10/${name}`);
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu điểm số:", error);
        return null;
    }
};
export const postClassify = async (subject:string) => {
    try {
        const response = await axios.post(`${BASE_URL}/classify`, {
            subject: subject,
        });
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy dữ liệu điểm số:", error);
        return null;
    }
};
export const postDetail = async (subject:string) => {
    try{
        const response = await axios.post(`${BASE_URL}/detail`, {
            subject: subject,
        });
        return response.data;
    } catch(error){
        console.error("Lỗi khi lấy dữ liệu điểm số:", error);
        return null;
    }
}
