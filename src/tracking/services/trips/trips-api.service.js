import http from "@/shared/services/http-common.js";

/**
 * TripsApiService class
 * @description Service class for making HTTP requests to the API
 */
export class TripsApiService {

        /**
        * Get all trips
        * @returns
        */

        getAll() {
            return http.get("/maintracking/trips");
        }
        getById(id) {
            return http.get(`/maintracking/trips/${id}`);
        }
        findByTitle(title) {
            return http.get(`/maintracking/trips?title=${title}`);
        }
}