import {useAuthenticationStore} from "@/iam/services/authentication.store.js";


export const authenticationInterceptor = (config) => {
    const authenticationStore = useAuthenticationStore();
    const isSignedIn = authenticationStore.isSignedIn;
    if (isSignedIn) {
        config.headers.Authorization = `Bearer ${authenticationStore.currentToken}`;
        console.log(config);
    }
    return config;
}