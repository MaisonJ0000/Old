# ㅇㄹ

## local에서 확인하기 위한 필수 조건: env 파일
여기서 다운 받아서 홈 디렉토리에 붙여넣자.

## prisma schema 수정
prisma/schema.prisma 파일을 수정한다.

npm run migrate를 실행한다.
그럼 연결된 DB의 schema가 업데이트된다.

## graphql schema 수정
src/schema.ts 파일을 수정한다.

npm run generate를 실행한다.
그럼 Prisma Client (@prisma/client) 가 갱신된다.



## dev
npm run dev
localhost:4000 에서 확인할 수 있다.

## db data 확인
npm run studio

## deploy

만일 push가 실패하면 `error: failed to push some refs to` 서
`hint: not have locally. This is usually caused by another repository pushing`
이러한 문구가 뜨면, 기존에 배포가 존재하고 커밋이 다르기 때문이다. 이 경우는
> git push --force heroku master

로 강제로 push한다.

heroku config:set DB_URL_WITH_SCHEMA="postgres://...blabla"
으로 설정하면 실제로 Config Vars 에 등록된다. (Heroku의 해당 url에서 확인 가능)


