<template>
  <div class="justify-center mx-auto w-4/6">
    <h1 class="text-center font-[800] text-2xl mb-4">POST</h1>
    <NuxtLink :to="`/blogs/create-blog`">
      <button class="btn mb-4">+ Tạo post mới</button>
    </NuxtLink>
    <ListPost />
  </div>
</template>

<script setup></script>

<style lang="scss" scoped></style>
