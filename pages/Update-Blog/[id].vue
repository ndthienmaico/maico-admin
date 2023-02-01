<template>
  <div class="sm:container sm:ms-auto">
    <!-- Start header -->
    <h1 class="text-center font-[800] text-2xl mb-4">THÊM BÀI VIẾT MỚI</h1>
    <!--End header-->

    <!--Form input-->
    <!---- Tiêu đề -->
    <form>
      <p class="title">Tiêu đề</p>
      <input v-model="title" type="text" placeholder="Tiêu đề" />
      <!---- Input content -->
      <div class="flex gap-4">
        <div class="w-3/4 border p-4">
          <p>Nội dung:</p>
          <Editor :existingContent="content" @contentChanged="onChange" />
        </div>

        <!---- Thiết lập bài viết -->
        <div class="w-1/4 border p-4 max-h-96">
          <h2 class="text-center font-[700] text-xl mb-8">
            Thiết lập bài viết
          </h2>
          <p class="title">Slug</p>
          <input v-model="slug" type="text" placeholder="Slug" disabled />
          <p class="title">Meta Description</p>
          <input v-model="meta" type="text" placeholder="Meta" />
          <input type="file" />
        </div>
      </div>
    </form>
    <button @click="Cancel" class="btn w-28 mr-20 bg-red-600 hover:bg-red-700">
      Hủy
    </button>
    <button @click="saveBlog" class="btn w-28 mt-5" type="submit">Lưu</button>
    <!--End form input-->
  </div>
  <ModalConfirm
    :message="message"
    :userName="null"
    v-show="showConfirm"
    @close-modal="showConfirm = false"
    @confirm="router.back()"
  />
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();
const route = useRoute();
const router = useRouter();
const showConfirm = ref(false);
var message = "";

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
var slug = route.params.id;
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

const onChange = data => {
  // console.log("component content was changed...");
  content = data;
};

const id = data.value.blog.id;
var title = data.value.blog.pageInfor.title;
var meta = data.value.blog.pageInfor.metaDescription;
// Convert content:String to Object
var content = await JSON.parse(data.value.blog.content);

const changed = ref(false); // Biến kiểm tra sự thay đổi nội dung

const checkChanged = () => {
  if (
    title !== data.value.blog.pageInfor.title ||
    meta !== data.value.blog.pageInfor.metaDescription ||
    JSON.stringify(content) !== data.value.blog.content
  )
    return true;
  else return false;
};

const Cancel = () => {
  if (JSON.stringify(content) !== data.value.blog.content)
    console.log("changed");
  if (checkChanged()) {
    showConfirm.value = true;
    message = "Thoát và không lưu nội dung đã thay đổi";
    return;
  }
  router.back();
};

const saveBlog = () => {
  const updateBlog = gql`
    mutation updateBlog($input: UpdateBlogInput!) {
      updateBlog(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      authorId: "625a7c305c1e4de71170b18b",
      blogId: id,
      content: JSON.stringify(content),
      pageInfor: {
        metaDescription: meta,
        slug: slug,
        title: title,
      },
      projectId: null,
      thumbnail:
        "https://weblisting.hn.ss.bfcplatform.vn/blog/63b3e0f5031d9be54065c1bd/1672732941800_hinh-nen-one-piece-cho-may-tinh-11.jpg",
    },
  };
  if (!title) {
    console.log("ERRRRRRRR title");
    toast.error("Tiêu đề không được để trống!");
    return;
  }
  if (!content) {
    console.log("ERRRRRRRR content");
    toast.error("Nội dung không được để trống!");
    return;
  }

  const { mutate, onDone } = useMutation(updateBlog, variables);
  mutate(variables);
  onDone(() => {
    const router = useRouter();
    toast.success("Đã cập nhật bài viết");
    router.push("/blogs/confirm-blog");
  });
};
</script>

<style lang="css" scoped>
.title {
  font-weight: 700;
}
input,
textarea {
  padding: 0.25rem;
  border-width: 1px;
  width: 100%;
  margin-top: 0.25rem;
  margin-bottom: 2rem;
  border-style: outset;
  border-radius: 5px;
}
input[type="text"]:disabled {
  background: #f2f2f2;
  color: gray;
}
input:focus,
textarea:focus {
  border-color: greenyellow;
}

textarea {
  height: 5rem;
}
</style>
