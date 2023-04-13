import { FastifyRequest } from 'fastify';
import { Controller } from '../../interfaces';
import { CreateGameBody, GetGameParams } from './games.schema';
import GamesService from './games.service';
import { StatusCodes } from 'http-status-codes';

const GamesController: Controller = {
  getGame: async (
    request: FastifyRequest<{ Params: GetGameParams }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().getGame(request.params);
    return reply.send(data);
  },
  createGame: async (
    request: FastifyRequest<{ Body: CreateGameBody }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().createGame(request.body);
    return reply.code(StatusCodes.CREATED).send(data);
  },
};

export default GamesController;
