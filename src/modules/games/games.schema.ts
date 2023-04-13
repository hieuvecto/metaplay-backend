import { FromSchema } from 'json-schema-to-ts';

export const GetGameSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        display_name: { type: 'string' },
        description: { type: 'string' },
        image_url: { type: 'string' },
      },
    },
  },
} as const;

export type GetGameParams = FromSchema<typeof GetGameSchema.params>;

export const CreateGameSchema = {
  body: {
    type: 'object',
    required: ['name', 'display_name'],
    properties: {
      name: { type: 'string' },
      display_name: { type: 'string' },
      description: { type: 'string' },
      image_url: { type: 'string' },
    },
  },
  response: {
    201: {
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
        display_name: { type: 'string' },
        description: { type: 'string' },
        image_url: { type: 'string' },
      },
    },
  },
} as const;

export type CreateGameBody = FromSchema<typeof CreateGameSchema.body>;
