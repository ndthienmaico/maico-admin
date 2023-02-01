<template>
  <div>
    <template v-for="block in content.blocks">
      <h1
        v-if="block.type === 'header' && block.data.level === 1"
        :key="block.id"
        v-html="block.data.text"
        class="font-bold my-4"
      ></h1>

      <h2
        v-if="block.type === 'header' && block.data.level === 2"
        :key="block.id"
        v-html="block.data.text"
        class="font-bold my-4"
      ></h2>

      <h3
        v-if="block.type === 'header' && block.data.level === 3"
        :key="block.id"
        v-html="block.data.text"
        class="font-medium my-3"
      ></h3>

      <h4
        v-if="block.type === 'header' && block.data.level === 4"
        :key="block.id"
        v-html="block.data.text"
        class="font-medium my-2"
      ></h4>

      <h5
        v-if="block.type === 'header' && block.data.level === 5"
        :key="block.id"
        v-html="block.data.text"
        class="my-1"
      ></h5>

      <h6
        v-if="block.type === 'header' && block.data.level === 6"
        :key="block.id"
        v-html="block.data.text"
        class="my-1"
      ></h6>

      <p
        v-if="block.type === 'paragraph'"
        :key="block.id"
        v-html="block.data.text"
        style="text-align: {{block.data.alignment}};"
        class="my-2"
      ></p>
      <figure v-if="block.type === 'image'" :key="block.id">
        <img :src="block.data.file.url" class="mx-auto" />
        <!-- <figcaption class="mx-auto">{{ block.data.caption }}</figcaption> -->
      </figure>
    </template>
  </div>
</template>

<script setup>
const props = defineProps({
  editorContent: {
    type: String,
    required: true,
    default: () => {},
  },
});

let content = await JSON.parse(props.editorContent);

//Kiểm tra biến content qua props có bị đổi kiểu dữ liệu ko?
// let check = typeof content;
// if (check !== "object") {
//   content = await JSON.parse(content);
// }
</script>

<style lang="css" scoped></style>
