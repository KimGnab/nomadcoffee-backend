import { gql } from "apollo-server";

export default gql`
  type EditProfileResponse {
    ok: Boolean!
    error: String
  }

  type Mutation {
    editProfile(
      username: String
      email: String
      name: String
      password: String
    ): EditProfileResponse!
  }
`;
