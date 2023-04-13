import { FastifyRequest, FastifyReply } from 'fastify';

export type Handler = (
  resquest: FastifyRequest,
  reply: FastifyReply,
) => Promise<FastifyReply> | void;
export type Controller = {
  [key: string]: Handler;
};

export enum RouteMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
}

// TODO: enhance Route to make it more generic
export type Route = {
  method: RouteMethod;
  url: string;
  schema?: any; // TODO: make general schema type.
  handler: Handler;
};
