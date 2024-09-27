import { createApp } from 'vue';
import Toast from 'vue-toastification';
import { createPinia } from 'pinia';
import 'vue-toastification/dist/index.css';
import './assets/style.css';
import App from './App.vue';
import { createRouter, createWebHistory } from 'vue-router';

// Import your components
import NotFound from './components/NotFound.vue';
import Route1 from "./components/Route1.vue";
import Route2 from "./components/Route2.vue";
import Home from "./components/Home.vue";


// Define your routes
const routes = [
    { path: '/', name: 'Root', component: Home},
    { path: '/route1', name: 'Route1', component: Route1},
    { path: '/route2', name: 'Route2', component: Route2},
    { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
];

// Create the router instance
const router = createRouter({
    history: createWebHistory(),
    routes,
});

const app = createApp(App);
app.use(Toast);
app.use(router);
app.use(createPinia());
app.mount('#app');
