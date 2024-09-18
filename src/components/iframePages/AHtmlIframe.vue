<!-- AHtmlIframe.vue -->
<template>
  <div class="iframe-container">
    <iframe src="/aria2.html" frameborder="0" class="iframe-content"></iframe>
  </div>
</template>

<style scoped>
.iframe-container {
  width: 100%;
  height: 100%;
}

.iframe-content {
  width: 100%;
  height: 100vh; /* 让 iframe 占满整个视窗 */
}
</style>
