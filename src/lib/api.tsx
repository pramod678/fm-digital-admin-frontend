import axios from "axios";


const token = localStorage.getItem("token")
const api = axios.create({
    baseURL: "https://fmdigitalofficial.in/api/v1" ,
    // baseURL: "https://fmdigitalofficial.in/api/v1" ,
    headers: {
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Origin": "*",
        'Authorization': `Bearer ${token}`
    }

});
export default api;
