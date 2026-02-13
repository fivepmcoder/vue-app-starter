import type { HttpRequestConfig, HttpRequestError } from "@/http/schema";
import { createHttpRequest } from "@/http/factory";
import { loadingStore } from "@/store/loading";
import { toastStore } from "@/store/toast";

/**
 * 通用响应结构
 */
export interface ApiResponse<T = unknown> {
    // 业务状态码
    code: number;
    // 提示信息
    message: string;
    // 返回数据
    data?: T;
}

/**
 * 请求服务
 */
const baseHttp = createHttpRequest({
    baseURL: import.meta.env.VITE_BASE_API_URL,
    timeout: 30000,
    debug: import.meta.env.DEV,

    onShowLoading: (loading: boolean, config: HttpRequestConfig) => {
        const loadingInstance = loadingStore();
        if (loadingInstance) {
            loadingInstance.setLoading(loading, config.loadingText || "Loading");
        }
    },

    onSuccess: () => {
        const loadingInstance = loadingStore();
        if (loadingInstance) {
            loadingInstance.setLoading(false);
        }
    },

    onError: (err: HttpRequestError, requestConfig: HttpRequestConfig) => {
        const loadingInstance = loadingStore();
        if (loadingInstance) {
            loadingInstance.setLoading(false);
        }
        const toast = toastStore();
        if (requestConfig && requestConfig.showToast && toast) {
            toast.error(err.message);
        }
    }
});

/**
 * 脱壳包装
 */
const http = {
    request: <T>(config: HttpRequestConfig) => baseHttp<T>(config).then((result) => result.data),

    get: <T>(...args: Parameters<typeof baseHttp.get>) =>
        baseHttp.get<T>(...args).then((result) => result.data),

    post: <T>(...args: Parameters<typeof baseHttp.post>) =>
        baseHttp.post<T>(...args).then((result) => result.data),

    put: <T>(...args: Parameters<typeof baseHttp.put>) =>
        baseHttp.put<T>(...args).then((result) => result.data),

    delete: <T>(...args: Parameters<typeof baseHttp.delete>) =>
        baseHttp.delete<T>(...args).then((result) => result.data)
};

export default http;
