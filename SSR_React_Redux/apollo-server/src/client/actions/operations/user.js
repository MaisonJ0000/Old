import { gql } from "apollo-boost";

const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`;

export {
  getUsers,
}