<template>
  <div class="container">
    <h1 class="text-center font-[800] text-2xl mb-4">QUẢN LÝ BLOGS</h1>
    <NuxtLink :to="`/blogs/create-blog`">
      <button class="btn mb-4">+ Tạo blog mới</button>
    </NuxtLink>
    <ListBlog :status-of-blog="statusOfBlog" />
  </div>
</template>

<script setup>
const statusOfBlog = ["Publish", ""];
</script>

<style lang="css" scoped></style>
