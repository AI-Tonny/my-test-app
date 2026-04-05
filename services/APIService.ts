import axios, {AxiosInstance} from "axios";
import {JSON_PLACEHOLDER_BASE_URL} from "@/constants/urls";

class APIService {
    private static instance: APIService;
    private axiosInstance: AxiosInstance;

    private constructor() {
        this.axiosInstance = axios.create({
            baseURL: JSON_PLACEHOLDER_BASE_URL,
            timeout: 5000,
            headers: {
                "Content-Type": "application/json",
            }
        });
    }

    public static getInstance() {
        if (!APIService.instance) {
            APIService.instance = new APIService();
        }
        return APIService.instance;
    }

    public async getData(endpoint: string) {
        try {
            const response = await this.axiosInstance.get(endpoint);
            return response.data;
        }
        catch (error) {
            console.warn(error);
            throw error;
        }
    }
}

export default APIService;