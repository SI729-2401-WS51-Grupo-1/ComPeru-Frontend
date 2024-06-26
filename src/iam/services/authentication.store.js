import {AuthenticationService} from "@/iam/services/authentication.service.js";
import {defineStore} from "pinia";
import {SignInResponse} from "@/iam/model/sign-in.response.js";
import {SignUpResponse} from "@/iam/model/sign-up.response.js";

const authenticationService = new AuthenticationService();

export const useAuthenticationStore = defineStore( {
    id: 'authentication',
    state:() =>({signedIn: false, userId: 0, userName: ''}),
    getters: {

        /*
            * It signed in
            * @summary
            * Returns true if user is signed in, otherwise false
            * @param state
            * @returns {boolean}
         */

        isSignedIn: (state) => state["signedIn"],

        /**
         * Current user id
         * @summary
         * Returns the current user's id
         * @param state
         * @returns {number}
         */
        currentUserId: state => state["userId"],

        /**
         * Current username
         * @summary
         * Returns the current username
         * @param state
         * @returns {string}
         */
        currentUsername: state => state["username"],

        /**
         * Current token
         * @returns {string} - The current token
         */
        currentToken:()=> localStorage.getItem('token')
    },
    actions: {
        async signIn(signInRequest, router){
            authenticationService.signIn(signInRequest)
                .then(response => {
                    let signInResponse = new SignInResponse(response.data.id,
                        response.data.usernam, response.data.token);
                    console.log(response.data);
                    this.signedIn = true;
                    this.userId = signInResponse.id;
                    this.username = response.data.usernam;
                    localStorage.setItem('token', signInResponse.token);
                    console.log(signInResponse);
                    router.push({name: 'routes'});
                })
                .catch(error => {
                    console.error(error);
                    router.push({name: 'sign-in'});
                });
        },
        async signUp(signUpRequest, router){
            try {
                const response = await authenticationService.signUp(signUpRequest);
                let signUpResponse = new SignUpResponse(response.data.message);
                console.log(signUpResponse.message);
                window.alert('Usuario creado correctamente'); // Muestra una alerta indicando que el usuario se registró correctamente
                router.push({ name: 'sign-in' }); // Redirige al usuario a la página de inicio de sesión
            } catch (error) {
                if (error.response && error.response.status === 500) {
                    console.log('El usuario ya existe'); // Puedes mostrar un mensaje o hacer alguna acción específica para este caso
                } else {
                    console.error(error);
                }
                router.push({ name: 'sign-up' });
            }
        },


        async signOut(router){
            this.signedIn = false;
            this.userId = 0;
            this.username = '';
            localStorage.removeItem('token');
            console.log('Signed out');
            await router.push({name: 'sign-in'});
        }
    }
})