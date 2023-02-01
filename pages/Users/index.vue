<template>
  <div>
    <h1 class="text-center font-[800] text-2xl mb-4">QUẢN LÝ NGƯỜI DÙNG</h1>
    <button class="btn mb-4 ml-16" @click="showCreateModal = true">
      + Tạo user mới
    </button>
    <div class="flex justify-center">
      <table class="border-collapse border border-slate-400 w-11/12">
        <thead>
          <tr class="bg-green-500">
            <th class="border border-slate-300">ID</th>
            <th class="border border-slate-300">NAME</th>
            <th class="border border-slate-300">EMAIL</th>
            <th class="border border-slate-300">PHONE NUMBER</th>
            <th class="border border-slate-300">UPDATE</th>
            <th class="border border-slate-300">DELETE</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="user in data.users"
            :key="user.id"
            class="hover:bg-green-300"
          >
            <td class="border border-slate-300 text-center">{{ user.id }}</td>
            <td class="border border-slate-300 pl-2">{{ user.name }}</td>
            <td class="border border-slate-300">{{ user.email }}</td>
            <td class="border border-slate-300 text-center">
              {{ user.phoneNumber }}
            </td>
            <td
              class="border border-slate-300 text-center hover:text-red-500 hover:bg-green-500"
              @click="
                onUpdate(user.id, user.name, user.email, user.phoneNumber)
              "
            >
              <button>
                <Update />
              </button>
            </td>
            <td
              class="border border-slate-300 text-center hover:text-red-500 hover:bg-green-500"
              @click="onConfirmDelete(user.id, user.name)"
            >
              <button><Delete /></button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <ModalConfirm
      :message="message"
      :userName="userNameToConfirm"
      v-show="showConfirm"
      @close-modal="showConfirm = false"
      @confirm="onDelete(id)"
    />
    <ModalCreateUser
      v-show="showCreateModal"
      @close-modal="showCreateModal = false"
    />
    <ModalUpdateUser
      :id="idProps"
      :user-name="nameProps"
      :email="emailProps"
      :phone-number="phoneNumberProps"
      v-show="showModal"
      @close-modal="showModal = false"
      @confirm-event="onDelete"
    />
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
import { Icon } from "#components";

const toast = useToast();

const Delete = h(Icon, { name: "fluent-mdl2:delete" });
const Update = h(Icon, { name: "fluent-mdl2:edit-contact", size: "20" });
const getUser = gql`
  query getUser {
    users {
      id
      name
      email
      phoneNumber
    }
  }
`;
const { data, refresh } = useLazyAsyncQuery(getUser);

const showCreateModal = ref(false);
const showConfirm = ref(false);
const showModal = ref(false);

const idProps = ref("");
const nameProps = ref("");
const emailProps = ref("");
const phoneNumberProps = ref("");
const onUpdate = (id, name, email, phoneNumber) => {
  showModal.value = true;
  idProps.value = id;
  nameProps.value = name;
  emailProps.value = email;
  phoneNumberProps.value = phoneNumber;
};

var message = ref("");
var id = ref();
var userNameToConfirm = ref("");
const onConfirmDelete = (userId, userName) => {
  showConfirm.value = true;
  message.value = "Xác nhận xóa người dùng";
  id = userId;
  userNameToConfirm = userName;
};
const onDelete = async id => {
  const deleteUser = gql`
    mutation deleteUser($input: DeleteUserInput!) {
      deleteUser(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      id: id,
    },
  };
  const { mutate, onDone } = useMutation(deleteUser, variables);
  mutate(variables);
  onDone(async () => {
    toast.success("Đã xóa user");
    await refreshNuxtData();
    await refreshNuxtData();
  });
};
</script>

<style lang="css" scoped></style>
