<template>
  <div class="modal-overlay">
    <div class="modal">
      <div class="text-center text-orange-400 my-3"><Confirm /></div>
      <h1 class="text-xl font-bold text-center">
        {{ message }}<span v-if="userName">: {{ userName }}</span>
      </h1>
      <div class="button-group grid grid-cols-2 gap-10">
        <button @click="$emit('close-modal')" class="bg-[#ac003e]">
          Hủy bỏ
        </button>
        <button @click="onConfirm" class="bg-[#12b488]">Xác nhận</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { Icon } from "#components";
const toast = useToast();
const Confirm = h(Icon, { name: "octicon:alert-fill-12", size: "70" });

const props = defineProps({
  message: {
    type: String,
    requied: true,
  },
  userName: {
    type: String,
  },
});

const emit = defineEmits(["confirm", "close-modal"]);
const onConfirm = () => {
  emit("close-modal");
  emit("confirm");
};
</script>

<style lang="css" scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: #0000006a;
}

.modal {
  background-color: white;
  height: 250px;
  width: 30%;
  margin-top: 20%;
  padding: 10px 10px;
  border-radius: 20px;
}

button {
  width: 100%;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin: auto;
}
.button-group {
  margin: 40px 15%;
}
</style>
