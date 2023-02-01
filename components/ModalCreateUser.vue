<template>
  <div class="modal-overlay">
    <div class="modal">
      <h1 class="text-xl font-bold text-center mt-5">
        TẠO TÀI KHOẢN NGƯỜI DÙNG
      </h1>
      <form>
        <p class="mt-2">Tên</p>
        <input
          v-model="userName"
          type="text"
          class="input-group"
          placeholder="Your name"
        />
        <p class="mt-2">Email</p>
        <input v-model="email" class="input-group" placeholder="Your email" />
        <p class="mt-2">Số điện thoại</p>
        <input
          v-model="phoneNumber"
          class="input-group"
          placeholder="Your phone number"
        />
      </form>
      <div class="button-group grid grid-cols-2 gap-5">
        <button @click="$emit('close-modal')" class="bg-[#ac003e]">Hủy</button>
        <button @click="onSave" class="bg-[#12b488]">Lưu</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();

var userName = null,
  email = null,
  phoneNumber = null;

const getUser = gql`
  query getUser {
    users {
      email
      phoneNumber
    }
  }
`;
const { data } = await useAsyncQuery(getUser);
const arrData = data.value.users;

const checkEmail = email => {
  for (let i = 0; i < arrData.length; i++) {
    if (email === arrData[i].email) return false;
  }
  return true;
};
const checkPhoneNumber = phoneNumber => {
  for (let i = 0; i < arrData.length; i++) {
    if (phoneNumber === arrData[i].phoneNumber) return false;
  }
  return true;
};

const emit = defineEmits(["close-modal"]);

const onSave = async () => {
  if (userName === "" || userName === null) {
    toast.error("Vui lòng điền tên");
    return;
  }
  if (email === "" || email === null) {
    toast.error("Không để email trống!");
    return;
  }
  if (phoneNumber === "" || phoneNumber === null) {
    toast.error("Không để số điện thoại trống!");
    return;
  }
  if (!checkEmail(email)) {
    toast.error("Email này đã tồn tại!");
    return;
  }
  if (!checkPhoneNumber(phoneNumber)) {
    toast.error("Số điện thoại này đã tồn tại!");
    return;
  }
  const createUser = gql`
    mutation createUser($input: CreateUserInput!) {
      createUser(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      email: email,
      name: userName,
      phoneNumber: phoneNumber,
    },
  };
  const { mutate, onDone } = useMutation(createUser, variables);
  mutate(variables);
  onDone(async () => {
    await refreshNuxtData();
    userName = "";
    email = "";
    phoneNumber = "";
    toast.success("Tạo user thành công");
    emit("close-modal");
  });
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
  background-color: #000000b4;
}

.modal {
  background-color: white;
  height: 500px;
  width: 40%;
  margin-top: 10%;
  padding: 10px 10px;
  border-radius: 20px;
}

button {
  width: 130px;
  height: 40px;
  color: white;
  font-size: 14px;
  border-radius: 16px;
  margin: auto;
}
form {
  margin: 40px 20%;
}
input {
  width: 100%;
}
.button-group {
  margin: 10px 25%;
}
</style>
