import { FromSchema } from 'json-schema-to-ts';

export const AdminGetActivitiesSchema = {
  summary: 'Get user activities (ADMIN AUTHORIZATION REQUIRED)',
  tags: ['admin_activities'],
  description: 'Get user activities',
  querystring: {
    type: 'object',
    properties: {
      limit: { type: 'integer', description: 'limit' },
      offset: { type: 'integer', description: 'offset' },
    },
  },
  response: {
    200: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          id: { type: 'integer', description: 'Activitiy record id' },
          message: { type: 'string', description: 'activity message' },
          user_id: { type: 'string', description: 'user id relation' },
          created_at: {
            type: 'string',
            format: 'date-time',
            description: 'created at',
          },
        },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
} as const;

export type AdminGetActivitiesQueryString = FromSchema<
  typeof AdminGetActivitiesSchema.querystring
>;
