import { gql } from "apollo-server";

export default gql`
  type UnfollowUserResponse {
    ok: Boolean!
    error: String
  }

  type Mutation {
    unfollowUser(username: String!): UnfollowUserResponse
  }
`;
