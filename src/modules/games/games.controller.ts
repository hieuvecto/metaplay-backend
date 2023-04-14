import { FastifyReply, FastifyRequest } from 'fastify';
import { Controller } from '../../interfaces';
import {
  CreateGameBody,
  DeleteGameParams,
  GetGameParams,
  GetGamesQueryString,
  GetMyGamesQueryString,
  UpdateGameBody,
  UpdateGameParams,
} from './games.schema';
import GamesService from './games.service';
import { StatusCodes } from 'http-status-codes';
import { FastifyRequestWithUser } from '../../common/guards/jwt_login_level_guard';

const GamesController: Controller = {
  // TODO: add return type in controller methods.
  getGame: async (
    request: FastifyRequest<{ Params: GetGameParams }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().getGame(request.params);
    return reply.send(data);
  },

  getGames: async (
    request: FastifyRequest<{ Querystring: GetGamesQueryString }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().getGames(request.query);
    return reply.send(data);
  },

  getMyGames: async (
    request: FastifyRequest<{ Querystring: GetMyGamesQueryString }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().getMyGames(
      request.query,
      request as FastifyRequestWithUser,
    );
    return reply.send(data);
  },

  createGame: async (
    request: FastifyRequest<{ Body: CreateGameBody }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().createGame(
      request.body,
      request as FastifyRequestWithUser,
    );
    return reply.code(StatusCodes.CREATED).send(data);
  },

  updateGame: async (
    request: FastifyRequest<{ Params: UpdateGameParams; Body: UpdateGameBody }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().updateGame(
      request.params,
      request.body,
      request as FastifyRequestWithUser,
    );
    return reply.send(data);
  },

  deleteGame: async (
    request: FastifyRequest<{ Params: DeleteGameParams }>,
    reply,
  ) => {
    const data = await GamesService.getInstance().deleteGame(
      request.params,
      request as FastifyRequestWithUser,
    );
    return reply.send(data);
  },
};

export default GamesController;
