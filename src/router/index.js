import {createRouter, createWebHistory} from "vue-router";
import PromosComponent from "@/tracking/pages/promos.component.vue";
import HistoryComponent from "@/tracking/pages/history.component.vue";
import ConfigComponent from "@/tracking/pages/config.component.vue";
import PayTicketComponent from "@/tracking/pages/pay-ticket.component.vue";
import SearchRoutesComponent from "@/tracking/pages/search-routes.component.vue";
import SupportComponent from "@/tracking/pages/support.component.vue";
//import LoginComponent from "@/tracking/pages/login.component.vue";
//import RegisterComponent from "@/tracking/pages/register.component.vue";
//import {getAuth} from "firebase/auth";
import SignUpComponent from "@/iam/pages/sign-up.component.vue";
import SignInComponent from "@/iam/pages/sign-in.component.vue";
import { useAuthenticationStore } from "@/iam/services/authentication.store.js";
const router  = createRouter({
    history: createWebHistory(),
    routes : [
        {path: '/promos', component: PromosComponent, meta: {title: 'Promociones'}},
        {path: '/history', component: HistoryComponent, meta: { title: 'Historial de viajes'}},
        {path: '/config', component: ConfigComponent, meta: {  title: 'Configuracion'}},
        {path: '/pay-ticket', component: PayTicketComponent, meta: {  title: 'Pagar Pasaje'}},
        {path: '/search-routes', name: 'routes', component: SearchRoutesComponent, meta: { title: 'Buscar Rutas'}},
        {path:'/support',component: SupportComponent,meta: {requiresAuth: true, title: 'Support'}},
        //{path: '/login', component: LoginComponent, meta: {title: 'Login'}},
        //{path: '/register', component: RegisterComponent, meta: {title: 'Register'}},
        {path: '/sign-in', name: 'sign-in', component: SignInComponent, meta: { title: 'Sign In' } },
        {path: '/sign-up', name: 'sign-up', component: SignUpComponent, meta: { title: 'Sign Up' } },
        {path: '/', redirect: '/sign-up'},

    ],
});

/*
router.beforeEach((to,
                   from,
                   next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (getAuth().currentUser) {
            next();
        }else {
            alert('No estas logueado');
            next('/login');
        }
    }
    let baseTitle = 'TrackMyRoute1';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});
*/

/**
 * Set business name as prefix for each page title
 */
/*router.beforeEach((to,
                   from,
                   next) => {
    let baseTitle = 'TrackMyRoute';
    document.title = `${baseTitle} | ${to.meta['title']}`;
    next();
});*/
router.beforeEach((to, from, next) => {
    const authenticationStore = useAuthenticationStore();
    if (to.matched.some(record => record.meta.requiresAuth) && !authenticationStore.isSignedIn) {
        next({ name: 'sign-in' });
    } else {
        next();
    }
});

export default router;
