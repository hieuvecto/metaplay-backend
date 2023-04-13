import GamesController from './games.controller';
import { Route, RouteMethod } from '../../interfaces';
import { CreateGameSchema, GetGameSchema } from './games.schema';

const GamesRoutes: Route[] = [
  {
    method: RouteMethod.GET,
    url: '/:id',
    schema: GetGameSchema,
    handler: GamesController.getGame,
  },
  {
    method: RouteMethod.POST,
    url: '/',
    schema: CreateGameSchema,
    handler: GamesController.createGame,
  },
];

export default GamesRoutes;
