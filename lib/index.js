const simulatePrivate = require('./util/simulatePrivate.js')

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
// console.log(people.name); // 按F键进入的坦克
// console.log(people.height);  // 170
// console.log(people._age); // Error: 私有变量不可访问
// console.log(people._weight); // Error: 私有变量不可访问

const simulateOverload = require('./util/simulateOverload.js');
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
fn(1);
fn(1, 2);
fn(1, 2, 3);