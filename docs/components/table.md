# 学习笔记：表格组件（table）

## 1.什么是表格组件

在 Vue 3 中，**表格组件**是用于显示和组织数据的 UI 组件。它通常由行和列构成，每个单元格可以包含文本、图像、链接等元素。表格组件非常适合用来展示结构化数据，比如数据库中的记录、统计数据、列表等。

---

### 2.表格组件与表单组件的关系和区别

- **关系**：

  - 表格组件和表单组件都是用于管理用户交互和数据展示的工具。在某些场景下，表格中可能会嵌入表单元素（如输入框、复选框等），以实现数据编辑或筛选的功能。

- **区别**：
  - **功能**：表单组件主要用于接收和提交用户输入的数据，而表格组件主要用于展示和组织数据。
  - **结构**：表单组件通常包含输入控件（如文本框、选择框、按钮等），而表格组件则由行、列和单元格构成。
  - **交互**：表单组件的交互侧重于数据收集，而表格组件则侧重于数据展示和交互（如排序、筛选等）。

---

### 3.表格组件的使用方式

1. **静态表格**：简单的数据展示，适合小数据集。
2. **动态表格**：从后端获取数据并动态渲染，适合大数据集。
3. **可编辑表格**：支持在表格中直接编辑数据，适合需要频繁修改的场景。
4. **可排序/筛选表格**：支持用户按列排序或筛选数据，适合需要查找特定数据的场景。

---

### 4.常见场景

- **数据展示**：展示用户信息、订单记录、产品列表等。
- **报表生成**：生成统计报表，如销售额、用户活跃度等。
- **数据管理**：允许用户查看、编辑和删除记录。

以下是三个具体的例子，包含代码和详细解释：

---

### 1. 静态数据表格

```
<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>张三</td>
        <td>28</td>
        <td>北京</td>
      </tr>
      <tr>
        <td>李四</td>
        <td>32</td>
        <td>上海</td>
      </tr>
      <tr>
        <td>王五</td>
        <td>24</td>
        <td>广州</td>
      </tr>
    </tbody>
  </table>
</template>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
```

**解释**：

- 这个表格展示了静态数据，包括姓名、年龄和城市。
- 使用 `<table>` 标签创建表格结构，`<thead>` 定义表头，`<tbody>` 定义表体。
- 使用 CSS 样式调整表格的外观。

---

### 2. 动态数据表格

```
<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>{{ user.name }}</td>
        <td>{{ user.age }}</td>
        <td>{{ user.city }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const users = ref([
  { name: '张三', age: 28, city: '北京' },
  { name: '李四', age: 32, city: '上海' },
  { name: '王五', age: 24, city: '广州' },
]);
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}
</style>
```

**解释**：

- 这个表格通过 `v-for` 指令动态渲染用户数据。
- `users` 是一个响应式数组，存储了用户信息。
- 表格结构与静态表格相同，但数据来源于 Vue 组件的状态。

---

### 3. 可编辑表格

```
<template>
  <table>
    <thead>
      <tr>
        <th>姓名</th>
        <th>年龄</th>
        <th>城市</th>
        <th>操作</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(user, index) in users" :key="index">
        <td>
          <input v-model="user.name" />
        </td>
        <td>
          <input v-model.number="user.age" type="number" />
        </td>
        <td>
          <input v-model="user.city" />
        </td>
        <td>
          <button @click="deleteUser(index)">删除</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const users = ref([
  { name: '张三', age: 28, city: '北京' },
  { name: '李四', age: 32, city: '上海' },
  { name: '王五', age: 24, city: '广州' },
]);

const deleteUser = (index: number) => {
  users.value.splice(index, 1);  // 从数组中删除用户
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  border: 1px solid #ddd;
  padding: 8px;
}

th {
  background-color: #f2f2f2;
}

input {
  width: 100%;
  padding: 5px;
  box-sizing: border-box;
}
</style>
```

**解释**：

- 这是一个可编辑的表格，用户可以直接在表格中修改信息。
- 每行包含输入框，可以修改用户的姓名、年龄和城市。
- 提供一个“删除”按钮，允许用户删除某一行数据，使用 `splice` 方法从数组中删除相应的用户。

---

### 总结

- **静态数据表格**：适合简单的静态数据展示。
- **动态数据表格**：适合需要从数组中动态生成表格的场景。
- **可编辑表格**：适合需要用户交互和实时编辑的场景。

通过这三个例子，可以在不同的场景下选择合适的表格组件，并根据需要自定义功能和样式。
