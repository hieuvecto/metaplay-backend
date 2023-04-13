import { SupabaseClient, User } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/postgrest-js';
import SupabaseService from '../../common/supabase/supabase.service';
import {
  CreateGameBody,
  DeleteGameParams,
  GetGameParams,
  UpdateGameBody,
  UpdateGameParams,
} from './games.schema';
import {
  ConflictError,
  ForbiddenError,
  NotFoundError,
  UserInputError,
} from '../../common/errors';
import Logger from '../../common/logger';
import { FastifyRequest } from 'fastify';
import { FastifyRequestWithUser } from '../../common/guards/jwt_login_level_guard';

class GamesService {
  private static instance: GamesService;

  private constructor(
    private readonly supabaseService: SupabaseClient = SupabaseService.getInstance(),
  ) {}

  public static getInstance(): GamesService {
    if (!GamesService.instance) {
      GamesService.instance = new GamesService();
    }

    return GamesService.instance;
  }

  public async getGame({ id }: GetGameParams): Promise<any> {
    try {
      const { data, error } = await this.supabaseService
        .from('games')
        .select()
        .eq('id', id)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        throw new NotFoundError('Game not found.');
      }

      return data;
    } catch (e) {
      if (e instanceof UserInputError) {
        throw e;
      }
      Logger.error(`Cannot get game: ${e.message}`);
      throw new Error('Cannot get game.');
    }
  }

  // I can't find anywhere in the docs about transaction support in Supabase
  // https://github.com/orgs/supabase/discussions/526
  public async createGame(
    { name, display_name, description, image_url }: CreateGameBody,
    request: FastifyRequestWithUser,
  ): Promise<any> {
    try {
      const getRes = await this.supabaseService
        .from('games')
        .select()
        .eq('name', name)
        .limit(1)
        .maybeSingle();
      if (getRes.error) {
        throw getRes.error;
      }
      if (getRes.data) {
        throw new ConflictError('Game existed.');
      }

      const { data, error } = await this.supabaseService
        .from('games')
        .insert({
          name,
          display_name,
          description,
          image_url,
          user_id: request.user.id,
        })
        .select()
        .single();
      if (error) {
        throw error;
      }

      return data;
    } catch (e) {
      if (e instanceof UserInputError) {
        throw e;
      }
      Logger.error(`Cannot create game: ${e.message}`);
      throw new Error('Cannot create game.');
    }
  }

  public async updateGame(
    { id }: UpdateGameParams,
    { display_name, description, image_url }: UpdateGameBody,
    request: FastifyRequestWithUser,
  ): Promise<any> {
    try {
      const getRes = await this.supabaseService
        .from('games')
        .select()
        .eq('id', id)
        .limit(1)
        .maybeSingle();
      if (getRes.error) {
        throw getRes.error;
      }
      if (!getRes.data) {
        throw new NotFoundError('Game not found.');
      }
      // I configured RLS for update operation, so no need this check
      // if (getRes.data.user_id !== request.user.id) {
      //   throw new ForbiddenError('User is not owner.');
      // }

      const { data, error } = await this.supabaseService
        .from('games')
        .update({
          display_name,
          description,
          image_url,
        })
        .eq('id', id)
        .select()
        .single();
      if (error) {
        throw error;
      }

      return data;
    } catch (e) {
      if (e instanceof UserInputError) {
        throw e;
      }
      Logger.error(`Cannot update game: ${e.message}`);
      throw new Error('Cannot update game.');
    }
  }

  public async deleteGame(
    { id }: DeleteGameParams,
    request: FastifyRequestWithUser,
  ): Promise<boolean> {
    try {
      const getRes = await this.supabaseService
        .from('games')
        .select()
        .eq('id', id)
        .limit(1)
        .maybeSingle();
      if (getRes.error) {
        throw getRes.error;
      }
      if (!getRes.data) {
        throw new NotFoundError('Game not found.');
      }
      // I configured RLS for delete operation, so no need this check
      // if (getRes.data.user_id !== request.user.id) {
      //   throw new ForbiddenError('User is not owner.');
      // }

      const { error } = await this.supabaseService
        .from('games')
        .delete()
        .eq('id', id);
      if (error) {
        throw error;
      }

      return true;
    } catch (e) {
      if (e instanceof UserInputError) {
        throw e;
      }
      Logger.error(`Cannot delete game: ${e.message}`);
      throw new Error('Cannot delete game.');
    }
  }
}

export default GamesService;
