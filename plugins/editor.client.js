import EditorJS from "@editorjs/editorjs";
import Header from "@editorjs/header";
import List from "@editorjs/list";
import Table from "@editorjs/table";
import ImageTool from "@editorjs/image";
// import SimpleImage from "@editorjs/simple-image";

const defaultOptions = {
  id: "",
  data: {},
  onChange: () => {},
};

export default defineNuxtPlugin(nuxtApp => {
  return {
    provide: {
      editor: (options = defaultOptions) => {
        return new EditorJS({
          placeholder: "Let`s write an awesome story!",
          holder: options.id,

          tools: {
            header: {
              class: Header,
              config: {
                placeholder: "Enter a header",
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
            },
            table: {
              class: Table,
              inlineToolbar: true,
              config: {
                rows: 2,
                cols: 3,
              },
            },
            // images: SimpleImage,
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byFile: "http://localhost:8008/uploadFile", // Your backend file uploader endpoint
                  byUrl: "http://localhost:8008/fetchUrl", // Your endpoint that provides uploading by Url
                },
              },
            },
          },

          data: options.data || {},
          onChange(data) {
            options.onChange(data);
          },
          minHeight: 20,
        });
      },
    },
  };
});
