<template>
  <div class="container">
    <div
      v-for="item in data.postsWithPagination.items"
      :key="item.id"
      class="bg-gray-200 rounded-lg hover:bg-gray-100 hover:ring-2 hover:ring-green-500 mt-4 h-52"
    >
      <NuxtLink :to="`/posts/${item.pageInfor.slug}`">
        <div class="p-2 grid grid-cols-3 gap-4">
          <img :src="item.project.images[0]" class="h-48 w-full" />
          <div class="col-span-2">
            <p class="font-bold text-slate-600">{{ item.pageInfor.title }}</p>
            <p>Trạng thái: {{ item.apartmentState }}</p>
            <p>Nhu cầu: {{ item.demand }}</p>
            <p>Ngày đăng: {{ item.createdAt }}</p>
            <p class="font-bold">Giá: {{ item.price }} VNĐ</p>
          </div>
        </div>
      </NuxtLink>
    </div>
    <Pagination :pageInfo="pageInfo" @updatePage="updatePage" />
  </div>
</template>

<script setup>
var skip = ref(0);
const query = gql`
  query getPost($skip: Int) {
    postsWithPagination(skip: $skip) {
      items {
        project {
          images
        }
        pageInfor {
          title
          slug
        }
        acreage
        apartmentNumber
        apartmentState
        block
        createdAt
        demand
        description
        direction
        doorDirection
        floor
        furnitures
        gallery
        galleryCount
        id
        isGalleryHasData
        lastUpdatedAt
        otherSpecification
        ownerId
        price
        projectId
        status
        tags
        totalBedRoom
        totalWC
        type
        usageAcreage
        view
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
      }
      totalCount
    }
  }
`;
const variables = ref({
  skip: skip.value,
});

const { data, refresh } = await useAsyncQuery(query, variables.value);

const num = data.value.postsWithPagination.totalCount;
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

<style lang="scss" scoped></style>
