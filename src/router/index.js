import { createRouter, createWebHistory } from 'vue-router'
import Home from '/src/components/Home.vue'
import About from '/src/components/About.vue'
import DetailsCard from '/src/components/DetailsCard.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
        children: [
            {
                path: '/meeting/:id',
                name: 'Meeting',
                component: DetailsCard
            },
        ]
    },
    {
        path: '/about',
        name: 'About',
        component: About,
    },
    // {
    //     path: '/meeting/:id',
    //     name: 'Meeting',
    //     components:  DetailsCard 
    // },
]
const router = createRouter({
    //history: createWebHistory('/sagrafik-microfrontend/'),
    history: createWebHistory(''),
    routes,
})

export default router
