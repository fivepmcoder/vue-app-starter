import type { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        redirect: "/music",
        children: [
            {
                path: "music",
                component: () => import("@/page/music/index.vue")
            },
            {
                path: "404",
                component: () => import("@/page/error/index.vue")
            },
            {
                path: ":pathMatch(.*)*",
                redirect: "/404"
            }
        ]
    }
] as RouteRecordRaw[];
