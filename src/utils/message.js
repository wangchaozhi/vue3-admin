import { useMessage } from 'naive-ui';

export const createMessage = (messageInstance) => ({
    success(msg) {
        messageInstance.destroyAll(); // 清除所有旧消息
        messageInstance.success(msg); // 显示新的成功消息
    },
    error(msg) {
        messageInstance.destroyAll(); // 清除所有旧消息
        messageInstance.error(msg); // 显示新的错误消息
    },
    warning(msg) {
        messageInstance.destroyAll(); // 清除所有旧消息
        messageInstance.warning(msg); // 显示新的警告消息
    },
    info(msg) {
        messageInstance.destroyAll(); // 清除所有旧消息
        messageInstance.info(msg); // 显示新的信息消息
    },
});
