import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    unfollowUser: protectedResolver(
      async (_, { username }, { currentUser: { id } }) => {
        const isUserExist = !!(await client.user.findUnique({
          where: { username },
        }));
        if (!isUserExist) {
          return {
            ok: false,
            error: "Can't unfollow user.",
          };
        }
        await client.user.update({
          where: { id },
          data: { following: { disconnect: { username } } },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
