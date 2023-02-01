<template>
  <div id="editorjs"></div>
</template>

<script setup>
const props = defineProps({
  existingContent: {
    type: Object,
    default: () => {},
  },
});

var editor = reactive({});

const { $editor } = useNuxtApp();

onMounted(async () => {
  const editorOptions = reactive({
    id: "editorjs",
    data: props.existingContent,
    onChange: Save,
  });
  editor = $editor(editorOptions);
  await editor.isReady;
});

const emit = defineEmits(["contentChanged"]);
const Save = async event => {
  try {
    let updatedData = await editor.save();
    emit("contentChanged", updatedData);
  } catch (error) {
    console.log("Saving failed: ", error);
  }
};
</script>
