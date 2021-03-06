/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */





declare global {
  interface NexusGenCustomOutputProperties<TypeName extends string> {
    crud: NexusPrisma<TypeName, 'crud'>
    model: NexusPrisma<TypeName, 'model'>
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CommentCreateInput: { // input type
    author: NexusGenInputs['UserCreateOneWithoutCommentInput']; // UserCreateOneWithoutCommentInput!
    createdAt?: any | null; // DateTime
    post: NexusGenInputs['PostCreateOneWithoutCommentsInput']; // PostCreateOneWithoutCommentsInput!
    text?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  CommentCreateManyWithoutAuthorInput: { // input type
    connect?: NexusGenInputs['CommentWhereUniqueInput'][] | null; // [CommentWhereUniqueInput!]
    create?: NexusGenInputs['CommentCreateWithoutAuthorInput'][] | null; // [CommentCreateWithoutAuthorInput!]
  }
  CommentCreateManyWithoutPostInput: { // input type
    connect?: NexusGenInputs['CommentWhereUniqueInput'][] | null; // [CommentWhereUniqueInput!]
    create?: NexusGenInputs['CommentCreateWithoutPostInput'][] | null; // [CommentCreateWithoutPostInput!]
  }
  CommentCreateWithoutAuthorInput: { // input type
    createdAt?: any | null; // DateTime
    post: NexusGenInputs['PostCreateOneWithoutCommentsInput']; // PostCreateOneWithoutCommentsInput!
    text?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  CommentCreateWithoutPostInput: { // input type
    author: NexusGenInputs['UserCreateOneWithoutCommentInput']; // UserCreateOneWithoutCommentInput!
    createdAt?: any | null; // DateTime
    text?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  CommentWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  PostCreateInput: { // input type
    comments?: NexusGenInputs['CommentCreateManyWithoutPostInput'] | null; // CommentCreateManyWithoutPostInput
    createdAt?: any | null; // DateTime
    title: string; // String!
    updatedAt?: any | null; // DateTime
    User?: NexusGenInputs['UserCreateOneWithoutPostsInput'] | null; // UserCreateOneWithoutPostsInput
  }
  PostCreateManyWithoutUserInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'][] | null; // [PostWhereUniqueInput!]
    create?: NexusGenInputs['PostCreateWithoutUserInput'][] | null; // [PostCreateWithoutUserInput!]
  }
  PostCreateOneWithoutCommentsInput: { // input type
    connect?: NexusGenInputs['PostWhereUniqueInput'] | null; // PostWhereUniqueInput
    create?: NexusGenInputs['PostCreateWithoutCommentsInput'] | null; // PostCreateWithoutCommentsInput
  }
  PostCreateWithoutCommentsInput: { // input type
    createdAt?: any | null; // DateTime
    title: string; // String!
    updatedAt?: any | null; // DateTime
    User?: NexusGenInputs['UserCreateOneWithoutPostsInput'] | null; // UserCreateOneWithoutPostsInput
  }
  PostCreateWithoutUserInput: { // input type
    comments?: NexusGenInputs['CommentCreateManyWithoutPostInput'] | null; // CommentCreateManyWithoutPostInput
    createdAt?: any | null; // DateTime
    title: string; // String!
    updatedAt?: any | null; // DateTime
  }
  PostWhereUniqueInput: { // input type
    id?: number | null; // Int
  }
  UserCreateInput: { // input type
    Comment?: NexusGenInputs['CommentCreateManyWithoutAuthorInput'] | null; // CommentCreateManyWithoutAuthorInput
    createdAt?: any | null; // DateTime
    email: string; // String!
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutUserInput'] | null; // PostCreateManyWithoutUserInput
    updatedAt?: any | null; // DateTime
  }
  UserCreateOneWithoutCommentInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
    create?: NexusGenInputs['UserCreateWithoutCommentInput'] | null; // UserCreateWithoutCommentInput
  }
  UserCreateOneWithoutPostsInput: { // input type
    connect?: NexusGenInputs['UserWhereUniqueInput'] | null; // UserWhereUniqueInput
    create?: NexusGenInputs['UserCreateWithoutPostsInput'] | null; // UserCreateWithoutPostsInput
  }
  UserCreateWithoutCommentInput: { // input type
    createdAt?: any | null; // DateTime
    email: string; // String!
    name?: string | null; // String
    posts?: NexusGenInputs['PostCreateManyWithoutUserInput'] | null; // PostCreateManyWithoutUserInput
    updatedAt?: any | null; // DateTime
  }
  UserCreateWithoutPostsInput: { // input type
    Comment?: NexusGenInputs['CommentCreateManyWithoutAuthorInput'] | null; // CommentCreateManyWithoutAuthorInput
    createdAt?: any | null; // DateTime
    email: string; // String!
    name?: string | null; // String
    updatedAt?: any | null; // DateTime
  }
  UserWhereUniqueInput: { // input type
    email?: string | null; // String
    id?: number | null; // Int
  }
}

export interface NexusGenEnums {
}

export interface NexusGenRootTypes {
  Comment: { // root type
    id: number; // Int!
    text?: string | null; // String
  }
  Mutation: {};
  Post: { // root type
    id: number; // Int!
    title: string; // String!
  }
  Query: {};
  User: { // root type
    email: string; // String!
    id: number; // Int!
    name?: string | null; // String
  }
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  DateTime: any;
}

export interface NexusGenAllTypes extends NexusGenRootTypes {
  CommentCreateInput: NexusGenInputs['CommentCreateInput'];
  CommentCreateManyWithoutAuthorInput: NexusGenInputs['CommentCreateManyWithoutAuthorInput'];
  CommentCreateManyWithoutPostInput: NexusGenInputs['CommentCreateManyWithoutPostInput'];
  CommentCreateWithoutAuthorInput: NexusGenInputs['CommentCreateWithoutAuthorInput'];
  CommentCreateWithoutPostInput: NexusGenInputs['CommentCreateWithoutPostInput'];
  CommentWhereUniqueInput: NexusGenInputs['CommentWhereUniqueInput'];
  PostCreateInput: NexusGenInputs['PostCreateInput'];
  PostCreateManyWithoutUserInput: NexusGenInputs['PostCreateManyWithoutUserInput'];
  PostCreateOneWithoutCommentsInput: NexusGenInputs['PostCreateOneWithoutCommentsInput'];
  PostCreateWithoutCommentsInput: NexusGenInputs['PostCreateWithoutCommentsInput'];
  PostCreateWithoutUserInput: NexusGenInputs['PostCreateWithoutUserInput'];
  PostWhereUniqueInput: NexusGenInputs['PostWhereUniqueInput'];
  UserCreateInput: NexusGenInputs['UserCreateInput'];
  UserCreateOneWithoutCommentInput: NexusGenInputs['UserCreateOneWithoutCommentInput'];
  UserCreateOneWithoutPostsInput: NexusGenInputs['UserCreateOneWithoutPostsInput'];
  UserCreateWithoutCommentInput: NexusGenInputs['UserCreateWithoutCommentInput'];
  UserCreateWithoutPostsInput: NexusGenInputs['UserCreateWithoutPostsInput'];
  UserWhereUniqueInput: NexusGenInputs['UserWhereUniqueInput'];
}

export interface NexusGenFieldTypes {
  Comment: { // field return type
    author: NexusGenRootTypes['User']; // User!
    id: number; // Int!
    post: NexusGenRootTypes['Post']; // Post!
    text: string | null; // String
  }
  Mutation: { // field return type
    createOneComment: NexusGenRootTypes['Comment']; // Comment!
    createOnePost: NexusGenRootTypes['Post']; // Post!
    createOneUser: NexusGenRootTypes['User']; // User!
  }
  Post: { // field return type
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    id: number; // Int!
    title: string; // String!
  }
  Query: { // field return type
    comment: NexusGenRootTypes['Comment'] | null; // Comment
    comments: NexusGenRootTypes['Comment'][]; // [Comment!]!
    post: NexusGenRootTypes['Post'] | null; // Post
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
    user: NexusGenRootTypes['User'] | null; // User
    users: NexusGenRootTypes['User'][]; // [User!]!
  }
  User: { // field return type
    email: string; // String!
    id: number; // Int!
    name: string | null; // String
    posts: NexusGenRootTypes['Post'][]; // [Post!]!
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createOneComment: { // args
      data: NexusGenInputs['CommentCreateInput']; // CommentCreateInput!
    }
    createOnePost: { // args
      data: NexusGenInputs['PostCreateInput']; // PostCreateInput!
    }
    createOneUser: { // args
      data: NexusGenInputs['UserCreateInput']; // UserCreateInput!
    }
  }
  Query: {
    comment: { // args
      where: NexusGenInputs['CommentWhereUniqueInput']; // CommentWhereUniqueInput!
    }
    comments: { // args
      skip?: number | null; // Int
    }
    post: { // args
      where: NexusGenInputs['PostWhereUniqueInput']; // PostWhereUniqueInput!
    }
    posts: { // args
      skip?: number | null; // Int
    }
    user: { // args
      where: NexusGenInputs['UserWhereUniqueInput']; // UserWhereUniqueInput!
    }
    users: { // args
      skip?: number | null; // Int
    }
  }
}

export interface NexusGenAbstractResolveReturnTypes {
}

export interface NexusGenInheritedFields {}

export type NexusGenObjectNames = "Comment" | "Mutation" | "Post" | "Query" | "User";

export type NexusGenInputNames = "CommentCreateInput" | "CommentCreateManyWithoutAuthorInput" | "CommentCreateManyWithoutPostInput" | "CommentCreateWithoutAuthorInput" | "CommentCreateWithoutPostInput" | "CommentWhereUniqueInput" | "PostCreateInput" | "PostCreateManyWithoutUserInput" | "PostCreateOneWithoutCommentsInput" | "PostCreateWithoutCommentsInput" | "PostCreateWithoutUserInput" | "PostWhereUniqueInput" | "UserCreateInput" | "UserCreateOneWithoutCommentInput" | "UserCreateOneWithoutPostsInput" | "UserCreateWithoutCommentInput" | "UserCreateWithoutPostsInput" | "UserWhereUniqueInput";

export type NexusGenEnumNames = never;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = "Boolean" | "DateTime" | "Float" | "ID" | "Int" | "String";

export type NexusGenUnionNames = never;

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  allTypes: NexusGenAllTypes;
  inheritedFields: NexusGenInheritedFields;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractResolveReturn: NexusGenAbstractResolveReturnTypes;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
}