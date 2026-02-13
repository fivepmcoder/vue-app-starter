<template>
    <div class="relative flex h-dvh w-full overflow-hidden">
        <!-- <layout-sidebar class="shrink-0" /> -->
        <!-- 侧边栏 -->
        <div class="flex flex-1 flex-col overflow-hidden">
            <!-- 导航栏 -->
            <layout-header class="shrink-0" @toggle-theme="themeToggle" />
            <!-- 主内容 -->
            <div ref="scrollContainer" class="flex-1 overflow-y-auto" @scroll="scroll">
                <layout-main />
            </div>
        </div>
        <div
            v-show="isVisible"
            @click="scrollToTop"
            class="hover:text-textcolor/25 absolute right-3 bottom-6 h-6 w-6 cursor-pointer rounded-full transition-all"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-airplane"
                viewBox="0 0 16 16"
            >
                <path
                    d="M6.428 1.151C6.708.591 7.213 0 8 0s1.292.592 1.572 1.151C9.861 1.73 10 2.431 10 3v3.691l5.17 2.585a1.5 1.5 0 0 1 .83 1.342V12a.5.5 0 0 1-.582.493l-5.507-.918-.375 2.253 1.318 1.318A.5.5 0 0 1 10.5 16h-5a.5.5 0 0 1-.354-.854l1.319-1.318-.376-2.253-5.507.918A.5.5 0 0 1 0 12v-1.382a1.5 1.5 0 0 1 .83-1.342L6 6.691V3c0-.568.14-1.271.428-1.849Zm.894.448C7.111 2.02 7 2.569 7 3v4a.5.5 0 0 1-.276.447l-5.448 2.724a.5.5 0 0 0-.276.447v.792l5.418-.903a.5.5 0 0 1 .575.41l.5 3a.5.5 0 0 1-.14.437L6.708 15h2.586l-.647-.646a.5.5 0 0 1-.14-.436l.5-3a.5.5 0 0 1 .576-.411L15 11.41v-.792a.5.5 0 0 0-.276-.447L9.276 7.447A.5.5 0 0 1 9 7V3c0-.432-.11-.979-.322-1.401C8.458 1.159 8.213 1 8 1c-.213 0-.458.158-.678.599Z"
                />
            </svg>
        </div>
    </div>
</template>

<script setup lang="ts">
import { themeStore } from "@/store/theme/index";
import { nextTick, onMounted, ref } from "vue";
// import LayoutSidebar from "@/layout/sidebar/index.vue";
import LayoutHeader from "@/layout/header/index.vue";
import LayoutMain from "@/layout/main/index.vue";

// 初始化主题
const theme = themeStore();
onMounted(() => {
    theme.initTheme();
});

/**
 * 计算从点击位置到屏幕四角的最大距离
 * 确保圆形动画能够覆盖整个屏幕
 * @param x 点击x坐标
 * @param y 点击y坐标
 */
const computeMaxRadios = (x: number, y: number): number => {
    const maxX = Math.max(x, window.innerWidth - x);
    const maxY = Math.max(y, window.innerHeight - y);
    return Math.hypot(maxX, maxY);
};

/**
 * 主题切换逻辑
 * 使用 View Transitions API 实现从点击位置扩散的动画效果
 * @param event 点击事件对象
 */
const themeToggle = async (event: MouseEvent) => {
    // 检查浏览器是否支持
    const isSupported =
        "startViewTransition" in document &&
        !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    // 不支持的浏览器直接切换
    if (!isSupported) {
        theme.toggleTheme();
        return;
    }

    // 获取点击位置
    const x = event.clientX;
    const y = event.clientY;
    // 计算覆盖全屏所需的最大半径
    const endRadius = computeMaxRadios(x, y);

    // 启动视图过渡
    const transition = (document as any).startViewTransition(async () => {
        // 在回调中执行实际的主题切换
        theme.toggleTheme();
        await nextTick();
    });
    // 等待过渡完成
    await transition.ready;

    // 定义 clip-path 动画关键帧
    // 起始：点击位置的 0 像素圆
    // 结束：覆盖全屏的大圆
    const clipPath = [`circle(0px at ${x}px ${y}px)`, `circle(${endRadius}px at ${x}px ${y}px)`];

    // 应用动画到对应的伪元素
    document.documentElement.animate(
        {
            clipPath: theme.isDark ? [...clipPath].reverse() : clipPath
        },
        {
            duration: 600,
            easing: "cubic-bezier(0.4, 0, 0.2, 1)",
            pseudoElement: theme.isDark
                ? "::view-transition-old(root)"
                : "::view-transition-new(root)"
        }
    );
};

// 返回顶部按钮
const scrollContainer = ref<HTMLElement | null>(null);
const isVisible = ref(false);
const scroll = () => {
    const target = scrollContainer.value as HTMLElement;
    isVisible.value = target.scrollTop > 300;
};
const scrollToTop = () => {
    if (scrollContainer.value) {
        scrollContainer.value.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }
};
</script>
