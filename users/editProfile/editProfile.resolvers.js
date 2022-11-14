import { hash } from "bcrypt";
import { createWriteStream } from "fs";
import GraphQLUpload from "graphql-upload/GraphQLUpload.js";
import client from "../../client";
import { protectedResolver } from "../users.utils";

export default {
  Upload: GraphQLUpload,
  Mutation: {
    editProfile: protectedResolver(
      async (
        _,
        {
          username,
          email,
          name,
          password: newPassword,
          location,
          githubUsername,
          avatarURL,
        },
        { currentUser: { id } }
      ) => {
        try {
          let newAvatarURL = null;
          if (avatarURL) {
            const { filename, createReadStream } = await avatarURL;
            const newFilename = `${id}-${Date.now()}-${filename}`;
            const readStream = createReadStream();
            const writeStream = createWriteStream(
              process.cwd() + "/uploads/" + newFilename
            );
            readStream.pipe(writeStream);
            newAvatarURL = `http://localhost:4000/static/${newFilename}`;
          }
          const updatedUser = await client.user.update({
            where: {
              id,
            },
            data: {
              username,
              email,
              name,
              location,
              githubUsername,
              ...(newPassword && { password: await hash(newPassword, 10) }),
              ...(newAvatarURL && { avatarURL: newAvatarURL }),
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
