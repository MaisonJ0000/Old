import _ from 'lodash';
import moment from 'moment';

const key1 = 'b';
const key2 = 'a';

const keyCandidates = [{key1}, {key2}];
const findKeyHavingVal = (arr) => _.findKey(_.merge(...arr), k => k);

const key = findKeyHavingVal(keyCandidates);



const is_checked_all = (head_col) => {
  const isChecked = col => modal_col_state[col];
  const targetFilter = col => (head_col === 'conversion_all') ? col !== 'ALL' : true;
  const target = _.filter(COL_MAP[head_col], targetFilter);
  return _.every(target, isChecked);
};



let date_set = [];

for (var d = new Date(); d <= moment(new Date()).add(3, 'days') ; d.setDate(d.getDate() + 1)) {
  date_set.push(moment(new Date(d)).format('YYYY-MM-DD'));
}

const date_set2 = _.reduce()

date_set
date_set2

key


let ext = 'a';

const str = `aaa${ext ? `.${ext}` : ''}`;
str


const arr = [1,2,3,4];
// _.remove(arr, r => r > 2); // [1, 2]


_.remove(arr, _.curry(_.gt)(_, 2));
console.log(arr)

let res = _.curry(_.gt)(_, 2);
res

// const curry2 = ftn => param2 => param1 => ftn(param1, param2);
// _.remove(arr, curry2(_.gt)(2)) // [1, 2]


arr
