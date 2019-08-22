![](https://img.shields.io/badge/syntax-ES6-blue)
![](https://img.shields.io/badge/release-1.0.0-brightgreen)
# red-buff-js
red-buff-js通过原生JavaScript工具函数的方式，模拟私有变量，抽象接口，函数重载等特性。它是一个给JS加的红BUFF，以增加法术和普攻效果，因此命名为red-buff-js。

## 个人知乎专栏文章
[给你的JS加个Buff吧](https://zhuanlan.zhihu.com/p/78612166)

# Description
+ **simulatePrivate: 模拟私有变量**
+ **simulateOverload: 模拟函数重载**
+ **simulateImplement: 模拟接口和实现**
# Usage
**simulatePrivate:模拟私有变量**
```js
const { simulatePrivate } = require('red-buff-js')

function People(name, height, age, weight) {
    this.name = name;      // 名字
    this.height = height;  // 身高隐瞒不了，设为公共变量
    this._age = age;       // 年龄是隐私，设为私有变量吧~
    this._weight = weight; // 体重是隐私，设为私有变量吧~
}
// 屏蔽所有带 _ 前缀的私有变量的外部访问
const ProxyPeople = simulatePrivate(People);
const people = new ProxyPeople("按F键进入的坦克", 170, 58, "坦克的重量");
// 输出
console.log(people.name);    // 输出:按F键进入的坦克
console.log(people.height);  // 输出:170
console.log(people._age);    // 报错:Error: 私有变量不可访问
console.log(people._weight); // 报错:Error: 私有变量不可访问
```

**simulateOverload:模拟重载**
```js
const { simulateOverload } = require('red-buff-js');
// 为了避免外部重载，只能以具名函数参数的方式添加
// 而且因为JS的弱类型限制，无法实现参数类型重载
simulateOverload(function fun(a) {
    console.log("1个参数");
});
simulateOverload(function fun(a, b) {
    console.log("2个参数");
});
let fn = simulateOverload(function fun(a, b, c) {
    console.log("3个参数");
});
fn(1);      // 1个参数
fn(1, 2);   // 2个参数
fn(1, 2, 3);// 3个参数
```
**simulateImplement:模拟接口和实现**
```js
const interface = {
    name: 'interface-1',
    fns: {
        method1: {
            argsType: ['string', 'number'],
            returnValue: 'boolean'
        },
        method2: {
            argsType: ['boolean'],
            returnValue: 'number'
        }
    },
}

function Construct() {
    this.method1 = function (str, num) { return true; }
    this.method2 = function (bool) { return 1 };
}

const { simulateImplement } = require('red-buff-js');
const implConstruct = simulateImplement(Construct, interface);

const construct = new implConstruct();
console.log(construct.method1("11", 1)); // true
console.log(construct.method2(true));    // 1
console.log(construct.method2(22));     // Error:方法参数列表类型不合接口要求
```
**Case: 如果把上面的Construct改成**
```js
function Construct() {
    this.method1 = function (str, num) { return 2; }
}
const construct = new implConstruct(); // 则new时报错: Error: 方法返回值类型不合接口要求
```
**备注**
实际上，我有一个可以实现根据参数类型重载的方案：修改函数原型，添加Function.prototype.setTypes(<Type Array>)，
 但是这种方式我认为有存在一定的风险，所以就此搁置
