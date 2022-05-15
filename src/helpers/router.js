
import {createRouter, createWebHistory} from 'vue-router';

import HomePage from '../home/HomePage.vue'
import LoginPage from '../login/LoginPage.vue'


export const router = createRouter({
    history: createWebHistory(), 
    routes: [
        {path: '/', component: HomePage},
        {path: '/login', component: LoginPage},

        {path: '/:pathMatch(.*)*', redirect: '/'}
    ]
});

router.beforeEach((to, from, next) => {

    const publicPages = ['/login'];
    const authRequired = !publicPages.includes(to.path);
    const loggedIn = localStorage.getItem('user');

    if(authRequired && !loggedIn){
        return next({
            path: '/login', 
            query: {returnUrl: to.path}
        })   
    }

    next();
}) 

