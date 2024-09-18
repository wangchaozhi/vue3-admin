<template>
  <div class="iframe-container">
    <!--    <iframe src="http://107.182.17.20:6969" frameborder="0" class="iframe-content"></iframe>-->
    <iframe :src="iframeSrc" frameborder="0" class="iframe-content"></iframe>
  </div>
</template>

<script setup>
let iframeSrc = '';
if (process.env.NODE_ENV === 'production') {
  // 生产环境，动态获取本地 IP
  iframeSrc = `http://${window.location.hostname}:6969`;
} else {
  // 开发环境，设置为 107.182.17.20:6969
  iframeSrc = 'http://107.182.17.20:6969';
}
</script>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100vh; /* 让 iframe 占满整个页面 */
}

.iframe-content {
  width: 100%;
  height: 100%;
}
</style>
