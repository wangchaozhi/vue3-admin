<template>
  <n-upload
      multiple
      directory-dnd
      action="http://127.0.0.1:3000/upload"
      :max="5"
  >
    <n-upload-dragger>
      <div style="margin-bottom: 12px">
        <n-icon size="48" :depth="3">
          <ArchiveIcon />
        </n-icon>
      </div>
      <n-text style="font-size: 16px">
        点击或者拖动文件到该区域来上传
      </n-text>
      <n-p depth="3" style="margin: 8px 0 0 0">
        请不要上传敏感数据，比如你的银行卡号和密码，信用卡号有效期和安全码
      </n-p>
    </n-upload-dragger>
  </n-upload>
</template>

<script>
import { defineComponent } from "vue";
import { ArchiveOutline as ArchiveIcon } from "@vicons/ionicons5";

export default defineComponent({
  components: {
    ArchiveIcon
  }
});
</script>