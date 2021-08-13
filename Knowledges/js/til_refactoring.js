import _ from 'lodash';
// 3.10.1 이하 버전의 기능만 다루었다.

// 1: 의도를 동사 형태 (함수) 로 먼저 드러내기

const objects = [
  { 'a': 1, 'b': 2, 'c': 3 },
  { 'a': 4, 'b': 5, 'c': 6 },
]

const filtered1 = _.filter(objects, obj => obj.a === 4 && obj.c === 6);
// 끝까지 눈으로 읽고 나서야 의도가 파악된다.
filtered1

const filtered2 = _.filter(objects, _.matches({ 'a': 4, 'c': 6 }));
// 코드 한 줄을 끝까지 가기도 전에 matches를 보고 특정 부분과 일치하는 것을 필터링한다는 의도 자체를 바로 파악할 수 있다.
filtered2



// 2: 어순

const 내가먹은과일 = _.set({}, 'a.b.c', '바나나');
내가먹은과일

const checkIsContains = ['사과', '바나나', '포도'].indexOf(_.get(내가먹은과일, 'a.b.c')) > -1;
checkIsContains
// 읽히는데 큰 무리는 없다. 하지만 과일 이름들이 먼저 나열되는데 어떤 의도인지 잘 모르겠다. 만약 글쓰기나 말하기를 하는데 사과, 바나나, 포도까지 이야기하고 ... 생략한다면 답답할 것이다.

const isOneOf = (val, arr) => (new Set(arr)).has(val);
const checkIsContains2 = isOneOf(_.get(내가먹은과일, 'a.b.c'), ['사과', '바나나', '포도'])
// 우선 isOneOf로 x가 y에 속하는지를 궁금해한다는 것을 바로 알 수 있다. 관심사(x)는 내가먹은과일의 a->b->c 인 것이 처음부터 드러난다. 그 이후에 배열이 등장하므로 이 중 하나가 될 수 있을거라고 생각한다.
checkIsContains2



// 3. 한 눈에 볼 수 있는 분기

const tab = 'a';
let title = '';

if (tab === 'a') title = 'aa';
if (tab === 'b') title = 'bb';
if (tab === 'c') title = 'cc';
title
// 만약에 title이라는 변수 이름이 바뀐다면?

const TAB_TO_TITLE = {
  a: 'aa',
  b: 'bb',
  c: 'cc',
}
title = TAB_TO_TITLE[tab] || '';
title



// 3-2. 한 눈에 볼 수 있는 함수 분기

const tab_data = {
  tab: 'a',
  price: 500,
}

if (tab_data.tab === 'a') {
  title = tab_data.price > 300 ? 'kaa' : 'aa';
}
if (tab_data.tab === 'b') {
  title = tab_data.price > 700 ? 'kbb' : 'bb';
}
if (tab_data.tab === 'c') {
  title = tab_data.price > 400 ? 'kcc' : 'cc';
}
title
// 만약에 title이라는 변수 이름이 바뀐다면?

const tab_to_title_getter_by_price = {
  a: (price) => price > 300 ? 'kaa' : 'aa',
  b: (price) => price > 700 ? 'kbb' : 'bb',
  c: (price) => price > 400 ? 'kcc' : 'cc',
};
const titleGetterByPrice = tab_to_title_getter_by_price[tab] || (() => '');
title = titleGetterByPrice(tab_data.price);
title



// 4: 조건문

const shouldBeTrue = true;
const shouldBeFalse = false;
const cond1 = false;
const alt_cond1 = true;
const all_pass_cond = false;

if (!all_pass_cond && (!shouldBeTrue || shouldBeFalse || !(cond1 || alt_cond1))) {
  console.error('ERR! 필수 파라미터 부족!');
}
// if 절의 모든 부분을 따져봐야한다. 특히 괄호 안의 괄호 부분은 무슨 의미인지 한참 찾아봐야 한다.

const requirements = [shouldBeTrue, !shouldBeFalse, cond1 || alt_cond1];
const alt_requirement = all_pass_cond;

const is_cond_pass = _.every(requirements) || alt_requirement;
if (!is_cond_pass) {
  console.error('ERR! 필수 파라미터 부족!');
}
// every를 통해 대충 requirements는 모두 만족해야 하는 값이라는 것을 바로 유추할 수 있다. 그리고 alt가 or절로 묶여있어 alternative한 조건 만족이 따로 있다는 것을 유추할 수 있다.



// 5: chaining

const widget_list = [
  { widget_id: 'a', url: 'aa' },
  { widget_id: 'b', url: 'bb' },
  { widget_id: 'b', url: 'cc' },
];

const widget_ids = _.map(widget_list, widget => widget.widget_id);
const uniq_ids1 = _.uniq(widget_ids);
// 가독성에 나쁘진 않은데, widget_ids를 가져오는 부분에서 보통은 중복이 없을 것으로 기대를 하기 마련이다. uniq 절을 보고서야 비로소 중복이 있어서 이렇게 코드를 작성했음을 유추한다.
uniq_ids1

const uniq_ids2 = _(widget_list)
  .map(r => r.widget_id)
  .uniq()
  .value();
uniq_ids2
// chaining

const getWidgetIdFromWidgets = (widgets) => _.map(widgets, r => r.widget_id);
const getUniqWidFromWidgets = _.flow(getWidgetIdFromWidgets, _.uniq);
const uniq_ids3 = getUniqWidFromWidgets(widget_list);
uniq_ids3
// 누군가는 .value에 아무런 의미가 없어 가독성이 떨어진다고 느낄 수 있다. flow는 합성 함수, compose이다.

