import axios from "axios";

const api = axios.create({
    baseURL: "https://fmdigitalofficial.in/api/v1" ,
    headers: {
        'Access-Control-Allow-Credentials': true,
        "Access-Control-Allow-Origin": "*",
    }

});
export default api;
