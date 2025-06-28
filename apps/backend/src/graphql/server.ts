// =============================================================================
// GRAPHQL SERVER
// =============================================================================

import { ApolloServer } from '@apollo/server';
import { logger } from '../utils/logger';

// Schema GraphQL de base
const typeDefs = `
  type Query {
    hello: String
    tasks(eventId: ID!): [Task]
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: String!
    priority: String!
    eventId: ID!
    createdAt: String!
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task
    updateTask(id: ID!, input: UpdateTaskInput!): Task
  }

  input CreateTaskInput {
    title: String!
    description: String
    eventId: ID!
    priority: String = "medium"
  }

  input UpdateTaskInput {
    title: String
    description: String
    status: String
    priority: String
  }
`;

// Resolvers GraphQL
const resolvers = {
  Query: {
    hello: () => 'Hello from SyncIt GraphQL!',
    tasks: (parent: any, args: { eventId: string }) => {
      logger.info('GraphQL: Get tasks', { eventId: args.eventId });
      return [
        {
          id: '1',
          title: 'Tâche GraphQL 1',
          description: 'Description via GraphQL',
          status: 'todo',
          priority: 'high',
          eventId: args.eventId,
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Tâche GraphQL 2',
          description: 'Autre tâche via GraphQL',
          status: 'in_progress',
          priority: 'medium',
          eventId: args.eventId,
          createdAt: new Date().toISOString()
        }
      ];
    }
  },
  Mutation: {
    createTask: (parent: any, args: { input: any }) => {
      logger.info('GraphQL: Create task', args.input);
      return {
        id: Date.now().toString(),
        ...args.input,
        status: 'todo',
        createdAt: new Date().toISOString()
      };
    },
    updateTask: (parent: any, args: { id: string; input: any }) => {
      logger.info('GraphQL: Update task', { id: args.id, input: args.input });
      return {
        id: args.id,
        title: 'Tâche mise à jour',
        ...args.input,
        eventId: '1',
        updatedAt: new Date().toISOString()
      };
    }
  }
};

export async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: process.env.NODE_ENV === 'development',
  });

  logger.info('GraphQL server configured');
  return server;
} 