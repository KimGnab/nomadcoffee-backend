import client from "../client";

export default {
  User: {
    totalFollowing: ({ id }) =>
      client.user.count({
        where: {
          followers: {
            some: {
              id,
            },
          },
        },
      }),
    totalFollowers: ({ id }) =>
      client.user.count({
        where: {
          following: {
            some: {
              id,
            },
          },
        },
      }),
    isMe: ({ id }, _, { currentUser }) => {
      if (!currentUser) {
        return false;
      }
      return id === currentUser.id;
    },

    isFollowing: async ({ id }, _, { currentUser: { username } }) => {
      if (!currentUser) {
        return false;
      }
      const exists = !!(await client.user.count({
        where: {
          username,
          following: {
            some: {
              id,
            },
          },
        },
      }));
      return exists;
    },
  },
};
