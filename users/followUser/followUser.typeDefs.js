import { gql } from "apollo-server";

export default gql`
  type FollowUserResponse {
    ok: Boolean!
    error: String
  }

  type Mutation {
    followUser(username: String!): FollowUserResponse!
  }
`;
