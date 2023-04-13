import { SupabaseClient } from '@supabase/supabase-js';
import { PostgrestError } from '@supabase/postgrest-js';
import SupabaseService from '../../common/supabase/supabase.service';
import { CreateGameBody, GetGameParams } from './games.schema';
import { UserInputError } from '../../common/errors/user_input_error';

class GamesService {
  private static instance: GamesService;

  private constructor(
    private readonly anonSupabaseInstance: SupabaseClient = SupabaseService.getAnonInstance(),
    private readonly serviceSupabaseInstance: SupabaseClient = SupabaseService.getServiceInstance(),
  ) {}

  public static getInstance(): GamesService {
    if (!GamesService.instance) {
      GamesService.instance = new GamesService();
    }

    return GamesService.instance;
  }

  public async getGame({ id }: GetGameParams): Promise<any> {
    try {
      const { data, error } = await this.anonSupabaseInstance
        .from('games')
        .select()
        .eq('id', id)
        .limit(1)
        .maybeSingle();
      if (error) throw error;
      if (!data) {
        throw new UserInputError('Game not found.');
      }

      return data;
    } catch (e) {
      if (e instanceof UserInputError) {
        throw e;
      }
      // TODO: use fastify logger.
      console.log(e.message);
      throw new Error('Cannot get game.');
    }
  }

  public async createGame({
    name,
    display_name,
    description,
    image_url,
  }: CreateGameBody): Promise<any> {
    try {
      const getRes = await this.serviceSupabaseInstance
        .from('games')
        .select()
        .eq('name', name)
        .limit(1)
        .maybeSingle();
      if (getRes.error) {
        throw getRes.error;
      }
      if (getRes.data) {
        throw new UserInputError('Game existed.');
      }

      const { data, error } = await this.serviceSupabaseInstance
        .from('games')
        .insert({
          name,
          display_name,
          description,
          image_url,
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
      console.log(e.message);
      throw new Error('Cannot create game.');
    }
  }
}

export default GamesService;
