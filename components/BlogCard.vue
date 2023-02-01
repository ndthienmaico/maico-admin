<template>
  <div
    class="bg-gray-200 rounded-lg hover:bg-gray-100 hover:ring-2 hover:ring-green-500"
  >
    <div class="flex">
      <NuxtLink :to="`/blogs/${slug}`">
        <div class="p-2 grid grid-cols-3 gap-4">
          <img :src="image" />
          <div class="col-span-2">
            <p class="font-bold">{{ title }}</p>
            <p>
              Tác giả: <span> {{ author }}</span>
            </p>
            <p>
              Ngày tạo: <span> {{ createdAt }}</span>
            </p>
            <p>
              Ngày cập nhật: <span> {{ lastUpdatedAt }}</span>
            </p>
            <p>
              Trạng thái: <span> {{ status }}</span>
            </p>
          </div>
        </div>
      </NuxtLink>
      <div class="mr-4">
        <button
          class="bg-green-600 hover:bg-green-500"
          v-if="status === 'Draft' || status === 'Updated'"
          @click="Confirm"
        >
          Duyệt
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const { $formatDate } = useNuxtApp();

const createdAt = ref();
const lastUpdatedAt = ref();
onMounted(() => {
  createdAt.value = $formatDate(props.createdAt);
  lastUpdatedAt.value = $formatDate(props.lastUpdatedAt);
});

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    required: true,
  },
  lastUpdatedAt: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});
const id = props.id;
const statusBlog = props.status;
// const createdAt = $formatDate(props.createdAt);
// const lastUpdatedAt = $formatDate(props.lastUpdatedAt);

const Confirm = async () => {
  const confirmBlog = gql`
    mutation publishBlog($input: PublishBlogInput!) {
      publishBlog(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      id: id,
    },
  };
  const { mutate, onDone } = useMutation(confirmBlog, variables);
  mutate(variables);
  onDone(async () => {
    toast.success("Đã pushlish bài viết");
    await refreshNuxtData();
    await refreshNuxtData();
  });
};
</script>

<style lang="css" scoped>
span {
  font-style: italic;
  font-weight: 400;
}
img {
  border-radius: 10px;
  height: 150px;
  width: 300px;
  margin-left: auto;
  margin-right: auto;
}
button {
  margin: 10px 0;
  padding: 2px 3px;
  width: 60px;
  height: 140px;
  border-radius: 5px;
  color: white;
}
button:hover {
  font-size: large;
}
</style>
