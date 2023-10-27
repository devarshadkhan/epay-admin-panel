import axios from "axios";
import { base_url } from "../services/axios";

export const Instance =axios.create({
    baseURL : base_url
})