import { SupabaseClient, createClient } from '@supabase/supabase-js';
import configs from '../../configs';

class AdminSupabaseService {
  private static instance: SupabaseClient;

  private constructor() {}

  public static getInstance(): SupabaseClient {
    if (!AdminSupabaseService.instance) {
      AdminSupabaseService.instance = createClient(
        configs.supabaseUrl,
        configs.supabaseServiceKey,
      );
    }

    return AdminSupabaseService.instance;
  }
}

export default AdminSupabaseService;
