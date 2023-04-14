import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { StatusCodes } from 'http-status-codes';
import helmet from '@fastify/helmet';
import GamesRoutes from './modules/games/games.routes';
import Logger from './common/logger';
import {
  BadRequestError,
  CaughtError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  UserInputError,
} from './common/errors';
import AdminGamesRoutes from './modules/admin_games/games.routes';

// TODO: set Logger by ENV
const server = fastify({ logger: Logger });

// TODO: hide swagger in stg, prod env.
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'MetaPlay API',
      description: 'MetaPlay API description',
      version: '0.1.0',
    },
    tags: [
      { name: 'game', description: 'Games module related end-points' },
      {
        name: 'admin_game',
        description: 'Admin Games module related end-points',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
});
server.register(fastifySwaggerUi, {
  routePrefix: '/docs',
});
server.ready((err) => {
  if (err) throw err;
  server.swagger();
});

// Apply helmet
server.register(helmet, { global: true });

// set global error handler
server.setErrorHandler(function (error, request, reply) {
  if (error instanceof BadRequestError) {
    reply.status(StatusCodes.BAD_REQUEST).send(error);
    return;
  }

  if (error instanceof ConflictError) {
    reply.status(StatusCodes.CONFLICT).send(error);
    return;
  }

  if (error instanceof NotFoundError) {
    reply.status(StatusCodes.NOT_FOUND).send(error);
    return;
  }

  if (error instanceof UnauthorizedError) {
    reply.status(StatusCodes.UNAUTHORIZED).send(error);
    return;
  }

  if (error instanceof ForbiddenError) {
    reply.status(StatusCodes.FORBIDDEN).send(error);
    return;
  }

  if (error instanceof UserInputError) {
    reply.status(StatusCodes.UNPROCESSABLE_ENTITY).send(error);
    return;
  }

  if (error instanceof CaughtError) {
    reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
    return;
  }

  Logger.error(`Internal server error: ${error.message}`);
  reply.status(StatusCodes.INTERNAL_SERVER_ERROR).send(error);
});

// Games module
server.register(
  (instance, opts, next) => {
    GamesRoutes.forEach((route) => {
      instance.route(route);
    });

    next();
  },
  { prefix: 'games' },
);

// Admin Games module
server.register(
  (instance, opts, next) => {
    AdminGamesRoutes.forEach((route) => {
      instance.route(route);
    });

    next();
  },
  { prefix: 'admin/games' },
);

server.ready();
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
