import http from "@/shared/services/http-common.js";

/**
 * NotificationsApiService class
 * @description Service class for making HTTP requests to the API
 */
export class NotificationsApiService {

    /**
     * Get all notifications from endpoint
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getAll() {
        return http.get("/notifications/notifications");
    }

    /**
     * Get a notification by its id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    getById() {
        return http.get(`/notifications/notifications/${id}`);
    }

    /**
     * Find a notification by its id
     * @param id
     * @returns {Promise<axios.AxiosResponse<any>>}
     */
    findById(id) {
        return http.get(`/notifications/notifications?id=${id}`);
    }
}