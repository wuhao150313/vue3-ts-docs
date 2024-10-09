# 学习笔记：Vueuse组件

### 学习笔记

---

#### 1. 什么是 Vue 组件？

Vue 组件是 Vue.js 框架中的核心概念，允许开发者将应用拆分为多个独立、可复用的单元。每个组件都有自己的逻辑、模板和样式，提供了一种模块化的开发方式。组件可以作为页面的独立部分使用，方便地组合和嵌套。

---

#### 2. Vue 组件功能涉及的需求

常见的需求包括：

- 数据绑定和更新：通过 `v-model` 实现双向数据绑定。
- 事件处理：通过 `@click` 等事件监听器处理用户交互。
- 样式与动画：可根据状态动态更新样式或应用动画。
- 状态管理：使用 `props` 和 `emit` 在父子组件之间传递数据。
- 响应式设计：通过 Vue 的响应式系统更新 UI。
- 本地存储：通过 `localStorage` 等浏览器 API 保存用户状态。

---

#### 3. 编写 Vue 组件时的要点

- **模板结构**：Vue 的 `.vue` 文件通常包括 `<template>`、`<script>` 和 `<style>` 三个部分。
- **响应式数据**：在 `setup` 中使用 `ref` 或 `reactive` 定义响应式变量。
- **事件绑定**：通过 `@event` 监听用户行为，如点击或输入。
- **模块化代码**：复杂的逻辑应封装成 composable 或 utils 文件，提高复用性。

---

## 4.例子讲解

### 第一个代码：VueUse 实现白天/夜间模式切换

```
<template>
    <div>
        <h1>小心眼睛</h1>
        <!-- 切换按钮，点击时调用 handleToggle 函数，显示当前模式 -->
        <button @click="handleToggle">
            切换到 {{ isDark ? '白天模式' : '黑夜模式' }}
        </button>
    </div>
</template>

<script setup lang="ts">
import { useDark, useToggle } from '@vueuse/core'
import { watch } from 'vue'

// 使用 VueUse 的 useDark 检测是否是夜间模式，useToggle 进行模式切换
const isDark = useDark() // 响应式变量，监控当前模式（黑暗或光明）
const toggleDarkMode = useToggle(isDark) // 返回一个切换模式的函数

// 点击事件处理函数
const handleToggle = () => {
    toggleDarkMode() // 切换当前模式
    document.body.classList.toggle('dark', isDark.value) // 根据模式添加或移除 'dark' 类
    console.log('当前模式:', isDark.value) // 控制台输出当前模式
}

// 监听 isDark 变化，将模式存入 localStorage 以便下次加载时恢复
watch(isDark, (newValue) => {
    localStorage.setItem('dark-mode', newValue ? 'true' : 'false')
})

// 初始化时从 localStorage 获取模式状态并应用
if (localStorage.getItem('dark-mode') === 'true') {
    isDark.value = true // 设置为夜间模式
    document.body.classList.add('dark') // 加载时立即应用 'dark' 类
}
</script>

<style>
/* 白天模式样式 */
body {
    background-color: white;
    color: black;
}

/* 夜间模式样式 */
body.dark {
    background-color: black;
    color: white;
}

button {
    padding: 10px;
    margin-top: 20px;
}
</style>
```

#### 预期效果：

运行代码时，页面会显示一个标题“**小心眼睛**”和一个按钮。点击按钮后，页面背景和文字颜色会切换，按钮上的文字显示当前的模式（白天或夜间模式）。切换后的模式会存储在 `localStorage` 中，刷新页面时保持用户上次选择的模式。

#### 重要组件详解：

- **`useDark` 和 `useToggle`**：来自 VueUse 库的 composable 函数。`useDark` 监控当前是否为夜间模式，`useToggle` 用于切换该模式。
- **`watch`**：监听 `isDark` 变化，动态保存用户选择的模式到 `localStorage`。
- **`localStorage`**：持久化存储，保证页面刷新后保留用户选择的模式。

#### 代码逻辑详解：

1. **`isDark` 和 `useDark`**：`isDark` 是一个响应式变量，实时跟踪当前的模式状态。`useDark` 判断系统的首选模式（如浏览器的黑暗主题设置），并在页面加载时自动应用。
2. **`toggleDarkMode`**：通过 `useToggle` 提供的函数来切换模式，每次点击按钮时调用。
3. **本地存储与恢复**：当用户选择了某种模式后，该选择会被存储在 `localStorage`，确保用户在刷新页面或重启浏览器时能够继续使用相同的模式。

---

### 第二个代码：音量调节

