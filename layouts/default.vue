<template>
  <div>
    <header class="container-md shadow-sm bg-white sticky top-0">
      <nav class="mx-auto p-4 flex justify-between text-xl">
        <NuxtLink event="" to="/" class="font-[900] text-3xl text-green-600"
          >MAICO ADMIN</NuxtLink
        >
        <ul class="flex gap-4">
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/">Blog</NuxtLink>
          </li>
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/blogs/confirm-blog">New Blog</NuxtLink>
          </li>
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/projects">Project</NuxtLink>
          </li>
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/posts">Post</NuxtLink>
          </li>
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/users">User</NuxtLink>
          </li>
          <li class="text-slate-500 hover:text-black active:font-bold">
            <NuxtLink to="/about">About</NuxtLink>
          </li>
        </ul>
      </nav>
    </header>

    <main class="container mx-auto p-4">
      <slot class="container mx-auto p-4"></slot>
    </main>

    <!-- <AppFooter /> -->
  </div>
</template>

<script setup>
const route = useRoute();
useHead({
  meta: [{ property: "og:title", content: `My App - ${route.meta.title}` }],
});
</script>

<style scoped>
.router-link-exact-active {
  color: rgb(22 163 74);
  font-weight: bold;
}
</style>
