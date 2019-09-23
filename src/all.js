// IntelliSense
import $ from 'jquery';
import _ from 'lodash';
import hexschool from './hexschool';
import { callSomeone } from './myPhone';

hexschool.basic();

const Casper = {
  name: '卡斯伯',
  job: '六角',
  family: {
    wife: '老婆',
    daughter: '女鵝',
  },
  /**
   * Doc
   * @param { String } someone 人名，卡斯伯跟你說安安
   */
  sayHello(someone) {
    console.log(`${this.name} 與 ${someone} 說安安`);
  },
};

console.log(Casper.name, Casper);
Casper.sayHello();

$.each(hexschool.teachers, (i, item) => {
  console.log(item);
});

_.each(hexschool.teachers, (i, item) => {
  console.log(item);
});

callSomeone();

window.setTimeout(() => {
  console.log('123');
  console.log($);
}, 100);
