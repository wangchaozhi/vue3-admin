import { ref, onBeforeUnmount } from 'vue';
import { debounce } from 'lodash-es';

const defaultConfig = {
    defense: true, // 防止水印被删除
    color: '#c0c4cc',
    opacity: 0.5,
    size: 16,
    family: 'serif',
    angle: -20,
    width: 300,
    height: 200
};

/** 创建水印 */
export function useWatermark(parentEl = ref(document.body)) {
    let backupText = '';
    let mergeConfig = { ...defaultConfig };
    let watermarkEl = null;
    const observer = {
        watermarkElMutationObserver: undefined,
        parentElMutationObserver: undefined,
        parentElResizeObserver: undefined
    };

    /** 设置水印 */
    const setWatermark = (text, config = {}) => {
        if (!parentEl.value) {
            console.warn('请在 DOM 挂载完成后再调用 setWatermark 方法设置水印');
            return;
        }
        backupText = text;
        mergeConfig = { ...defaultConfig, ...config };
        watermarkEl ? updateWatermarkEl() : createWatermarkEl();
        addElListener(parentEl.value);
    };

    /** 创建水印元素 */
    const createWatermarkEl = () => {
        const isBody = parentEl.value.tagName.toLowerCase() === 'body';
        const watermarkElPosition = isBody ? 'fixed' : 'absolute';
        const parentElPosition = isBody ? '' : 'relative';

        watermarkEl = document.createElement('div');
        watermarkEl.style.pointerEvents = 'none';
        watermarkEl.style.top = '0';
        watermarkEl.style.left = '0';
        watermarkEl.style.position = watermarkElPosition;
        watermarkEl.style.zIndex = '99999';
        const { clientWidth, clientHeight } = parentEl.value;
        updateWatermarkEl({ width: clientWidth, height: clientHeight });

        parentEl.value.style.position = parentElPosition;
        parentEl.value.appendChild(watermarkEl);
    };

    /** 更新水印元素 */
    const updateWatermarkEl = (options = {}) => {
        if (!watermarkEl) return;
        backupText && (watermarkEl.style.background = `url(${createBase64()}) left top repeat`);
        options.width && (watermarkEl.style.width = `${options.width}px`);
        options.height && (watermarkEl.style.height = `${options.height}px`);
    };

    /** 创建 base64 图片 */
    const createBase64 = () => {
        const { color, opacity, size, family, angle, width, height } = mergeConfig;
        const canvasEl = document.createElement('canvas');
        canvasEl.width = width;
        canvasEl.height = height;
        const ctx = canvasEl.getContext('2d');

        if (ctx) {
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;
            ctx.font = `${size}px ${family}`;
            ctx.rotate((Math.PI / 180) * angle);
            ctx.fillText(backupText, 0, height / 2);
        }

        return canvasEl.toDataURL();
    };

    /** 清除水印 */
    const clearWatermark = () => {
        if (!parentEl.value || !watermarkEl) return;
        removeListener();
        try {
            parentEl.value.removeChild(watermarkEl);
        } catch {
            console.warn('水印元素已不存在，请重新创建');
        } finally {
            watermarkEl = null;
        }
    };

    /** 刷新水印 */
    const updateWatermark = debounce(() => {
        clearWatermark();
        createWatermarkEl();
        addElListener(parentEl.value);
    }, 100);

    /** 监听元素变化 */
    const addElListener = (targetNode) => {
        if (mergeConfig.defense) {
            if (!observer.watermarkElMutationObserver && !observer.parentElMutationObserver) {
                addMutationListener(targetNode);
            }
        } else {
            removeListener('mutation');
        }

        if (!observer.parentElResizeObserver) {
            addResizeListener(targetNode);
        }
    };

    /** 移除监听 */
    const removeListener = (kind = 'all') => {
        if (kind === 'mutation' || kind === 'all') {
            observer.watermarkElMutationObserver?.disconnect();
            observer.watermarkElMutationObserver = undefined;
            observer.parentElMutationObserver?.disconnect();
            observer.parentElMutationObserver = undefined;
        }

        if (kind === 'resize' || kind === 'all') {
            observer.parentElResizeObserver?.disconnect();
            observer.parentElResizeObserver = undefined;
        }
    };

    /** 添加 DOM 变化监听 */
    const addMutationListener = (targetNode) => {
        const mutationCallback = debounce((mutationList) => {
            mutationList.forEach(debounce((mutation) => {
                switch (mutation.type) {
                    case 'attributes':
                        mutation.target === watermarkEl && updateWatermark();
                        break;
                    case 'childList':
                        mutation.removedNodes.forEach((item) => {
                            item === watermarkEl && targetNode.appendChild(watermarkEl);
                        });
                        break;
                }
            }, 100));
        }, 100);

        observer.watermarkElMutationObserver = new MutationObserver(mutationCallback);
        observer.parentElMutationObserver = new MutationObserver(mutationCallback);

        observer.watermarkElMutationObserver.observe(watermarkEl, {
            attributes: true,
            childList: false,
            subtree: false
        });

        observer.parentElMutationObserver.observe(targetNode, {
            attributes: false,
            childList: true,
            subtree: false
        });
    };

    /** 添加 DOM 大小变化监听 */
    const addResizeListener = (targetNode) => {
        const resizeCallback = debounce(() => {
            const { clientWidth, clientHeight } = targetNode;
            updateWatermarkEl({ width: clientWidth, height: clientHeight });
        }, 500);

        observer.parentElResizeObserver = new ResizeObserver(resizeCallback);
        observer.parentElResizeObserver.observe(targetNode);
    };

    /** 卸载时清理 */
    onBeforeUnmount(() => {
        clearWatermark();
    });

    return { setWatermark, clearWatermark };
}
