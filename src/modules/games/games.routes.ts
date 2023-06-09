import GamesController from './games.controller';
import { Route, RouteMethod } from '../../interfaces';
import {
  CreateGameSchema,
  DeleteGameSchema,
  GetGameSchema,
  GetGamesSchema,
  GetMyGamesSchema,
  UpdateGameSchema,
} from './games.schema';
import JwtLoginLevelGuard from '../../common/guards/jwt_login_level_guard';

const GamesRoutes: Route[] = [
  {
    method: RouteMethod.GET,
    url: '/:id',
    schema: GetGameSchema,
    handler: GamesController.getGame,
  },
  {
    method: RouteMethod.GET,
    url: '/',
    schema: GetGamesSchema,
    handler: GamesController.getGames,
  },
  {
    method: RouteMethod.GET,
    url: '/own',
    schema: GetMyGamesSchema,
    handler: GamesController.getMyGames,
    preHandler: JwtLoginLevelGuard,
  },
  {
    method: RouteMethod.POST,
    url: '/',
    schema: CreateGameSchema,
    handler: GamesController.createGame,
    // I used preHandler registering in fastify.route() instead of fastify.addHook('preHandler')
    preHandler: JwtLoginLevelGuard,
  },
  {
    method: RouteMethod.PUT,
    url: '/:id',
    schema: UpdateGameSchema,
    handler: GamesController.updateGame,
    preHandler: JwtLoginLevelGuard,
  },
  {
    method: RouteMethod.DELETE,
    url: '/:id',
    schema: DeleteGameSchema,
    handler: GamesController.deleteGame,
    preHandler: JwtLoginLevelGuard,
  },
];

export default GamesRoutes;
