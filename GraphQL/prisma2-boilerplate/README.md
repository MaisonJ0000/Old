# gql-api

GraphQL api server

### spec
- GraphQL
- Prisma 2.2

## dev 환경 구동

### database 연동
dev 환경의 db를 연결하기 위해서는 env파일이 필요하다.  
env파일에서 DB_URL_WITH_SCHEMA 환경변수에 db 정보를 담고 있다. 
private repository https://github.com/MVTI/config/tree/master/gql-api 에서 해당 파일을 받아 root directory (gql-api) 에 붙여넣으면 된다.

### dev 구동

> npm i  
> npm run dev

로 실행한다.

### troubleshooting

db setup이 처음부터 안되어 있다면, 실제 db에 table이 없을 수도 있다.
이 경우는 
> npm run migrate:dev

로 db에 현재 prisma schema정보를 이용하여 한 번 설정해주면 table생성과 column 생성이 이루어진다.  

### prisma schema를 수정한 경우
prisma/schema.prisma 파일을 수정하면 실제 db에 schema를 반영해야 한다.
> npm run migrate:dev   

## db data 확인
> npm run data:dev   
> npm run data:prod

## deploy

### db schema update
> npm run migrate:prod

### heroku에 배포

> heroku login  

아래와 같이 로그인 정보를 확인한다.
```Logging in... done
   Logged in as j10k.seo@gmail.com
```

아래는 한 번 설정한 이후에는 생략 가능
> heroku git:remote --app mvti

`mvti` 는 heroku에서 생성한 앱의 이름이다.

> git remote -v

로 remote가 추가된 상태를 확인할 수 있다.

IDE를 사용한다면 배포할 내용을 커밋한다. 아래 커맨드는 커밋 예시이다.

> git add .  
> git commit -m 'Initial commit'

커밋한 내용을 push한다.

> git push heroku master

만일 push가   
`error: failed to push some refs to` 이하,   
`hint: not have locally. This is usually caused by another repository pushing`    
이라는 문구가 뜨면, 기존에 배포가 존재하고 커밋이 다르기 때문이다. 이 경우는
> git push --force heroku master

로 강제로 push한다.

### 환경 변수
이미 설정되어 있으므로 꼭 수정이 필요한 경우 참고하자.  
deploy로 구동할 때 환경변수 설정은 
heroku config:set DB_URL_WITH_SCHEMA="postgres://...blabla"
으로 설정할 수도 있고 Heroku Config Vars https://dashboard.heroku.com/apps/mvti/settings 에서도 설정할 수 있다.