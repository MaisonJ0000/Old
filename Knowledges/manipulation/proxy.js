const _ = require('lodash');

// const handler = {
//   get: (target, name) => {
//     return name in target?
//       target[name] :
//       0;
//   }
// };
//
// const p = new Proxy({}, handler);
//
// p['abc'] = 3;
// p['1x1']++;
// p['1x1']++;
// p['2x2']++;
//
// console.log("[JONGMAN_LOG] p.a", p.a, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
// p
//
// const obj = _.cloneDeep(p);
//
// _.map(obj, el => {
//   console.log("[JONGMAN_LOG] el", el, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
// })


const arr = ['a', 'b', 'b', 'c', 'a', 'a'];
const cntMap = _.reduce(arr, (map, r) => {
  if (map[r]) map[r].push(r);
  else map[r] = [r];
  return map;
}, {});

cntMap

const handler = {
  get: (target, name) => name in target ? target[name] : [],
};
const p = new Proxy({}, handler);
_.forEach(arr, r => p[r] = [...p[r], r]);
const collectionMap = _.cloneDeep(p);

collectionMap
