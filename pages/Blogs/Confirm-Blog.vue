<template>
  <div class="container">
    <h1 class="text-center font-[800] text-2xl mb-4">DUYỆT BLOGS</h1>
    <ListBlog :status-of-blog="statusOfBlog" />
  </div>
</template>

<script setup>
const statusOfBlog = ["Draft", "Updated"];
</script>

<style lang="css" scoped></style>
