<template>
  <div>
    <p>Abouts</p>
    <button class="btn" @click="hello">hello</button>
    <br />
    <button class="btn mt-10" @click="showToast">Show Toast</button>
    <p><MyIcon /></p>
    <Login />
  </div>
</template>

<script setup>
import { Icon } from "#components";
import { useToast } from "vue-toastification";
const toast = useToast();
const showToast = () => {
  // use the toast notification plugin to show a success message
  toast.success("This is toast from Duc Thien", { timeout: 4000 });
  toast("Default toast");
  toast.info("Info toast");
  toast.success("Success toast");
  toast.error("Error toast");
  toast.warning("Warning toast");
};
const MyIcon = h(Icon, { name: "line-md:account-delete", size: 50 });

const hello = () => {
  alert("hello man");
};
</script>

<style lang="scss" scoped></style>
