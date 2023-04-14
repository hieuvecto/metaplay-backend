import { FastifyReply, FastifyRequest } from 'fastify';
import { Guard } from '../../interfaces';
import {
  BadRequestError,
  ForbiddenError,
  UnauthorizedError,
  UserInputError,
} from '../errors';
import Logger from '../logger';
import { User } from '@supabase/supabase-js';
import AdminSupabaseService from '../supabase/admin_supabase.service';

const AdminPrivilegeGuard: Guard = async (
  request: FastifyRequest & { adminUser: User },
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
      match[1],
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
    throw new Error('Cannot verify access token.');
  }
};

export default AdminPrivilegeGuard;
