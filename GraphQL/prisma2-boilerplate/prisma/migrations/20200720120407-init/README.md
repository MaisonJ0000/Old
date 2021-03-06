# Migration `20200720120407-init`

This migration has been generated by Jongman-Seo at 7/20/2020, 12:04:07 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;

CREATE TABLE "User" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"email" TEXT NOT NULL,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"name" TEXT ,
"password" TEXT NOT NULL,
"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP)

CREATE TABLE "Post" (
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"title" TEXT NOT NULL,
"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"userId" INTEGER ,FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE)

CREATE TABLE "Comment" (
"authorId" INTEGER NOT NULL,
"createdAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
"postId" INTEGER NOT NULL,
"text" TEXT ,
"updatedAt" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,FOREIGN KEY ("authorId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE,
FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE CASCADE ON UPDATE CASCADE)

CREATE UNIQUE INDEX "User.email" ON "User"("email")

PRAGMA foreign_key_check;

PRAGMA foreign_keys=ON;
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200720120407-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,37 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource db {
+  provider = "sqlite"
+  url = "***"
+}
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  name      String?
+  email     String   @unique
+  password  String
+  posts   Post[]
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
+
+model Post {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  comments   Comment[]
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
+
+model Comment {
+  id        Int      @default(autoincrement()) @id
+  text      String?
+  authorId  Int
+  author    User     @relation(fields: [authorId], references: [id])
+  postId   Int
+  post     Post    @relation(fields: [postId], references: [id])
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
```


