import Fastify from "fastify";
import mercurius from "mercurius";
import AltairFastify from "altair-fastify-plugin";
import { readFileSync } from "fs";
import { resolve } from "path";

const PORT = Number(process.env.PORT ?? 8080);
const GQL_PATH = process.env.GQL_PATH ?? "/query";

const app = Fastify();

const schema = readFileSync(resolve(__dirname, "schema.graphqls"), "utf-8");

// TODO: generate types
const resolvers = {
  Query: {
    skills: () => [{ id: "id-1", name: "ts", value: 3 }],
  },
};

app.register(mercurius, {
  schema,
  resolvers,
  graphiql: false,
  ide: false,
  path: GQL_PATH,
});

app.register(AltairFastify, {
  path: "/altair",
  baseURL: "/altair/",
  endpointURL: GQL_PATH,
});

console.log(
  `Server started [graphql: POST http://localhost:${PORT}${GQL_PATH}]`
);
console.log(`You can test queries on: http://localhost:${PORT}/altair`);

app.listen({ port: PORT });
