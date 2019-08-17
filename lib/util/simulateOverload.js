const store = {};
// 根据参数长度重载
function simulateOverload(fn) {
    if (!constructor instanceof Function) throw new Error('参数需为函数！');
    if (store[fn.name]) {
        store[fn.name][fn.length] = fn;
    } else {
        store[fn.name] = {};
        store[fn.name][fn.length] = fn;
    };
    return function () {
        const len = arguments.length;
        store[fn.name][len]();
    };
}

module.exports = simulateOverload;