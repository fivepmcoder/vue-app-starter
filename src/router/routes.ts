import type { RouteRecordRaw } from "vue-router";

export default [
    {
        path: "/",
        component: () => import("@/layout/index.vue"),
        children: [
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
