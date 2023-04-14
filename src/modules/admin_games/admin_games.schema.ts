import { FromSchema } from 'json-schema-to-ts';

// TODO: enhance validation
export const AdminUpdateGameSchema = {
  summary: 'Update existed game record (ADMIN AUTHORIZATION REQUIRED)',
  tags: ['admin_games'],
  description: 'Updating existed game record.',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Game id' },
    },
  },
  body: {
    type: 'object',
    properties: {
      display_name: { type: 'string', description: 'Display game name' },
      description: { type: 'string', description: 'Game description' },
      image_url: { type: 'string', description: 'Game image' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer', description: 'Game id' },
        name: { type: 'string', description: 'Game name' },
        display_name: { type: 'string', description: 'Display game name' },
        description: { type: 'string', description: 'Game description' },
        image_url: { type: 'string', description: 'Game image' },
        user_id: { type: 'string', description: 'user id relation' },
      },
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
} as const;

export type AdminUpdateGameParams = FromSchema<
  typeof AdminUpdateGameSchema.params
>;
export type AdminUpdateGameBody = FromSchema<typeof AdminUpdateGameSchema.body>;

export const AdminDeleteGameSchema = {
  summary: 'Delete existed game record (ADMIN AUTHORIZATION REQUIRED)',
  tags: ['admin_games'],
  description: 'Delete existed game record.',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Game id' },
    },
  },
  response: {
    200: {
      type: 'boolean',
    },
  },
  security: [
    {
      bearerAuth: [],
    },
  ],
} as const;

export type AdminDeleteGameParams = FromSchema<
  typeof AdminDeleteGameSchema.params
>;
