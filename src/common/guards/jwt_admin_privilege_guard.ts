import { FastifyReply, FastifyRequest } from 'fastify';
import { Guard } from '../../interfaces';
import {
  BadRequestError,
  CaughtError,
  ForbiddenError,
  UnauthorizedError,
  UserInputError,
} from '../errors';
import Logger from '../logger';
import { User } from '@supabase/supabase-js';
import AdminSupabaseService from '../supabase/admin_supabase.service';

export type FastifyRequestWithAdminUser = FastifyRequest & { adminUser: User };

const JwtAdminPrivilegeGuard: Guard = async (
  request: FastifyRequestWithAdminUser,
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
    const { data, error } = await AdminSupabaseService.getClient().auth.getUser(
      accessToken,
    );
    if (error) {
      throw error;
    }
    if (!data.user.user_metadata?.is_admin) {
      throw new ForbiddenError('Forbidden.');
    }

    request.adminUser = data.user;
    next();
  } catch (e) {
    if (e instanceof UserInputError) {
      throw e;
    }
    Logger.error(`Cannot verify access token: ${e.message}`);
    throw new CaughtError('Cannot verify access token.');
  }
};

export default JwtAdminPrivilegeGuard;
