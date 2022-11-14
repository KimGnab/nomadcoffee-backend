import { gql } from "apollo-server";

export default gql`
  type SeeUserResponse {
    ok: Boolean!
    error: String
    following: [User]
    followers: [User]
  }

  type Query {
    seeFollowing(username: String!, lastId: Int): SeeUserResponse!
    seeFollower(username: String!, lastId: Int): SeeUserResponse!
  }
`;
