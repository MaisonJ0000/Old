# Migration `20200719192846-init`

This migration has been generated by Jongman-Seo at 7/19/2020, 7:28:46 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "mvti$secondary"."User" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"email" text  NOT NULL ,
"id" SERIAL,
"name" text   ,
"password" text  NOT NULL ,
"updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"))

CREATE TABLE "mvti$secondary"."Movie" (
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
"poster" text   ,
"title" text  NOT NULL ,
"updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"))

CREATE TABLE "mvti$secondary"."Review" (
"authorId" integer  NOT NULL ,
"createdAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
"id" SERIAL,
"movieId" integer  NOT NULL ,
"rating" integer   ,
"text" text   ,
"updatedAt" timestamp(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("id"))

CREATE UNIQUE INDEX "User.email" ON "mvti$secondary"."User"("email")

ALTER TABLE "mvti$secondary"."Review" ADD FOREIGN KEY ("authorId")REFERENCES "mvti$secondary"."User"("id") ON DELETE CASCADE  ON UPDATE CASCADE

ALTER TABLE "mvti$secondary"."Review" ADD FOREIGN KEY ("movieId")REFERENCES "mvti$secondary"."Movie"("id") ON DELETE CASCADE  ON UPDATE CASCADE
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration ..20200719192846-init
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,39 @@
+generator client {
+  provider = "prisma-client-js"
+}
+
+datasource postgresql {
+  provider = "postgresql"
+  url = "***"
+}
+
+model User {
+  id        Int      @default(autoincrement()) @id
+  name      String?
+  email     String   @unique
+  password  String
+  reviews   Review[]
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
+
+model Movie {
+  id        Int      @default(autoincrement()) @id
+  title     String
+  poster    String?
+  reviews   Review[]
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
+
+model Review {
+  id        Int      @default(autoincrement()) @id
+  rating    Int?
+  text      String?
+  authorId  Int
+  author    User     @relation(fields: [authorId], references: [id])
+  movieId   Int
+  movie     Movie    @relation(fields: [movieId], references: [id])
+  updatedAt DateTime @default(now())
+  createdAt DateTime @default(now())
+}
```

