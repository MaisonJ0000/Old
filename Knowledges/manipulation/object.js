import _ from 'lodash';
import alasql from 'alasql';

const object = {
  a: 3,
  b: "bbb",
};
object;

const val1 = 1;
const obj_assign =  _.assign(undefined, { key1: val1 });
obj_assign;

const src_assign = _.assign(object, { third: 'tt' });
object


const array2Object = _.toArray(object);
array2Object


const array2ObjectV2 = Object.entries(object).map(([key, value]) => ({ key, value }));
array2ObjectV2

const arrayBeforeKeyRename = [
  {
    "beforeA": "2",
    "beforeB": "남",
    "b": "b",
  },
  {
    "beforeA": "2",
    "beforeB": "판",
    "b": "b",
  },
];

const arrayToBeJoined = [
  {
    "c": "판",
    "beforeBPanMore": "add1",
    "beforeBPanMore2": "add2",
  },
];

const arrayBeforeKeyRenameMap = {
  beforeA : "afterA",
  beforeB : "afterB",
};

const arrayAfterKeyRename = _.map(arrayBeforeKeyRename, r => {
  return _.mapKeys(r, (val, key) => {
    return arrayBeforeKeyRenameMap[key] || key;
  });
});

arrayAfterKeyRename


const joinedArray = alasql(`
    SELECT *
    FROM ? AS arrayBeforeKeyRename
    LEFT JOIN ? AS arrayToBeJoined
    ON arrayBeforeKeyRename.beforeB = arrayToBeJoined.c
  `
  , [arrayBeforeKeyRename, arrayToBeJoined]);

joinedArray

const renameMap = {
  a : "c",
  b : "d",
};
object
const objectAfterKeyRename = _.mapKeys(object, (val, key) => {
  return renameMap[key] || key;
});
objectAfterKeyRename


const item = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
}

const itemResult = _.map(item, (val, key) => {
  return {
    t: val,
    key
  }
});

itemResult

const objToBeDeleted = {a: 1, b: 2, c: 3};
delete objToBeDeleted.a;
objToBeDeleted


const objToBeArray = {
  '1by1': {
    '1': {
      width: 200,
      height: 200,
    },
    '2': {
      width: 400,
      height: 400,
    },
    '3': {
      width: 400,
      height: 400,
    }
  },
  '16by10': {
    '1': {
      width: 200,
      height: 125,
    },
    '2': {
      width: 400,
      height: 250,
    },
    '3': {
      width: 600,
      height: 375,
    }
  },
};

const assign22 = (obj, keyname) => {
  return _.reduce(obj, (result, val, key) => {
    val[keyname] = key;
    result = _.assign(result, val);
    return result;
  }, {});
}

const a = _.map(objToBeArray, (val, wh_key) => {
  console.log("[JONGMAN_LOG] val", val, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
  return assign22(val, 'kk');
  console.log("[JONGMAN_LOG] result", result, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
});
a
// const arr = _(objToBeArray)
// .mapValues((val, key) => _.assign(val, { w: key }))
// .value();
// arr
// console.log(arr.length)

const stringifyObj = JSON.stringify({ a: undefined});
stringifyObj


const { sol, la } = { sol: 3 }
sol
la

const omitObj = { a: 3, b: 4 };
_.omit(omitObj, 'a');
omitObj


/* object는 수정하지 않고 assign이나 merge */
const shouldNotBeModified = { a: 3 };
const shouldNotBeModifiedResult = _.assign({}, shouldNotBeModified, { c: 4 });
shouldNotBeModified


const complexObj = {
  options: {
    bucket: 'mediaindextest.dable.io',
    differential: true,
  },
  files: [
    {
      expand: true,
      src: [
        './README.md',
      ],
      dest: './'
    }
  ],
};

const complexObjResult = _.set(_.cloneDeep(complexObj), 'options.bucket', 55);
complexObjResult
console.log("[JONGMAN_LOG] complexObjResult", complexObjResult, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
complexObj
console.log("[JONGMAN_LOG] complexObj", complexObj, new Date(Date.now() - new Date().getTimezoneOffset() * 60000).toISOString().split('T')[1].slice(0, -1));
