import "dotenv/config";
import { ApolloServer } from "apollo-server-express";
import express from "express";
import logger from "morgan";
import { typeDefs, resolvers } from "./schema";
import { getUser } from "./users/users.utils";
import graphqlUploadExpress from "graphql-upload/graphqlUploadExpress.js";

const PORT = process.env.PORT;

const startServer = async () => {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req }) => ({
      currentUser: await getUser(req.headers.authorization),
    }),
  });

  const app = express();
  app.use("/static", express.static("uploads"));
  app.use(graphqlUploadExpress());
  app.use(logger("tiny"));
  await server.start();
  server.applyMiddleware({ app });

  await new Promise((resolve) => app.listen({ port: PORT }, resolve));
  console.log(
    `🚀 Server is running on http://localhost:${PORT}${server.graphqlPath}`
  );
};

startServer();
