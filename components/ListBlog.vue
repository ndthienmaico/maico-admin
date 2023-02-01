<template>
  <div class="container">
    <div class="grid grid-cols-2 gap-4">
      <BlogCard
        v-for="{
          id,
          author,
          createdAt,
          lastUpdatedAt,
          pageInfor,
          status,
          thumbnail,
        } in data.blogsWithPagination.items"
        :key="id"
        :id="id"
        :author="author?.name"
        :createdAt="createdAt"
        :lastUpdatedAt="lastUpdatedAt"
        :slug="pageInfor.slug"
        :title="pageInfor.title"
        :status="status"
        :image="thumbnail"
        class="bg-slate-300 rounded-lg"
      />
    </div>
    <Pagination :pageInfo="pageInfo" @updatePage="updatePage" />
  </div>
</template>

<script setup>
const props = defineProps({
  statusOfBlog: {
    type: Array,
    required: true,
  },
});
// const pageInfo = props.pageInfo;
const status1 = props.statusOfBlog[0];
const status2 = props.statusOfBlog[1];
var skip = ref(0);

const query = gql`
  query getBlogsWithPagination($skip: Int, $status: BlogCollectionFilterInput) {
    blogsWithPagination(skip: $skip, where: $status) {
      items {
        author {
          name
        }
        createdAt
        id
        lastUpdatedAt
        pageInfor {
          slug
          title
        }
        status
        thumbnail
      }
      totalCount
    }
  }
`;

const variables = ref({
  skip: skip.value,
  status: {
    status: {
      or: [{ eq: status1 }, { eq: status2 }],
    },
  },
});

const { data, refresh } = await useAsyncQuery(query, variables.value);

const num = data.value.blogsWithPagination.totalCount;
const pageInfo = ref({
  take: 10,
  skip: skip.value,
  totalNum: num,
});

const updatePage = async data => {
  skip.value = data;
};

watch(
  () => skip.value,
  skip => {
    variables.value.skip = skip;
    refresh();
  }
);
</script>

<style lang="css" scoped></style>
