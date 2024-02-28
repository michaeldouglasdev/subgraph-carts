import { ApolloServer } from '@apollo/server';
import { buildSubgraphSchema } from '@apollo/subgraph';
import { resolvers } from './src/resolvers';
import {gql} from 'graphql-tag';
import { readFileSync } from 'fs';

const schema = gql(readFileSync('./src/schema.graphql', { encoding: 'utf-8' }));

import { startStandaloneServer } from '@apollo/server/standalone';
import dotenv from 'dotenv';
dotenv.config();

const PORT = parseInt(process.env.PORT!) || 4000;

async function bootstrap() {

  const server = new ApolloServer({
    schema: buildSubgraphSchema({
      typeDefs: schema,
      resolvers,
    }),
    introspection: true,
  })

  const { url } = await startStandaloneServer(server, {
    listen: {
      port: PORT
    }
  })
  console.log(`GraphQL Server started at ${url}`);
}

bootstrap();