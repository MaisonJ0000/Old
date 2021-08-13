---
title: "Vue.js - watch 주의점"
date: 2020-03-04
categories: 
  - Vue
tags:
  - Vue.js
  - watch
  - computed
---

- computed는 캐싱된 값과 비교하여 결과물이 바뀔 떄만 실행된다.
    - 즉 computed에 watch를 걸면 computed의 결과물이 변경될 때 watch가 실행되는 것이다.
    - 의문점: 결국 computed나 watch나 trigger되는 타이밍은 똑같은 것 아닌가?
