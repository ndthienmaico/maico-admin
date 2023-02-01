<template>
  <div class="sm:container sm:ms-auto">
    <!-- Start header -->
    <h1 class="text-center font-[800] text-2xl mb-4">THÊM BÀI VIẾT MỚI</h1>
    <!--End header-->

    <!--Form input-->
    <!---- Tiêu đề -->
    <form>
      <p class="title">Tiêu đề</p>
      <input v-model="pageInfo.title.value" type="text" placeholder="Tiêu đề" />
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
          <input v-model="pageInfo.slug.value" type="text" placeholder="Slug" />
          <p class="title">Meta Description</p>
          <input v-model="pageInfo.meta.value" type="text" placeholder="Meta" />
          <p class="title">Thumbnail</p>
          <input id="thumnail" type="file" @change="upLoadImage" />
        </div>
      </div>
    </form>
    <button @click="Cancel" class="btn w-28 mr-20 bg-red-600 hover:bg-red-700">
      Hủy bỏ
    </button>
    <button @click="createBlog" class="btn mt-4" type="submit">
      Nạp và chờ xét duyệt
    </button>
    <!--End form input-->
  </div>
</template>

<script setup>
import { useToast } from "vue-toastification";
const toast = useToast();

const content = ref({});
const blogId = ref();
const authorId = ref("625a7c305c1e4de71170b18b");
const pageInfo = reactive({
  title: {
    type: String,
  },
  slug: {
    type: String,
  },

  meta: {
    type: String,
  },
});
const projectId = ref(null);
const thumbnail = ref("");

const upLoadImage = event => {
  console.log(">> Check event: ", event);
  const selectedFile = event.target.files[0];
  console.log(">> Check file: ", selectedFile);
  const fileName = selectedFile.name;
  console.log(">> Check file name: ", fileName);

  const Upload = gql`
    mutation loadImage($input: LoadImageInput!) {
      loadImage(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      filename: fileName,
      n: 0,
      postId: "123123",
      uri: selectedFile,
    },
  };
  const { mutate, onDone } = useMutation(Upload, variables);
  mutate(variables);
  onDone(() => {
    console.log(">>> Upload successful");
  });
};

//Cập nhật content
const onChange = data => {
  // console.log("component content was changed...");
  content.value = data;
};

//Cập nhật slug khi nhập title
const { $changeToSlug } = useNuxtApp();
watch(
  () => pageInfo.title.value,
  title => {
    pageInfo.slug.value = $changeToSlug(title);
  }
);
const getTotalCount = gql`
  query getTotal {
    blogsWithPagination {
      totalCount
    }
  }
`;
const totalCount = await useAsyncQuery(getTotalCount);
const total = totalCount.data.value.blogsWithPagination.totalCount;

const getArrBlog = gql`
  query {
    blogsWithPagination(take: ${total}) {
      items {
        id
        pageInfor{
          slug
        }
      }
    }
  }
`;
const { data } = await useAsyncQuery(getArrBlog);
const arrData = data.value.blogsWithPagination.items;

const checkSlug = slug => {
  for (let i = 0; i < arrData.length; i++) {
    if (slug === arrData[i].pageInfor.slug) {
      // toast.error("Slug này đã tồn tại!");
      return false;
    }
  }
  return true;
};

const checkId = id => {
  for (let i = 0; i < arrData.length; i++) {
    if (id === arrData[i].id) return false;
  }
  return true;
};

const createBlogId = async () => {
  do {
    const genRanHex = size =>
      [...Array(size)]
        .map(() => Math.floor(Math.random() * 16).toString(16))
        .join("");
    blogId.value = genRanHex(24);
  } while (!checkId(blogId.value));
};

const Cancel = () => {
  const router = useRouter();
  router.push("/");
};

const createBlog = () => {
  //Kiem tra & bao loi
  if (!pageInfo.title.value) {
    console.log("ERRRRRRRR title");
    toast.error("Tiêu đề không được để trống!");
    return;
  }
  if (!pageInfo.slug.value) {
    console.log("ERRRRRRRR title");
    toast.error("Slug không được để trống!");
    return;
  }
  if (content.value.blocks === undefined) {
    console.log("ERRRRRRRR content");
    toast.error("Nội dung không được để trống!");
    return;
  }
  if (!checkSlug(pageInfo.slug.value)) {
    console.log("ERRRRRRRR slug");
    toast.error("Slug này đã tồn tại!");
    return;
  }
  createBlogId();
  const createBlog = gql`
    mutation CreateBlog($input: CreateBlogInput!) {
      createBlog(input: $input) {
        string
      }
    }
  `;
  const variables = {
    input: {
      authorId: "625a7c305c1e4de71170b18b",
      blogId: blogId.value,
      content: JSON.stringify(content.value),
      pageInfor: {
        metaDescription: pageInfo.meta.value,
        slug: pageInfo.slug.value,
        title: pageInfo.title.value,
      },
      projectId: null,
      thumbnail:
        "https://e8rbh6por3n.exactdn.com/sites/uploads/2020/05/chung-cu-la-gi-thumbnail-770x515.jpg?strip=all&lossy=1&ssl=1",
    },
  };

  const { mutate, onDone } = useMutation(createBlog, variables);
  mutate(variables);
  onDone(async () => {
    const router = useRouter();
    toast.success("Tạo bài viết thành công");
    // await navigateTo("/blogs/confirm-blog");
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
input:focus,
textarea:focus {
  border-color: greenyellow;
}

textarea {
  height: 5rem;
}
</style>
