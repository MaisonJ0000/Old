const _ = require('lodash');

const array = [1, 2, 3, 4, 5];
array

const slice = array.slice(0, 2);
slice

const slice1 = array.slice(3, 4);
slice1
array

const slice0 = array.slice(0, 0);
slice0

const sliceOver = [].slice(0, 1);
sliceOver

const splice = array.splice(0, 4);
splice

const push_arr = array;
push_arr.push(33);
push_arr

const deep = {
  a: { aa: 0, ab: 0, ac: 0 },
  b: { ba: 0, bb: 0, bc: 0 },
};
const clone = _.clone(deep);
clone

const array1 = [1, 2, 3];
const array2 = [4, 5];
const array3 = [6, 7, 8, 9];
const merge = [...array1, ...array2, ...array3]
merge


const dropMinusException = _.drop([1, 2, 3], -10);
dropMinusException

const [head] = [1, 2, 3];
head

const [headEmpty] = [];
headEmpty

try {
  const [headNull] = null;
  headNull
} catch(e) {
  e
}

const _headNull = _.head(null);
_headNull


const tmp = [ 1, 2, 2, 3, 4, 5, 6, 6, 13, 16 ];
let c = tmp.splice(3,4);
c
tmp

let arr = [1, 2, 0, 3];
_.compact(arr);
arr


let arrBeforeMap = [
  { id: 'a', val: 33 },
  { id: 'b', val: 44 },
  { id: 'c', val: 77 }
];
let result = _.reduce(arrBeforeMap, (map, obj) => {
  map[obj.id] = obj.val;
  return map;
}, {});
result


const tmp2 = [];
_.forEach(tmp2, r => r);


let incArr = _.map(new Array(5), (r, i) => i + 1);
incArr;

incArr.push(5)
incArr


const everyTrue = _.every([[]]);
everyTrue

const arrHavingNull = [null, undefined];
_.forEach(arrHavingNull, r => {
  console.log(_.get(r, 'hi'));
})

_.find([1,2], r => r === 1);

const aa = 3;
const bb = undefined
console.log('kk', _.every({aa, bb}));

const r = _.intersectionWith([{ k: 4, z: 7, a: 1, b:3 }, { k: 5, z: 7, a: 1, b:3 }], [{ a: 2}, {a : 1, b: 3}], (a, b) => {
  console.log("[JONGMAN_LOG] a", a, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  console.log("[JONGMAN_LOG] b", b, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  console.log("[JONGMAN_LOG] _.matches(a,b)", _.matches(a,b), new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  return _.isMatch(a, b);
});
r