const getUniqWidFromWidgets2 = _.flow(
  _.curryRight(_.map)(r => r.widget_id),
  _.uniq
);
const uniq_ids4 = getUniqWidFromWidgets2(widget_list);
uniq_ids4
// getWidgetIdFromWidgets 라는 함수가 가독성을 떨어뜨려 이를 제거하고 싶다. 그 경우 curryRight를 이용해 해결할 수 있다.



// 6: currying에 대한 소개

const calcRevenue = (cost, click) => cost * 2 + click;

const service1_click = 3;
const service2_click = 5;
const COST = 500;

let service1_revenue = calcRevenue(COST, service1_click);
let service2_revenue = calcRevenue(COST, service2_click);

service1_revenue
service2_revenue
// COST를 붙이는 코드가 매우 자주 사용되는 경우 COST를 매 번 붙여야하는게 번거롭다.

const calcRevenueWith500Cost = (click) => calcRevenue(COST, click);
service1_revenue = calcRevenueWith500Cost(service1_click);
service2_revenue = calcRevenueWith500Cost(service2_click);
service1_revenue
service2_revenue
// 좀 더 재사용성이 좋아졌다. 그런데 calcRevenueWith500Cost를 더 쉽게 빌드해주는 함수를 curry라고 부른다.

const calcRevenueWith500Cost2 = _.curry(calcRevenue)(COST);
service1_revenue = calcRevenueWith500Cost2(service1_click);
service2_revenue = calcRevenueWith500Cost2(service2_click);
service1_revenue
service2_revenue
// currying을 이용해 첫 번째 argument를 이미 채워둔 함수를 만들 수 있다.


// 6-1: [부록] curryRight의 버그

const arr = [1,2,3,4];
const arr2 = _.clone(arr);
const arr3 = _.clone(arr);
const arr4 = _.clone(arr);

_.remove(arr, r => r > 2);
arr

const curry2 = ftn => param2 => param1 => ftn(param1, param2);
_.remove(arr2, curry2(_.gt)(2));
arr2

_.remove(arr3, _.curryRight(_.gt)(2));
arr3

console.log(_.curryRight(_.gt)(2)(1))
console.log(_.curryRight(_.gt)(2)(2))
console.log(_.curryRight(_.gt)(2)(3))
console.log(_.curryRight(_.gt)(2)(4))

console.log(_.curryRight(_.gt)(2)(1, 0, [1]))
console.log(_.curryRight(_.gt)(2)(2, 0, [1]))
console.log(_.curryRight(_.gt)(2)(3, 0, [1]))
console.log(_.curryRight(_.gt)(2)(4, 0, [1]))

_.remove(arr4, _.flow(_.identity, _.curryRight(_.gt)(2)));
arr4



// 7: 함수 네이밍, 오브젝트 구성

const key1 = null;
const key2 = 'a';
const key1_exist = !!key1;
const key2_exist = !!key2;


let key;
if (key2_exist) key = 'key2';
if (key1_exist) key = 'key1';
key;
// key1, key2 등이 무수히 많아질 경우 하드코딩을 필수로 해야 한다.


const keyCandidates = [{key1}, {key2}];
keyCandidates
const findKeyHavingVal = (arr) => _.findKey(_.merge(...arr), _.identity);
key = findKeyHavingVal(keyCandidates);
key



// 8: dot dot dot 활용
const cond = true;

let dot_arr = cond ? [1, 2, 3, 4, 5, 6] : [1, 2, 3, 4, 5];
dot_arr
// [1, 2, 3, 4, 5] 는 같고, 마지막 6만 조건에 따라 붙을 수도 있고 아닐 수도 있다. 중복이 발생한다.

const pre_dot_arr = [1, 2, 3, 4, 5];
dot_arr = pre_dot_arr;
if (cond) dot_arr.push(6);
dot_arr
// 글을 쓴다면, `1, 2, 3, 4, 5와 마지막엔 조건에 따라 6이다.`
//           `1, 2, 3, 4, 5 가 있다. 그리고 조건이 있으면, 마지막에 6을 붙인다.`
// 둘 중 전자로 한눈에 쓰는게 나을 것이다.
// 순차적인 흐름을 모두 따라가는 것이 아니라, 처음부터 6이 붙을 수도 있다는 사실을 한 눈에 확인시키고 싶다.


const dot_example = [1, 2, 3, ...[4, 5]];
dot_example

const wrapTruthyToArray = (val) => val ? [val] : [];
const attachedValIfCond = (val, cond) => cond ? val : null;
dot_arr = [1, 2, 3, 4, 5, ...wrapTruthyToArray(attachedValIfCond(6, cond))];
dot_arr



// 9. 코드 글쓰기
const a = 3;
let b = a > 2 ? '^ㄴ^' : 'TT';
const c = 'funny_event';
if (c) b = 'kkkkkk';
b
// 나만 아는 로직


const 나의_기분을_5단계로 = 3;
const FEELING_TO_FACE = Object.freeze({
  'sad': 'TT',
  'happy': '^ㄴ^',
  'funny': 'kkkkkk',
});
const DEFAULT_FEELING = 'sad';
const is_happy = 나의_기분을_5단계로 > 2;
let my_feeling = DEFAULT_FEELING;
if (is_happy) my_feeling = 'happy';
const extra_event = 'funny_event';
const is_very_funny_happened = extra_event === 'funny_event';
if (is_very_funny_happened) my_feeling = 'funny';
const my_face = FEELING_TO_FACE[my_feeling];
my_face
// 중간 중간 변수에 담아 표현하기
