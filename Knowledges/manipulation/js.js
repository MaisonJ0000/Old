const _ = require('lodash');

const setA = new Set([
  '(1.6:1)x1',
  '(1:1)x2',
  '(2:1)x1',
  '(1.6:1)x2',
  '(1:1)x3',
  '(2:1)x3',
  '(2:1)x2',
  '(1.6:1)x3',
  '(1:1)x1'
]);
setA

const setB = new Set([
  '(1:1)x1',
  '(1:1)x2',
  '(1:1)x3',
  '(1.6:1)x1',
  '(1.6:1)x2',
  '(1.6:1)x3',
  '(2:1)x1',
  '(2:1)x2',
  '(2:1)x3'
]);
setB

const isEqual = _.isEqual(setA /*?*/, setB); /*?.*/
isEqual;

