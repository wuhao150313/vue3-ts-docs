# Vue 3 组合式函数（Composables）

## 1. 组合式函数简介

组合式函数（Composables）是 Vue 3 中一种重用逻辑的方式，允许你将状态和行为封装在一个可复用的函数中。这种方式的好处在于提高了代码的可读性和可维护性，尤其在处理多个组件时，可以避免逻辑重复。

## 2.逻辑与示例分离的原因

将逻辑和示例分离可以实现以下几个目的：

#### 重用性

组合式函数可以在多个组件中复用，避免代码重复。

#### 可维护性

逻辑集中管理，便于修改和维护。

#### 清晰性

组件的结构更清晰，关注点分离，提升可读性。

## 3.编写逻辑和示例调用时的要点

### 函数接口清晰

确保组合式函数的返回值和参数明确，使得在组件中调用时简单易懂。

### 状态管理

确保状态（如计时器、短信发送状态、表单错误等）使用 Vue 的响应式 API 进行管理，以便自动更新视图。

### 清理资源

在适当的生命周期钩子（如 onUnmounted）中清理定时器等资源，避免内存泄漏。

## 4.例子讲解

### 通用的倒计时计时器逻辑

start, stop, reset: 控制计时器的开始、停止和重置。
time, isRunning: 响应式状态，管理当前剩余时间和计时器是否在运行。

```
import { ref, onUnmounted } from 'vue';

export function useCountdown(initialTime: number) {
  // 定义响应式变量
  const time = ref(initialTime); // 当前倒计时
  const isRunning = ref(false); // 计时器是否在运行
  let intervalId: number | undefined; // 存储计时器的 ID

  // 开始倒计时的函数
  const start = () => {
    if (!isRunning.value && time.value > 0) { // 只有在计时器未运行且时间大于0时才启动
      isRunning.value = true; // 设置为运行状态
      intervalId = window.setInterval(() => { // 每秒执行一次
        if (time.value > 0) {
          time.value--; // 每秒减少1
        } else {
          stop(); // 时间到达0时停止
        }
      }, 1000);
    }
  };

  // 停止倒计时的函数
  const stop = () => {
    isRunning.value = false; // 设置为未运行状态
    if (intervalId) clearInterval(intervalId); // 清除计时器
  };

  // 重置计时器的函数
  const reset = () => {
    stop(); // 停止当前计时器
    time.value = initialTime; // 重置时间为初始时间
  };

  // 在组件卸载时清理定时器
  onUnmounted(() => {
    if (intervalId) clearInterval(intervalId); // 清除计时器，避免内存泄漏
  });

  // 返回响应式状态和控制函数
  return { time, isRunning, start, stop, reset };
}

```

#### 响应式变量

使用 ref 创建的 time 和 isRunning 是响应式的，这意味着当它们的值改变时，Vue 会自动更新依赖于它们的组件。

#### 计时器的控制

start 方法首先检查 isRunning 和 time 的值，确保计时器在有效状态下启动。使用 setInterval 每秒减少 time，当时间到达0时自动停止计时。

#### 清理资源

使用 onUnmounted 钩子确保在组件销毁时，计时器被清除，以防止内存泄漏。

```
<template>
    <div>
      <p>Countdown: {{ time }}</p>
      <button @click="start" :disabled="isRunning">Start</button>
      <button @click="stop" :disabled="!isRunning">Stop</button>
      <button @click="reset">Reset</button>
    </div>
</template>

<script lang="ts" setup>
import { useCountdown } from '../composables/useCountdown';

const { time, isRunning, start, stop, reset } = useCountdown(10);
</script>

```

#### 预期结果

当用户点击“Start”按钮时，计时器开始倒计时，并在每秒更新显示的时间，直至时间到达0或用户点击“Stop”按钮。

### 通用的手机短信发送逻辑（模拟）

sendSms: 模拟发送短信的方法。
isSending, errorMessage: 管理发送状态和错误消息的响应式变量。

```
import { ref } from 'vue';

export function useSmsSender() {
  const isSending = ref(false); // 是否正在发送状态
  const errorMessage = ref(''); // 错误消息

  // 发送短信的函数
  const sendSms = (phoneNumber: string, message: string) => {
    isSending.value = true; // 设置为发送中
    errorMessage.value = ''; // 清空之前的错误信息

    setTimeout(() => { // 模拟发送延迟
      console.log(`短信发送到 ${phoneNumber}: ${message}`); // 控制台输出发送的短信
      isSending.value = false; // 发送完成后，更新状态
    }, 2000); // 模拟2秒发送延迟
  };

  // 返回状态和发送函数
  return { sendSms, isSending, errorMessage };
}

```

