import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    routes: [
        {
            path: "/",
            component: () => import("@/views/hasargs_table")
        },
        {
            path: "/noargs",
            component: () => import("@/views/noargs_table")
        }
    ]
})

export default router