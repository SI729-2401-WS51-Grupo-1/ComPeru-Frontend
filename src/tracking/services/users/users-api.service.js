import http from "@/shared/services/http-common.js";

/**
 * UsersApiService class
 * @description Service class for making HTTP requests to the API
 */
export class UsersApiService {

    /**
     * Get all users from endpoint
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAllUsers() {
        return http.get("/maintracking/users");
    }

    /**
     * Get a user by its id
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getById(id) {
        return http.get(`/maintracking/users/${id}`);
    }
}