#### 发送状态管理

isSending 作为一个响应式变量，表示短信是否正在发送。可以用于在 UI 上显示发送状态。

#### 发送逻辑

sendSms 方法接收手机号和消息，首先将 isSending 设置为 true，然后使用 setTimeout 模拟短信发送的延迟。发送完成后，将 isSending 更新为 false。

#### 错误处理

虽然当前示例没有实现错误处理逻辑，但可以扩展 sendSms 函数，以便在发送失败时设置 errorMessage，并在 UI 中显示。

```
<template>
    <div>
        <input v-model="phoneNumber" placeholder="输入手机号" />
        <input v-model="message" placeholder="输入短信内容" />
        <button @click="send">发送短信</button>
        <p v-if="isSending">发送中...</p>
        <p v-if="errorMessage">{{ errorMessage }}</p>
      </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useSmsSender } from '../composables/useSmsSender';

export default defineComponent({
  setup() {
    const { sendSms, isSending, errorMessage } = useSmsSender();
    const phoneNumber = ref('');
    const message = ref('');

    const send = () => {
      sendSms(phoneNumber.value, message.value);
    };

    return { phoneNumber, message, send, isSending, errorMessage };
  },
});
</script>

```

#### 预期结果

用户输入手机号和短信内容，点击“发送短信”后，控制台打印发送信息，同时在界面显示“发送中...”的状态，2秒后状态更新。

### 表单验证组合式函数

validate: 根据给定规则验证字段。
required, minLength: 预定义的验证规则，用户可根据需要添加更多规则。

```
import { reactive } from 'vue';

export function useFormValidation() {
  const errors = reactive<{ [key: string]: string | null }>({}); // 存储每个字段的错误信息

  // 验证函数
  const validate = (field: string, value: string, rules: Array<(value: string) => string | null>) => {
    for (const rule of rules) { // 遍历所有规则
      const error = rule(value); // 执行规则并获取错误信息
      if (error) {
        errors[field] = error; // 设置错误信息
        return false; // 发现错误，返回false
      }
    }
    errors[field] = null; // 没有错误，设置为null
    return true; // 验证通过
  };

  // 预定义的验证规则
  const required = (value: string) => (value ? null : 'This field is required'); // 必填规则
  const minLength = (length: number) => (value: string) =>
    value.length >= length ? null : `Minimum length is ${length}`; // 最小长度规则

  // 返回错误信息和验证方法
  return { errors, validate, required, minLength };
}

```

#### 错误信息管理

使用 reactive 创建一个对象 errors，存储每个字段的错误消息，便于在表单中进行展示。

#### 验证流程

validate 函数接收字段名、字段值以及验证规则数组。通过遍历规则，调用每个规则函数并检查返回值，如果有错误，记录并返回 false，否则返回 true。

#### 规则定义

required 和 minLength 是简单的验证规则，使用函数返回错误信息或 null。你可以根据需要添加更多的规则，如 email, maxLength 等。

#### 错误处理

通过 errors 对象，表单组件可以直接访问每个字段的错误信息，展示给用户。

```
<template>
    <div>
      <input v-model="username" @blur="validateUsername" placeholder="Enter username" />
      <p v-if="errors.username">{{ errors.username }}</p>
      <button @click="submit">Submit</button>
    </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useFormValidation } from '../composables/useFormValidation';

const username = ref('');
const { errors, validate, required, minLength } = useFormValidation();

const validateUsername = () => {
  validate('username', username.value, [required, minLength(3)]);
};

const submit = () => {
  if (!errors.username) {
    console.log('Form submitted');
  }
};
</script>

```

#### 预期结果

当用户输入用户名并失去焦点时，触发验证。如果不符合规则，显示错误消息。提交按钮在没有错误时打印“Form submitted”。

## 总结

通过这些组合式函数，我们可以轻松地实现逻辑的重用和管理。以下是一些实现的要点：

### 响应式状态

使用 Vue 的响应式 API 管理状态，以便自动更新 UI。

### 清晰的接口

组合式函数应提供清晰的接口，以便于在组件中调用。

### 分离关注点

将业务逻辑与组件的 UI 部分分离，使得代码更易于维护。

### 灵活的扩展性

组合式函数可以根据需要进行扩展和修改，增加新的功能或规则，灵活应对不同的需求。

通过这些方法，你可以更高效地构建复杂的 Vue 应用，同时保持代码的简洁和可读性。
