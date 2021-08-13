const a = "abzxbxvxv<zxvzxvc>asfasdfs<asfdasfd>";

const b = a.replace(/</g, '[][]').replace(/>/g, '[][]');

b