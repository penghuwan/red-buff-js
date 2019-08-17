function contructProxy(target, args) {
    // 按本来的方式创建对象
    const instance = new target(...args);
    // 拦截对象属性访问操作，屏蔽"_"前缀属性
    return new Proxy(instance, {
        get: function (target, key) {
            if (key.charAt(0) === "_") {
                // 访问私有变量报错
                throw new Error('私有变量不可访问');
            } else {
                // 公共变量则返回
                return target[key]
            }
        }
    })
}

function simulatePrivate(constructor) {
    if (!constructor instanceof Function) throw new Error('参数需为函数！')
    return new Proxy(constructor, {
        // 拦下构造函数的new操作
        construct: contructProxy
    })
}

module.exports = simulatePrivate;