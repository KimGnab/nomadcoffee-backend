import { hash } from "bcrypt";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        { username, email, name, password: newPassword },
        { currentUser: { id } }
      ) => {
        try {
          const updatedUser = await client.user.update({
            where: {
              id,
            },
            data: {
              username,
              email,
              name,
              ...(newPassword && { password: await hash(newPassword, 10) }),
            },
          });

          if (!updatedUser) {
            throw new Error("Could not update profile.");
          }

          return { ok: true };
        } catch (error) {
          return { ok: false, error: error.message || "문제가 발생 했습니다." };
        }
      }
    ),
  },
};
