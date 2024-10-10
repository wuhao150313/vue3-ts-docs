# 学习笔记：Vue组件概述

## 1.什么是组件？

在 Vue 3 中，组件是构建用户界面的基本单元。每个组件封装了与特定功能或界面部分相关的 HTML、CSS 和 JavaScript（或者 TypeScript）代码。它们是可复用、独立的模块，可以组合起来形成复杂的用户界面。

---

## 2.组件的优点：

### 复用性

组件可以在项目中多次使用，不需要重复编写相同的代码。

### 可维护性

每个组件都有清晰的职责，便于维护和调试。修改一个组件的代码不会影响其他部分。

### 可组合性

组件可以嵌套和组合，形成更复杂的界面结构。

### 隔离性

每个组件的样式、逻辑、状态是相对独立的，不会污染其他组件。

---

## 3.组件的使用方式

### 选项式组件（Options API）

Vue 2 时代常见的开发方式，使用 data、methods、computed 等属性定义组件的状态和行为。

### 组合式组件（Composition API）

Vue 3 推出的新 API，允许将逻辑更加灵活地拆分和复用。使用 setup 函数定义组件的逻辑。

### 函数式组件

一种没有状态和生命周期方法的组件，适用于简单的展示型组件。

---

## 4.常见的组件类型及应用场景

### 表单组件

如输入框、选择器等，常用于收集用户数据。

### 展示型组件

如卡片、列表，通常用于显示数据或内容。

### 布局组件

如导航栏、页脚，用于组织页面布局。

#### 例子 1

一个用户登录表单，输入用户名和密码，并在点击按钮后触发登录操作。

```vue
<template>
  <div>
    <input v-model="username" placeholder="请输入用户名" />
    <input v-model="password" type="password" placeholder="请输入密码" />
    <button @click="login">登录</button>
  </div>
</template>

<script lang="ts">
import { ref } from "vue";

export default {
  setup() {
    const username = ref("");
    const password = ref("");

    const login = () => {
      console.log("用户名:", username.value);
      console.log("密码:", password.value);
    };

    return { username, password, login };
  },
};
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>
```

#### 解释

使用 v-model 绑定表单的输入值。

setup 函数中定义了 username 和 password 作为响应式数据。

login 函数通过点击事件触发，输出表单内容。

#### 预期效果

用户输入用户名和密码，点击“登录”后在控制台打印输入内容。

---

#### 例子 2

一个可以倒计时的按钮，倒计时结束后按钮不可用。

```vue
<template>
  <div>
    <p>剩余时间: {{ time }}</p>
    <button @click="startCountdown" :disabled="isRunning">开始倒计时</button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

// 逻辑封装
const time = ref(10);
const isRunning = ref(false);
let intervalId: number | undefined;

const startCountdown = () => {
  if (isRunning.value) return;
  isRunning.value = true;

  intervalId = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      clearInterval(intervalId);
      isRunning.value = false;
    }
  }, 1000);
};
</script>

<style scoped>
button {
  margin-top: 10px;
}
</style>
```

#### 解释

time 定义了倒计时的剩余时间，isRunning 控制倒计时的启动和停止。

startCountdown 函数通过 setInterval 实现每秒倒计时，并在倒计时结束时停止计时。

### 预期效果

点击按钮后，开始倒计时，倒计时结束后按钮重新可用。

---

#### 例子 3

一个可以弹出提示的按钮，点击按钮后显示一条消息。

```vue
<template>
  <div>
    <button @click="showMessage">点击显示消息</button>
    <p v-if="visible">{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const message = ref("这是一个提示消息");
const visible = ref(false);

const showMessage = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 3000); // 3秒后隐藏消息
};
</script>

<style scoped>
button {
  margin-bottom: 10px;
}
</style>
```

#### 解释

message 和 visible 是组件的响应式数据，用于控制消息的内容和显示状态。

showMessage 函数点击后展示消息，并通过 setTimeout 3秒后自动隐藏。

### 预期效果

点击按钮后显示消息，3秒后消息自动消失。

---

## 5.组件的实现要点

### 逻辑与展示分离

通过组合式 API，逻辑部分可以封装为独立的 composables，便于复用和测试。

### 响应式数据管理

使用 ref 和 reactive 处理响应式数据，确保界面和数据状态的实时同步。

### 生命周期管理

像倒计时组件中使用的 setInterval，应通过生命周期钩子如 onUnmounted 进行清理，避免内存泄漏。
