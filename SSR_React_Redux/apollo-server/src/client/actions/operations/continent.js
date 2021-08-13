import { gql } from "apollo-boost";

const getContinents = gql`
  query {
    continents {
      code
      name
    }
  }
`;

export {
  getContinents,
}