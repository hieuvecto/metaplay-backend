import { SupabaseClient, createClient } from '@supabase/supabase-js';
import configs from '../../configs';

class SupabaseService {
  private static instance: SupabaseClient;

  private constructor() {}

  public static getInstance(): SupabaseClient {
    if (!SupabaseService.instance) {
      SupabaseService.instance = createClient(
        configs.supabaseUrl,
        configs.supabaseAnonKey,
      );
    }

    return SupabaseService.instance;
  }
}

export default SupabaseService;
