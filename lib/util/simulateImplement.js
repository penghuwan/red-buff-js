
var typeOf = require('typeof');

// 接口模板, 类型数据按typeOf模块的要求填写
const interface = {
    name: 'interface-1',
    fns: {
        cb1: {
            argsType: ['string', 'number'],
            returnValue: 'boolean'
        },
        cb2: {
            argsType: ['boolean'],
            returnValue: 'number'
        }
    },
}
// [实现]的方法
function simulateImplement(constructor, interface) {
    if (!constructor instanceof Function) throw new Error('constructor参数需为构造函数！');
    if (!interface instanceof Object) throw new Error('interface参数需为对象');
    return new Proxy(constructor, {
        construct: function (target, args) {
            const instance = new target(...args);
            for (let fnName in interface.fns || {}) {
                const fn = instance[fnName];
                // 检查接口方法是否被全部实现
                if (!fn) {
                    throw new Error('%s对象未实现%s接口的%s方法', target.name, interface.name, fnName);
                }
                // 检查被实现的实例方法的参数数量是否和接口一致
                if (fn.length !== striction.argsType.length) {
                    throw new Error('%s对象的%s方法的长度和%s接口的要求不匹配', target.name, fnName, interface.name);
                };
                const striction = interface[fnName];
                const argsType = striction.argsType;
                const returnValue = striction.returnValue;
                // 在fn被调用前拦截，检查参数类型和返回值是否符合接口要求
                instance[fnName] = new Proxy(fn, {
                    apply: function (target, thisBinding, args) {
                        const isArgsOk = args.every((arg, index) => {
                            return typeOf(arg) === argsType[index]
                        })
                        const returnVal = Reflect.apply(...arguments);
                        const isReturnOk = typeOf(returnVal) === returnValue;
                        if (!isArgsOk) {
                            throw new Error('方法参数列表类型不合接口要求');
                        }
                        if (!isReturnOk) {
                            throw new Error('方法返回值类型不合接口要求');
                        }
                        return returnVal;
                    }
                });
            }
        }
    })
}