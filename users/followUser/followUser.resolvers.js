import { protectedResolver } from "../users.utils";
import client from "../../client";

export default {
  Mutation: {
    followUser: protectedResolver(
      async (_, { username }, { currentUser: { id } }) => {
        const isUserExist = !!(await client.user.findUnique({
          where: { username },
        }));
        if (!isUserExist) {
          return {
            ok: false,
            error: "That user does not exist.",
          };
        }
        await client.user.update({
          where: { id },
          data: { following: { connect: { username } } },
        });

        return {
          ok: true,
        };
      }
    ),
  },
};
