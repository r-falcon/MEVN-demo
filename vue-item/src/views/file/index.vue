<template>
  <div class="app-container">
    <h2>single</h2>
    <file-upload :limit="1" />
    <h2>multiple</h2>
    <file-upload />
  </div>
</template>

<script>
import FileUpload from "@/components/FileUpload/index";

export default {
  name: "File",
  components: { FileUpload },
};
</script>
