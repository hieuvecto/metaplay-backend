import fastify from 'fastify';
import fastifySwagger from '@fastify/swagger';
import fastifySwaggerUi from '@fastify/swagger-ui';
import { StatusCodes } from 'http-status-codes';
import GamesRoutes from './modules/games/games.routes';
import Logger from './common/logger';
import {
  BadRequestError,
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UnauthorizedError,
  UserInputError,
} from './common/errors';

// TODO: set Logger by ENV
const server = fastify({ logger: Logger });

server.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'MetaPlay API',
      description: 'MetaPlay API description',
      version: '0.1.0',
    },
    tags: [{ name: 'game', description: 'Game related end-points' }],
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

// Executes Swagger
server.ready((err) => {
  if (err) throw err;
  server.swagger();
});

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

  reply.send(error);
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

server.ready();
server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }

  console.log(`Server listening at ${address}`);
});
