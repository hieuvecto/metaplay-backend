import { FastifyRequest } from 'fastify';
import { Controller } from '../../interfaces';
import {
  AdminDeleteGameParams,
  AdminUpdateGameBody,
  AdminUpdateGameParams,
} from './admin_games.schema';
import AdminGamesService from './admin_games.service';

const AdminGamesController: Controller = {
  updateGame: async (
    request: FastifyRequest<{
      Params: AdminUpdateGameParams;
      Body: AdminUpdateGameBody;
    }>,
    reply,
  ) => {
    const data = await AdminGamesService.getInstance().updateGame(
      request.params,
      request.body,
    );
    return reply.send(data);
  },

  deleteGame: async (
    request: FastifyRequest<{ Params: AdminDeleteGameParams }>,
    reply,
  ) => {
    const data = await AdminGamesService.getInstance().deleteGame(
      request.params,
    );
    return reply.send(data);
  },
};

export default AdminGamesController;
