<template>
  <div class="container pagination">
    <a href="#" @click="Previous">&laquo;</a>
    <span v-for="page in numPages" :key="page">
      <a
        v-if="page <= 6"
        href="#"
        :class="{ active: page === pageNow }"
        @click="choosePage(page)"
        >{{ page }}</a
      >
    </span>
    <a href="#" @click="Next">&raquo;</a>
  </div>
</template>

<script setup>
const props = defineProps({
  pageInfo: {
    type: Object,
    required: true,
  },
});
const totalNum = ref(props.pageInfo.totalNum);
const take = ref(props.pageInfo.take);
const skip = ref(props.pageInfo.skip);
const numPages = ref();
if (totalNum.value % take.value === 0) {
  numPages.value = totalNum.value / take.value;
} else {
  numPages.value = Math.floor(totalNum.value / take.value) + 1;
}
const pageNow = ref(1);

const emit = defineEmits(["updatePage"]);

const choosePage = page => {
  pageNow.value = page;
  skip.value = take.value * (pageNow.value - 1);
  emit("updatePage", skip.value);
};
const Previous = () => {
  if (pageNow.value > 1) {
    pageNow.value--;
    skip.value = take.value * (pageNow.value - 1);
  }
  emit("updatePage", skip.value);
};
const Next = () => {
  if (pageNow.value < totalNum.value) {
    pageNow.value++;
    skip.value = take.value * (pageNow.value - 1);
  }
  emit("updatePage", skip.value);
};

watch(
  () => pageNow.value,
  () => {}
);
watch(
  () => skip.value,
  () => {}
);
</script>

<style lang="css" scoped>
.pagination {
  display: inline-block;
  margin: 20px;
  display: flex;
  justify-content: center;
}

.pagination a {
  color: black;
  float: left;
  padding: 8px 16px;
  text-decoration: none;
}

.pagination a.active {
  background-color: #4caf50;
  color: white;
  border-radius: 5px;
}

.pagination a:hover:not(.active) {
  background-color: #ddd;
  border-radius: 5px;
}
</style>
