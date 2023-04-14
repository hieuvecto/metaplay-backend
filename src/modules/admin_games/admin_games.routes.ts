import { Route, RouteMethod } from '../../interfaces';
import {
  AdminDeleteGameSchema,
  AdminUpdateGameSchema,
} from './admin_games.schema';
import JwtAdminPrivilegeGuard from '../../common/guards/jwt_admin_privilege_guard';
import AdminGamesController from './admin_games.controller';

const AdminGamesRoutes: Route[] = [
  {
    method: RouteMethod.PUT,
    url: '/:id',
    schema: AdminUpdateGameSchema,
    handler: AdminGamesController.updateGame,
    preHandler: JwtAdminPrivilegeGuard,
  },
  {
    method: RouteMethod.DELETE,
    url: '/:id',
    schema: AdminDeleteGameSchema,
    handler: AdminGamesController.deleteGame,
    preHandler: JwtAdminPrivilegeGuard,
  },
];

export default AdminGamesRoutes;
