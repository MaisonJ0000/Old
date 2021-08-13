---
title: "Arrow function and this"
date: 2020-03-04
categories: 
  - TIL
tags:
  - arrow function
  - this
---


## arrow function의 this
    
```javascript
function Person(){
     this.age = 0;
   
     setInterval(() => {
       this.age++; // |this| properly refers to the Person object
     }, 1000);
   }
   
   var p = new Person();
```
   (https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)
   - arrow function은 자신의 this를 갖지 않는다. its enclosing scope, 즉 호출된 위치의 this를 표현하는 것이다.
   - vue.js에서 아래의 코드를
```javascript
methods: {
    changeTitle: function(event) {
        this.title = event.target.value;
    }
}
```

- 아래와 같이 변경해보고 this가 window를 가르키는 것을 보고 찾아보다가 알게 되었다.
```javascript
methods: {
    changeTitle: (event) => {
        this.title = event.target.value;
    }
}
```

- better way: 메소드 선언할 때 메소드 축약 표현이라고 한다. class를 잘 안쓰다보니 생소하다.
```javascript
methods: {
    changeTitle(event) {
        this.title = event.target.value;
    }
}
```