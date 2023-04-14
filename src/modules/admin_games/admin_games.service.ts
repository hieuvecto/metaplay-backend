import { SupabaseClient } from '@supabase/supabase-js';
import {
  AdminDeleteGameParams,
  AdminUpdateGameBody,
  AdminUpdateGameParams,
} from './admin_games.schema';
import {
  CaughtError,
  NotFoundError,
  UserInputError,
} from '../../common/errors';
import Logger from '../../common/logger';
import AdminSupabaseService from '../../common/supabase/admin_supabase.service';

class AdminGamesService {
  private static instance: AdminGamesService;

  private constructor(
    private readonly adminSupabaseClient: SupabaseClient = AdminSupabaseService.getClient(),
  ) {}

  public static getInstance(): AdminGamesService {
    if (!AdminGamesService.instance) {
      AdminGamesService.instance = new AdminGamesService();
    }

    return AdminGamesService.instance;
  }

  public async updateGame(
    { id }: AdminUpdateGameParams,
    { display_name, description, image_url }: AdminUpdateGameBody,
  ): Promise<any> {
    try {
      const getRes = await this.adminSupabaseClient
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

      const { data, error } = await this.adminSupabaseClient
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
      throw new CaughtError('Cannot update game.');
    }
  }

  public async deleteGame({ id }: AdminDeleteGameParams): Promise<boolean> {
    try {
      const getRes = await this.adminSupabaseClient
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

      const { error } = await this.adminSupabaseClient
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
      throw new CaughtError('Cannot delete game.');
    }
  }
}

export default AdminGamesService;
