import client from "../client";
import { hash } from "bcrypt";

async function isExist(value) {
  return !!client.user.findFirst({
    where: { value },
  });
}

export default {
  Mutation: {
    createAccount: async (_, { username, email, name, password }) => {
      try {
        const isUsernameExist = await isExist(username);
        const isEmailExist = await isExist(email);

        if (isUsernameExist) {
          throw new Error(
            `"${username}" already in use. Please enter a different username.`
          );
        }
        if (isEmailExist) {
          throw new Error(
            `"${email}" already in use. Please enter a different username.`
          );
        }

        const hashingPassword = await hash(password, 10);
        client.user.create({
          data: {
            username,
            email,
            name,
            password: hashingPassword,
          },
        });
        return { ok: true };
      } catch (error) {
        return { ok: false, er };
      }
    },
  },
};
