import jwtDecode from "jwt-decode";
import http from "./httpService";
import { apiUrl } from "../config.json";

const apiEndpoint = "http://sitecommerce/user/login?_format=json";
export function login(email, password){
    return http.post(apiEndpoint,{email,password});
}
