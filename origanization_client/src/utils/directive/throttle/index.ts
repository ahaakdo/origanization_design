export default {
    mounted(el: any, binding: any) {
        let throttleTime = binding.value; // 节流时间
        if (!throttleTime) { // 用户若不设置节流时间，则默认2s
            throttleTime = 2000;
        }
        let cbFun: any;
        el.addEventListener('click', event => {
            if (!cbFun) { // 第一次执行
                cbFun = setTimeout(() => {
                    cbFun = null;
                }, throttleTime);
            } else {
                event && event.stopImmediatePropagation();
            }
        }, true);
    }
}