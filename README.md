# oz-database-backend-practice

## ORM 초기 세팅

```bash
# npm 초기 세팅
npm init -y

# prisma 설치
npm install prisma --save-dev

# prisma 초기 세팅
npx prisma
npx prisma init
```

## supabase용 세팅

```prisma
# schema.prisma
datasource db {
  provider          = "postgresql"
  url               = env("DATABASE_URL")
  directUrl         = env("DIRECT_URL")
}

generator client {
  provider = "prisma-client-js"
}
```

## migration 세팅

```bash
# 파일 변경 확인을 위해 git init
git init

# prisma 스키마로 떙겨온다 -> Supabase의 postgresql에 접근해서 데이터베이스 스키마를 불러온다.
npx prisma db pull

# prisma/migrations/0_init 디렉터리 생성

# prisma 스키마 기반 마이그레이션 sql 생성
npx prisma migrate diff \
--from-empty \
--to-schema-datamodel prisma/schema.prisma \
--script > prisma/migrations/0_init/migration.sql

# 마이그레이션 정보 적용
npx prisma migrate resolve --applied 0_init

# 스키마 변경 (ex, NOT NULL, CURRENT TIMESTAMP 적용)

# 마이그레이션 시작
npx prisma migrate dev

# Note: npx prisma migrate dev는 개발용 데이터베이스에 적용하는 명령어다.
# 개발용 데이터베이스는 git staging area와 비슷한 개념으로 보면 된다.
# 배포용 데이터베이스에 적용하는 것은 위험! 잘 되는지 충분히 확인하고 npx prisma migrate deploy로 배포를 할 것.
# Futher Reading: https://www.prisma.io/docs/orm/prisma-migrate/understanding-prisma-migrate/mental-model
```

## HTTP 서버 설정

```bash
# 서버 초기 설정
npm i express morgan dotenv cors cookie-parser
npm i -D nodemon
npm i -D eslint@^8 eslint-config-prettier eslint-plugin-prettier prettier
```

## REST API 서버 경로

```
GET film
GET film/:id
GET film/post
GET film/post/:id
GET film/post/like/:id?count=true
GET film/post/like/:id/customer/:customerid
POST film/post/like
DELETE film/post/like/:id
GET film/post/:postId/comment
POST film/post/:postId/comment
```

## Postman으로 요청 보내보기 (Smoke Test)

### Film

#### get many
<img width="1508" height="986" alt="스크린샷 2025-08-13 14 55 28" src="https://github.com/user-attachments/assets/a72dadfb-18ea-4fb1-a3ec-aff63252d769" />

#### get many query parameter
<img width="1496" height="992" alt="스크린샷 2025-08-13 14 57 13" src="https://github.com/user-attachments/assets/5fe33c0e-7e12-49e9-b3e7-147ebde43b74" />

#### get one
<img width="1496" height="974" alt="스크린샷 2025-08-13 14 58 12" src="https://github.com/user-attachments/assets/44ac0e09-07bc-488e-af91-e7043c3a4205" />

### Film Post

#### get many
<img width="1501" height="982" alt="스크린샷 2025-08-13 14 59 14" src="https://github.com/user-attachments/assets/9b89ec09-e665-43e7-a39e-7a6e3b48d61c" />

#### get one
<img width="1482" height="777" alt="스크린샷 2025-08-13 14 59 56" src="https://github.com/user-attachments/assets/91e6372d-9eff-46a5-8b6b-8d65fca77218" />

### Like

#### get count
<img width="1490" height="652" alt="스크린샷 2025-08-13 15 01 20" src="https://github.com/user-attachments/assets/1a045996-6230-4bf7-bb3c-f1e920243df0" />

#### get my count
<img width="1496" height="593" alt="스크린샷 2025-08-13 15 02 29" src="https://github.com/user-attachments/assets/7d1cd0b7-c50a-41bb-8271-f608a9086a3c" />

#### add like
<img width="1495" height="716" alt="스크린샷 2025-08-13 15 03 54" src="https://github.com/user-attachments/assets/2988be4c-d6d0-4a7d-8598-32300c59b015" />

#### delete like
<img width="1497" height="706" alt="스크린샷 2025-08-13 15 03 24" src="https://github.com/user-attachments/assets/fb1e20b9-00b2-48f5-85be-62eb7c081e6a" />

### Comment

#### get comments
<img width="1493" height="937" alt="스크린샷 2025-08-13 15 05 14" src="https://github.com/user-attachments/assets/d59ed160-87c7-451a-9ac6-4f16796f03fe" />

#### create comment
<img width="1498" height="733" alt="스크린샷 2025-08-13 15 05 55" src="https://github.com/user-attachments/assets/90a12e40-d5d5-47ce-a229-338638a83005" />

#### update comment
<img width="1487" height="727" alt="update comment" src="https://github.com/user-attachments/assets/08ddef5e-6b94-494c-bd5f-0d539182d4a7" />
<img width="1500" height="979" alt="update comment result" src="https://github.com/user-attachments/assets/20a08184-9608-41b0-9fcb-260183e3c82a" />

#### delete comment
<img width="1491" height="618" alt="delete comment" src="https://github.com/user-attachments/assets/7de89d94-2d8c-4dc3-a942-bc0c5305b22d" />
<img width="1499" height="876" alt="delete comment result" src="https://github.com/user-attachments/assets/46cfe847-1005-4760-9934-4c43f813be00" />

## Reference

### CRUD

https://www.prisma.io/docs/orm/prisma-client/queries/crud
