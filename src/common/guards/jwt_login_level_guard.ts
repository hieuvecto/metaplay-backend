import { FastifyReply, FastifyRequest } from 'fastify';
import { Guard } from '../../interfaces';
import { BadRequestError, UnauthorizedError, UserInputError } from '../errors';
import SupabaseService from '../supabase/supabase.service';
import Logger from '../logger';
import { SupabaseClient, User } from '@supabase/supabase-js';

export type FastifyRequestWithUser = FastifyRequest & {
  user: User;
  supabaseClient: SupabaseClient;
};

const JwtLoginLevelGuard: Guard = async (
  request: FastifyRequestWithUser,
  reply,
  next,
) => {
  try {
    const { authorization } = request.headers;
    if (!authorization) {
      throw new UnauthorizedError('Unauthorized');
    }

    const regex = /^Bearer (.+)/;
    const match = authorization.match(regex);
    if (!match) {
      throw new BadRequestError('Bad request.');
    }
    const accessToken = match[1];
    const { data, error } = await SupabaseService.getClient().auth.getUser(
      accessToken,
    );
    if (error) {
      throw error;
    }

    request.user = data.user;
    request.supabaseClient =
      SupabaseService.getNewClientWithAccessToken(accessToken);
    next();
  } catch (e) {
    if (e instanceof UserInputError) {
      throw e;
    }
    Logger.error(`Cannot verify access token: ${e.message}`);
    throw new Error('Cannot verify access token.');
  }
};

export default JwtLoginLevelGuard;
