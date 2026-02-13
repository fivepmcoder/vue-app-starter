import type {
    CreateHttpRequestConfig,
    HttpRequestConfig,
    HttpRequestInstance
} from "@/http/schema";
import { createAxiosInstance } from "@/http/core";

/**
 * 创建请求服务
 */
export const createHttpRequest = (config: CreateHttpRequestConfig = {}): HttpRequestInstance => {
    const instance = createAxiosInstance(config);

    /**
     * 通用请求方法
     */
    const http = <T = unknown>(requestConfig: HttpRequestConfig) => {
        return instance<T>(requestConfig);
    };

    /**
     * GET 请求
     */
    http.get = <T = unknown>(url: string, config?: Partial<HttpRequestConfig>) => {
        return http<T>({ url, method: "get", ...config } as HttpRequestConfig);
    };

    /**
     * POST 请求
     */
    http.post = <T = unknown>(url: string, config?: Partial<HttpRequestConfig>) => {
        return http<T>({ url, method: "post", ...config } as HttpRequestConfig);
    };

    /**
     * PUT 请求
     */
    http.put = <T = unknown>(url: string, config?: Partial<HttpRequestConfig>) => {
        return http<T>({ url, method: "put", ...config } as HttpRequestConfig);
    };

    /**
     * DELETE 请求
     */
    http.delete = <T = unknown>(url: string, config?: Partial<HttpRequestConfig>) => {
        return http<T>({ url, method: "delete", ...config } as HttpRequestConfig);
    };

    return http as HttpRequestInstance;
};
