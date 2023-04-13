import { FromSchema } from 'json-schema-to-ts';

// TODO: enhance validation
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

export const UpdateGameSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  body: {
    type: 'object',
    properties: {
      display_name: { type: 'string' },
      description: { type: 'string' },
      image_url: { type: 'string' },
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

export type UpdateGameParams = FromSchema<typeof UpdateGameSchema.params>;
export type UpdateGameBody = FromSchema<typeof UpdateGameSchema.body>;

export const DeleteGameSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: { type: 'integer' },
    },
  },
  response: {
    200: {
      type: 'boolean',
    },
  },
} as const;

export type DeleteGameParams = FromSchema<typeof DeleteGameSchema.params>;
