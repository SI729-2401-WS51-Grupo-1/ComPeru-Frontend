import http from "@/shared/services/http-common.js";


/**
 * PromosApiService class
 * @description Service class for making HTTP requests to the API
 */
export class PromosApiService {

    /**
     * Get all promos
     * @returns
     */

    getAll() {
        return http.get("/promos/promos");
    }
    getById(id) {
        return http.get(`/promos/promos/${id}`);
    }
    findByTitle(title) {
        return http.get(`/promos/promos?title=${title}`);
    }
}