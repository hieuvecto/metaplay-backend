import { SupabaseClient, createClient } from '@supabase/supabase-js';
import configs from '../../configs';

class SupabaseService {
  private static instance: SupabaseClient;

  private constructor() {}

  public static getClient(): SupabaseClient {
    if (!SupabaseService.instance) {
      SupabaseService.instance = createClient(
        configs.supabaseUrl,
        configs.supabaseAnonKey,
      );
    }

    return SupabaseService.instance;
  }

  public static getNewClientWithAccessToken(
    accessToken: string,
  ): SupabaseClient {
    return createClient(configs.supabaseUrl, configs.supabaseAnonKey, {
      auth: {
        autoRefreshToken: false,
        detectSessionInUrl: false,
        persistSession: false,
      },
      global: {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    });
  }
}

export default SupabaseService;
