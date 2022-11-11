import { gql } from "apollo-server";

export default gql`
  type CreateAccountResponse {
    ok: Boolean!
    error: String
  }

  type Mutation {
    createAccount(
      username: String!
      email: String!
      name: String!
      password: String!
    ): CreateAccountResponse!
  }
`;
