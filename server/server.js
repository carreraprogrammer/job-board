import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import express from 'express';
import { readFileSync } from 'fs';

import { authMiddleware, handleLogin } from './auth.js';
import { resolvers } from './resolvers.js';

const PORT = 9000;

const app = express();
app.use(cors(), express.json(), authMiddleware);

app.post('/login', handleLogin);

const typeDefs = readFileSync(new URL('./schema.graphql', import.meta.url), 'utf-8');

const apolloServer = new ApolloServer({ typeDefs, resolvers });
await apolloServer.start();
apolloServer.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: PORT }, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});