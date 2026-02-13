<template>
    <div class="flex flex-col items-center justify-center p-10">
        <!-- SVG -->
        <div class="relative h-64 w-64">
            <!-- 背景发光效果 -->
            <div class="bg-primary/10 absolute inset-0 animate-pulse rounded-full blur-3xl"></div>

            <svg
                viewBox="0 0 200 200"
                xmlns="http://www.w3.org/2000/svg"
                class="relative z-10 h-full w-full drop-shadow-xl"
            >
                <!-- 左边的 4 -->
                <text
                    x="20"
                    y="120"
                    class="fill-primary animate-[bounce_3.5s_infinite] text-7xl font-medium"
                >
                    4
                </text>

                <!-- 中间的 0 -->
                <g class="origin-[100px_100px] animate-[float_3s_infinite_ease-in-out]">
                    <!-- 幽灵身体 -->
                    <path
                        d="M70 130 V 95 A 30 30 0 0 1 130 95 V 130 L 120 120 L 110 130 L 100 120 L 90 130 L 80 120 L 70 130 Z"
                        class="fill-primary/10 stroke-primary stroke-round stroke-3"
                    />
                    <!-- 眼睛 -->
                    <g class="animate-pulse">
                        <circle cx="88" cy="95" r="3" class="fill-primary" />
                        <circle cx="112" cy="95" r="3" class="fill-primary" />
                    </g>
                    <!-- 脸红 -->
                    <circle cx="82" cy="102" r="2" class="fill-primary/30" />
                    <circle cx="118" cy="102" r="2" class="fill-primary/30" />
                </g>

                <!-- 右边的 4 -->
                <text
                    x="145"
                    y="120"
                    class="fill-primary animate-[bounce_3s_infinite] text-7xl font-black"
                >
                    4
                </text>

                <!-- 装饰小点 -->
                <circle cx="40" cy="160" r="4" class="fill-primary animate-ping" />
                <circle
                    cx="160"
                    cy="40"
                    r="3"
                    class="fill-primary animate-bounce [animation-duration:2s]"
                />
            </svg>
        </div>

        <!-- 文案与按钮 -->
        <div class="mt-8 text-center">
            <h1 class="text-textcolor text-2xl font-black tracking-tight">PAGE NOT FOUND</h1>
            <button @click="$router.back()" class="pbtn">返回上一页</button>
        </div>
    </div>
</template>
