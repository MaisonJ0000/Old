---
title: "[TIL] 나만 몰랐던 intellij 테스트 방법들"
date: 2020-03-08
categories:
  - TIL
tags:
  - intellij
  - quokka
  - npm
---

- intellij에서 npm script 디버깅하기
  - so easy하다. configuration에 npm이 따로 있다! nodejs에서 괜히 해메었다. grunt, gulp도 다 있어서 설정을 별도로 할 필요가 없었다.
  - 디버깅하면서 set value 등을 활용해서 입력값을 임의로 조작할 수 있음.03
- JSTestDriver, Junit, jest 등 검색하다보며 얻은 키워드 들인데 정확한 용도와 사용법을 아직 모름. 추후에 정리해서 필요한 것은 사용할 수 있어야 하겠다.
  - 간단한 method에도 테스트를 거는 방법을 숙지하고 테스트 해보는 습관을 들여야 할 것 같다. quokka 같은 playground도 좋지만 테스트 방법을 동영상 강의 등으로 익혀놓는게 좋을 것 같다.
- quokka
  - community 버전을 사용하고 있는데 import가 된다!
  - 파일을 별도로 디렉토리 내부에 위치하게 생성하니 import 후 run이 잘 된다.
  - compare 기능은 꽤 유용하게 쓸 수 있을 것 같다.