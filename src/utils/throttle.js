const throttle = {
    bind: (el, binding) => {
        let throttleTime = binding.value; // 获取传入的节流时间
        if (!throttleTime) {
            throttleTime = 1000; // 如果用户没有传入时间，默认1秒
        }

        let lastTime = 0; // 记录上次执行的时间
        el.addEventListener('click', event => {
            const now = Date.now(); // 获取当前时间
            if (now - lastTime < throttleTime) {
                event && event.stopImmediatePropagation(); // 阻止事件传播
                return; // 如果距离上次点击时间不足 throttleTime，则不执行操作
            }

            lastTime = now; // 更新上次执行的时间
            // 如果已经过了 throttleTime，允许点击事件继续传播
        }, true); // 捕获阶段绑定事件
    }
};

export default throttle;
