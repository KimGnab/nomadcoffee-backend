import { verify } from "jsonwebtoken";
import client from "../client";

export const getUser = async (token) => {
  try {
    const { id } = await verify(token, process.env.SECRET_KEY);
    const user = await client.user.findUnique({ where: { id } });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    return null;
  }
};

export const protectedResolver = (resolver) => (root, args, context, info) => {
  if (!context.currentUser) {
    return {
      ok: false,
      error: "Please log in to perform this action.",
    };
  }
  return resolver(root, args, context, info);
};
