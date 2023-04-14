import { FromSchema } from 'json-schema-to-ts';

// TODO: enhance validation
export const GetGameSchema = {
  summary: 'Get game record',
  tags: ['game'],
  description: 'Get game record',
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer', description: 'Game id' },
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
} as const;

export type GetGameParams = FromSchema<typeof GetGameSchema.params>;

export const GetGamesSchema = {
  summary: 'Get games array',
  tags: ['game'],
  description: 'Get games array',
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
          id: { type: 'integer', description: 'Game id' },
          name: { type: 'string', description: 'Game name' },
          display_name: { type: 'string', description: 'Display game name' },
          description: { type: 'string', description: 'Game description' },
          image_url: { type: 'string', description: 'Game image' },
          user_id: { type: 'string', description: 'user id relation' },
        },
      },
    },
  },
} as const;

export type GetGamesQueryString = FromSchema<typeof GetGamesSchema.querystring>;

export const GetMyGamesSchema = {
  summary: 'Get my games records (AUTHORIZATION REQUIRED)',
  tags: ['game'],
  description: 'Get my games records',
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
          id: { type: 'integer', description: 'Game id' },
          name: { type: 'string', description: 'Game name' },
          display_name: { type: 'string', description: 'Display game name' },
          description: { type: 'string', description: 'Game description' },
          image_url: { type: 'string', description: 'Game image' },
          user_id: { type: 'string', description: 'user id relation' },
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

export type GetMyGamesQueryString = FromSchema<
  typeof GetMyGamesSchema.querystring
>;

export const CreateGameSchema = {
  summary: 'Create new game record (AUTHORIZATION REQUIRED)',
  description: 'Create new game record.',
  tags: ['game'],
  body: {
    type: 'object',
    required: ['name', 'display_name'],
    properties: {
      name: { type: 'string', description: 'Game name' },
      display_name: { type: 'string', description: 'Display game name' },
      description: { type: 'string', description: 'Game description' },
      image_url: { type: 'string', description: 'Game image' },
    },
  },
  response: {
    201: {
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

export type CreateGameBody = FromSchema<typeof CreateGameSchema.body>;

export const UpdateGameSchema = {
  summary: 'Update existed game record (AUTHORIZATION REQUIRED)',
  tags: ['game'],
  description:
    'Update existed game record. Only user that created the record have the permission.',
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

export type UpdateGameParams = FromSchema<typeof UpdateGameSchema.params>;
export type UpdateGameBody = FromSchema<typeof UpdateGameSchema.body>;

export const DeleteGameSchema = {
  summary: 'Delete existed game record (AUTHORIZATION REQUIRED)',
  tags: ['game'],
  description:
    'Delete existed game record. Only user that created the record have the permission.',
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

export type DeleteGameParams = FromSchema<typeof DeleteGameSchema.params>;