```
<template>
    <div class="container">
        <!-- 显示当前音量百分比 -->
        <p class="volume-text">当前音量: {{ volume }}%</p>
        <div class="controls">
            <!-- 滑块控制音量，v-model 绑定音量值 -->
            <input type="range" v-model="volume" min="0" max="100" />
            <!-- 按钮用于切换静音 -->
            <button @click="toggleMute" class="mute-btn">
                {{ isMuted ? '取消静音' : '静音' }}
            </button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useStorage } from '@vueuse/core';

// 保存音量值到 localStorage，初始化为 50%
const volume = useStorage('volume', 50);
const previousVolume = ref(volume.value); // 保存静音前的音量
const isMuted = ref(false); // 静音状态

// 切换静音功能
const toggleMute = () => {
    if (isMuted.value) {
        volume.value = previousVolume.value; // 恢复静音前音量
    } else {
        previousVolume.value = volume.value; // 记录当前音量
        volume.value = 0; // 设置为静音
    }
    isMuted.value = !isMuted.value; // 切换静音状态
};
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
}

.volume-text {
    font-size: 24px;
    margin-bottom: 20px;
}

.controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 300px;
}

input[type="range"] {
    width: 200px;
    margin-right: 20px;
}

.mute-btn {
    background-color: #90ee90;
    color: white;
    border: none;
    padding: 10px 20px;
    cursor: pointer;
    font-size: 10px;
    border-radius: 5px;
    transition: background-color 0.3s;
    width: 100px;
}

.mute-btn:hover {
    background-color: #32cd32;
}
</style>
```

#### 预期效果：

该组件允许用户通过滑块调节音量，当前音量以百分比显示。当点击按钮时，音量会设置为 0（静音），按钮文字也会随之变成“取消静音”；再次点击后，恢复静音前的音量值，并且按钮文字变为“静音”。

#### 重要组件详解：

- **`useStorage`**：VueUse 的 `useStorage` 提供了与 `localStorage` 同步的数据持久化功能，音量设置会自动保存在浏览器中，刷新页面时仍然有效。
- **`ref`**：`ref` 用于保存响应式数据，如 `volume` 和 `isMuted`，确保音量值和静音状态在界面更新时即时反映。

#### 代码逻辑详解：

1. **音量滑块**：使用 `v-model` 将滑块的值与 `volume` 变量双向绑定，用户拖动滑块时自动更新音量显示。
2. **静音功能**：通过点击按钮触发 `toggleMute` 函数，将音量设置为 0，并保存当前音量。再次点击时恢复之前的音量，保持用户体验一致性。
3. **持久化**：使用 `useStorage` 确保音量状态被保存在浏览器的 `localStorage` 中，页面刷新后仍能保留之前的音量设置。

---

### 第三个代码：选色板显示颜色编号

```
<template>
    <div class="container">
        <!-- 颜色选择器 -->
        <div class="color-picker-column">
            <input type="color" v-model="color" class="color-picker" />
        </div>
        <!-- 显示颜色值 -->
        <div class="color-display-column">
            <p>当前颜色:</p>
            <p class="color-code">16进制: {{ color }}</p>
            <p class="color-code">RGB: {{ rgbColor }}</p>
            <p class="color-code">HSL: {{ hslColor }}</p>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useColorConversion } from '../composables/useColorConversion' // 导入封装好的颜色转换逻辑

// 设置默认颜色为红色
const color = ref('#ff0000');

// 使用封装的 useColorConversion composable 进行颜色转换
const { rgbColor, hslColor } = useColorConversion(color);
</script>

<style scoped>
.container {
    display: flex;
    justify-content: space-around;
    align-items: flex-start;
    margin-top: 20px;
}

.color-picker-column,
.color-display-column {
    display: flex;
    flex-direction: column;
    align-items: center;
}

.color-picker {
    width: 100px;
    height: 100px;
    cursor: pointer;
    border: 2px solid black;
    /* 设置黑色边框，便于观察颜色差异 */
}

.color-code {
    margin-top: 10px;
    /* 与“当前颜色”标题保持一些距离 */
    font-weight: bold;
}
</style>
```

#### 预期效果：

- 页面包含一个颜色选择器，用户可以通过点击并选择不同的颜色。
- 选定颜色后，会实时显示该颜色的三种不同表示形式：
  - **16进制**（Hex）
  - **RGB**（红绿蓝）
  - **HSL**（色调、饱和度和亮度）

当颜色发生变化时，这三种表示会自动更新，反映当前颜色的变化。

#### 重要组件详解：

