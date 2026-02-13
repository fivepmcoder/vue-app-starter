import nProgress from "nprogress";
import type { NavigationGuardNext, RouteLocationNormalized } from "vue-router";

nProgress.configure({
    speed: 1000,
    showSpinner: false
});

/**
 * 路由前置守卫
 */
export const beforGuard = (
    _to: RouteLocationNormalized,
    _form: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    nProgress.start();

    next();
};

/**
 * 路由后置守卫
 */
export const afterGuard = () => {
    nProgress.done();
};
