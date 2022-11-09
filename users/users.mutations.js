import client from "../client";
import { hash } from "bcrypt";

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        const existingUser = await client.user.findFirst({
          where: { OR: [{ username }, { email }] },
        });

        if (existingUser) {
          if (existingUser.username === username) {
            throw new Error(
              `"${username}" already in use. Please enter a different username.`
            );
          }
          if (existingUser.email === email) {
            throw new Error(
              `"${email}" already in use. Please enter a different E-Mail.`
            );
          }
        }

        const hashingPassword = await hash(password, 10);
        await client.user.create({
          data: {
            username,
            email,
            name,
            password: hashingPassword,
          },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, error: error.message || "문제가 발생 했습니다." };
      }
    },
  },
};
