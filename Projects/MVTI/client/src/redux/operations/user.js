import { gql } from '@apollo/client';
import _ from 'lodash';
import getGqlClient from '../utils/getGqlClient';

const client = getGqlClient();

const gqlGetUser = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id
      name
      email
    }
  }
`;

const getUserById = async (id) => {
  const where = { id };
  const result = await client.query({
    query: gqlGetUser,
    variables: { where },
  });
  return _.get(result, 'data.user');
};

const gqlGetUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

const getUsers = async () => {
  const result = await client.query({ query: gqlGetUsers });
  return _.get(result, 'data.users');
};

const gqlQueryMe = gql`
  query {
    me {
      id
      name
      email
    }
  }
`;

const me = async () => {
  const result = await client.query({ query: gqlQueryMe });
  return _.get(result, 'data.me');
};

const gqlQueryUser = gql`
  query user($where: UserWhereUniqueInput!) {
    user(where: $where) {
      id,
      name,
      email
    }
  }
`;

const gqlMutationCreateUser = gql`
  mutation signUp($name: String, $email: String, $password: String) {
    signUp(name: $name, email: $email, password: $password) {
      user { 
        id,
        name,
        email
      }
    }
  }
`;

const doSignUp = async (user) => {
  const { name, email, password } = user;
  const result = await client.mutate({
    mutation: gqlMutationCreateUser,
    variables: { name, email, password },
  });
  return _.get(result, 'data.signUp');
};

const gqlMutationLogin = gql`
  mutation login($email: String, $password: String) {
    login(email: $email, password: $password) {
      token
      user {
        email
      }
    }
  }
`;

const doLogin = async (user) => {
  const { email, password, isSuccessGoogleLogin } = user;

  if (isSuccessGoogleLogin) {
    // TODO: server에서 bypass하는 mutation 생성할 것
    const where = { email };
    const shouldBeEncryptedPassword = 'googlepasswordshouldbeencrypted';

    const existingUserResult = await client.query({ query: gqlQueryUser, variables: { where } });
    const existingUser = _.get(existingUserResult, 'data.user');

    if (!existingUser) {
      // TODO: server에서도 valid한 로그인인지 한 번 더 확인
      const newUser = _.assign(user, { password: shouldBeEncryptedPassword });
      await doSignUp(newUser);
    }

    const result = await client.mutate({
      mutation: gqlMutationLogin,
      variables: { email, password: shouldBeEncryptedPassword },
    });
    return _.get(result, 'data.login');
  }

  const result = await client.mutate({
    mutation: gqlMutationLogin,
    variables: { email, password },
  });
  return _.get(result, 'data.login');
};

const userOperations = {
  getUsers,
  getUserById,
  doSignUp,
  doLogin,
  me,
};

export default userOperations;
