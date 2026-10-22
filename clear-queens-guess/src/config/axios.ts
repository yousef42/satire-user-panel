import axios from "axios";
import {TOKEN_KEY} from "../authProvider";


const http = axios.create({
    baseURL:'https://ws-offline-sales.indraproject.ir/api'
})


http.interceptors.request.use(config=>{

    config.headers['Authorization'] = 'Bearer ' + localStorage.getItem(TOKEN_KEY)
    return config
})

export default http