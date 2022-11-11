import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import client from "../../client";

export default {
  Mutation: {
    login: async (_, { username, password }) => {
      const user = await client.user.findFirst({ where: { username } });
      if (!user) return { ok: false, error: "User not Found." };

      const isPasswordMatch = await compare(password, user.password);
      if (!isPasswordMatch) return { ok: false, error: "Incorrect password." };

      const token = await sign({ id: user.id }, process.env.SECRET_KEY);
      return {
        ok: true,
        token,
      };
    },
  },
};
