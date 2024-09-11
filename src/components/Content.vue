<template>
  <div class="content">
    <div class="watermark">
      <div class="watermark-text">Confidential</div>
    </div>
    <n-message-provider>
      <!-- 这里是你的应用程序的内容 -->
      <router-view />
    </n-message-provider>
  </div>
</template>

<style scoped>
/* 内容容器样式 */
.content {
  position: relative; /* 必须相对定位，确保水印层能够覆盖在内容之上 */
  flex: 1;
  padding: 1.25rem;
  overflow-y: auto;
  box-sizing: border-box;
}

/* 水印层样式 */
.watermark {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none; /* 确保水印不会影响内容的交互 */
  opacity: 0.1; /* 调整水印的透明度 */
  z-index: 1000; /* 确保水印显示在最上层 */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* 水印文字样式 */
.watermark-text {
  font-size: 3rem;
  font-weight: bold;
  color: rgba(0, 0, 0, 0.5);
  transform: rotate(-30deg); /* 旋转水印文字 */
  white-space: nowrap;
}
</style>