- **`useColorConversion`**：这是一个封装的 composable，专门用于将颜色从 16 进制格式转换为 RGB 和 HSL 格式。它是实现颜色转换逻辑的核心组件。
- **`v-model`**：用于将用户选中的颜色与 `color` 响应式变量双向绑定，实时更新颜色。
- **`color`、`rgbColor`、`hslColor`**：`color` 是用户选择的 16 进制颜色值，`rgbColor` 和 `hslColor` 分别是由 `useColorConversion` 计算得到的 RGB 和 HSL 值。

#### 代码逻辑详解：

1. **响应式的颜色选择**：通过 `v-model` 绑定颜色选择器与 `color` 变量，用户选择的颜色会实时存储在 `color` 中。
2. **颜色转换**：使用 `useColorConversion`，当 `color` 发生变化时，自动转换为 RGB 和 HSL 两种格式，分别通过 `rgbColor` 和 `hslColor` 显示。
3. **界面更新**：当用户选择颜色后，页面会实时更新，显示三种格式的颜色值。

---

### useColorConversion 的逻辑

```
import { computed, Ref } from 'vue';

export function useColorConversion(color: Ref<string>) {
    // 将16进制颜色转换为RGB格式
    function hexToRgb(hex: string) {
        const r = parseInt(hex.slice(1, 3), 16); // 解析红色分量
        const g = parseInt(hex.slice(3, 5), 16); // 解析绿色分量
        const b = parseInt(hex.slice(5, 7), 16); // 解析蓝色分量
        return `rgb(${r}, ${g}, ${b})`; // 返回RGB格式
    }

    // 将16进制颜色转换为HSL格式
    function hexToHsl(hex: string) {
        let r = parseInt(hex.slice(1, 3), 16) / 255;
        let g = parseInt(hex.slice(3, 5), 16) / 255;
        let b = parseInt(hex.slice(5, 7), 16) / 255;
        let max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h = 0, s = 0, l = (max + min) / 2;

        if (max != min) {
            let d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            switch (max) {
                case r: h = (g - b) / d + (g < b ? 6 : 0); break;
                case g: h = (b - r) / d + 2; break;
                case b: h = (r - g) / d + 4; break;
            }
            h *= 60;
        }
        s = s * 100;
        l = l * 100;
        return `hsl(${Math.round(h)}, ${Math.round(s)}%, ${Math.round(l)}%)`;
    }

    // 使用 computed 属性动态计算 RGB 和 HSL 值
    const rgbColor = computed(() => hexToRgb(color.value));
    const hslColor = computed(() => hexToHsl(color.value));

    return { rgbColor, hslColor };
}
```

#### 逻辑概述：

- **16 进制转 RGB**：`hexToRgb` 函数从字符串中提取 16 进制颜色代码，将每个颜色分量（红、绿、蓝）解析为十进制数值，然后返回标准的 RGB 格式字符串（如 `rgb(255, 0, 0)` 表示红色）。
- **16 进制转 HSL**：`hexToHsl` 函数将 16 进制颜色转换为 HSL（色调、饱和度、亮度）格式。色调用角度表示（0-360），饱和度和亮度为百分比。
- **computed**：`rgbColor` 和 `hslColor` 是计算属性，当 `color` 值变化时，它们会自动重新计算，确保 UI 实时更新。

#### 原理简述：

- **16 进制颜色** 是一种常用的颜色表示法，它由 6 位字符组成，每 2 位字符代表一个颜色分量（红、绿、蓝），范围从 00 到 FF（十进制为 0 到 255）。
- **RGB 模型** 直接表示颜色的三种基本光线成分（红、绿、蓝），常见于显示器。
- **HSL 模型** 则通过色调、饱和度和亮度来表示颜色，常用于设计和图形工具，因为它更符合人眼对颜色的感知。

---

#### 5.小结：

- **封装的好处**：`useColorConversion` 将复杂的颜色转换逻辑抽象为简单的函数调用，这样代码可维护性和可读性更高。开发者无需关心颜色转换的细节，只需传入颜色值即可获取结果。
- **实时更新**：通过 Vue 的 `computed` 实现，当颜色值变化时，RGB 和 HSL 会自动更新。这种响应式设计让用户能够立即看到更改后的效果。
- **综合运用 Vue 技术栈**：代码充分利用了 Vue 3 的 `ref`、`computed` 和 VueUse 库的优势，展示了如何在 Vue 组件中结合逻辑封装与响应式数据。

---

通过这三个示例代码，可以看到如何在 Vue 项目中有效地使用 VueUse 库以及封装逻辑。
