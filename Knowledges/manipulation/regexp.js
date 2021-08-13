const NUMERIC_REGEXP = /[-]{0,1}[\d]*[.]{0,1}[\d]+/g;

let result = '2323232313323AB$';
result = result.match(NUMERIC_REGEXP);
result = result.join('');
result
