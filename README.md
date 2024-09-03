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
