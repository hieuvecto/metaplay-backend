import { Route, RouteMethod } from '../../interfaces';
import JwtAdminPrivilegeGuard from '../../common/guards/jwt_admin_privilege_guard';
import AdminActivitiesController from './admin_activities.controller';
import { AdminGetActivitiesSchema } from './admin_activities.schema';

const AdminActivitiesRoutes: Route[] = [
  {
    method: RouteMethod.GET,
    url: '/',
    schema: AdminGetActivitiesSchema,
    handler: AdminActivitiesController.getActivities,
    preHandler: JwtAdminPrivilegeGuard,
  },
];

export default AdminActivitiesRoutes;
