<template>
  <div class="mt-7 max-w-sm mx-auto text-center card">
    <p class="mt-7 text-7xl font-bold">{{ error.statusCode }}</p>
    <p class="mt-7 text-6xl">Ooops.</p>
    <p class="mt-7 text-ms">
      Hey you!!! What did you do??? Whatever, that's wrong
    </p>
    <p class="mt-7">{{ error.message }}</p>
    <button class="my-7 btn" @click="handleClearError">Go Home...</button>
  </div>
</template>

<script setup>
defineProps(["error"]);

const handleClearError = async () => {
  await clearError({ redirect: "/" });
  window.location.reload(true);
};
</script>

<style scoped></style>
