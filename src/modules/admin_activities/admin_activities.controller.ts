import { FastifyRequest } from 'fastify';
import { Controller } from '../../interfaces';
import { AdminGetActivitiesQueryString } from './admin_activities.schema';
import AdminActivitiesService from './admin_activities.service';

const AdminActivitiesController: Controller = {
  getActivities: async (
    request: FastifyRequest<{ Querystring: AdminGetActivitiesQueryString }>,
    reply,
  ) => {
    const data = await AdminActivitiesService.getInstance().getActivities(
      request.query,
    );
    return reply.send(data);
  },
};

export default AdminActivitiesController;
