<template>
  <div
    v-for="{ id, author, content, pageInfor, status, thumbnail } in data"
    :key="id"
    class="content"
  >
    <div class="font-bold text-4xl text-center mb-20">
      {{ pageInfor.title }}
    </div>
    <div class="font-bold mt-4">Trạng thái: {{ status }}</div>

    <div class="font-bold mt-5">Tác giả: {{ author.name }}</div>
    <div class="text-right mt-5">Ngày đăng: {{ createdAt }}</div>
    <div class="text-right">Ngày cập nhật: {{ lastUpdatedAt }}</div>

    <!-- xử lý chuỗi content => lấy block => đưa về obj => lấy text -->
    <Content :editorContent="content" />
    <!-- <div>{{ content }}</div> -->

    <!-- <img :src="thumbnail" /> -->
  </div>
  <div class="relative">
    <div class="ml-4 w-64 fixed top-20 right-20">
      <h2 class="font-bold text-2xl">Tùy chọn:</h2>
      <ul>
        <li>
          <NuxtLink :to="`/blogs/${slug}`">
            <button class="bg-[#12b488]" @click="Back">Trở về</button>
          </NuxtLink>
        </li>
        <li>
          <button class="bg-sky-500" @click="Update">Chỉnh sửa</button>
        </li>
        <li>
          <button class="bg-red-600" @click="onConfirmDelete">Xóa</button>
        </li>
      </ul>
    </div>
  </div>
  <ModalConfirm
    :message="message"
    :userName="null"
    v-show="showConfirm"
    @close-modal="showConfirm = false"
    @confirm="Delete"
  />
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const route = useRoute();
const showConfirm = ref(false);
const { $formatDate } = useNuxtApp();

const query = gql`
  query getBlog($input: BlogCollectionFilterInput!) {
    blog(where: $input) {
      author {
        email
        name
      }
      id
      content
      createdAt
      lastUpdatedAt
      pageInfor {
        metaDescription
        slug
        title
      }
      status
      thumbnail
    }
  }
`;
const slug = route.params.id;
const variables = {
  input: {
    pageInfor: {
      slug: {
        eq: slug,
      },
    },
  },
};

const { data } = await useAsyncQuery(query, variables);

if (!data.value) {
  throw createError({ statusCode: 404, statusMessage: "Product not found" });
}

// const createdAt = $formatDate(data.value.blog.createdAt);
const content = data.value.blog.content;
const createdAt = ref();
const lastUpdatedAt = ref();

onMounted(() => {
  createdAt.value = $formatDate(data.value.blog.createdAt);
  lastUpdatedAt.value = $formatDate(data.value.blog.lastUpdatedAt);
});

const id = data.value.blog.id;
const Back = () => {
  const router = useRouter();
  router.back();
};
const Update = () => {
  const router = useRouter();
  router.push(`/update-blog/${slug}`);
};

var message;
const onConfirmDelete = () => {
  showConfirm.value = true;
  message = "Xác nhận xóa blog hiện tại";
};
const Delete = () => {
  const deleteBlog = gql`
    mutation deleteBlog($input: DeleteBlogInput!) {
      deleteBlog(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      id: id,
    },
  };
  const { mutate, onDone } = useMutation(deleteBlog, variables);
  mutate(variables);
  onDone(() => {
    toast.success("Đã xóa blog");
    const router = useRouter();
    router.back();
  });
};
</script>

<style lang="css" scoped>
button {
  margin: 10px 0;
  padding: 2px 3px;
  width: 100px;
  border-radius: 5px;
  color: white;
}
button:hover {
  font-size: large;
}
.content {
  margin: auto auto;
  width: 50%;
}
</style>
