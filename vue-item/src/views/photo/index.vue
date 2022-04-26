<template>
  <div class="app-container">
    <h2>single</h2>
    <image-upload :limit="1" />
    <h2>multiple</h2>
    <image-upload />
  </div>
</template>

<script>
import ImageUpload from "@/components/ImageUpload/index";

export default {
  name: "Photo",
  components: { ImageUpload },
};
</script>
