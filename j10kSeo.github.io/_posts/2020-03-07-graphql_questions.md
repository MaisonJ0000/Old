---
title: "GraphQL 의문점"
date: 2020-03-07
categories: 
  - GraphQL
tags:
  - GraphQL
  - performance
---

- Q1: graphQL은 여러 요청을 한 번에 하기 때문에 빠르다?
    - connection 맺고 끊음에서 장점이 있다는 것은 알겠는데, 그게 실질적으로 빨라지나?
- Q2: graphQL은 필요한 데이터만 받아올 수 있으므로 유연하다?
    - `select * from table` 이 내부적으로 `select a, b from table` 처럼 되는 걸까?
    - 아니면 하나의 REST 요청에 대해 Promise.all([fetchA, fetchB, fetchC]) 에서 fetchA만 되도록 하는게 가능한걸까?
    - 다 받아 올 수 있으면 그냥 다 받아오는게 더 좋은게 아닐까? 다 받아오고 단지 filter시켜서 보기 깔끔하게 만들어주는 정도 뿐인 걸까?