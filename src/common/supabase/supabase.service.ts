import { SupabaseClient, createClient } from '@supabase/supabase-js';
import configs from '../../configs';

class SupabaseService {
  private static anonInstance: SupabaseClient;
  private static serviceInstance: SupabaseClient;

  private constructor() {}

  public static getAnonInstance(): SupabaseClient {
    if (!SupabaseService.anonInstance) {
      SupabaseService.anonInstance = createClient(
        configs.supabaseUrl,
        configs.supabaseAnonKey,
      );
    }

    return SupabaseService.anonInstance;
  }

  public static getServiceInstance(): SupabaseClient {
    if (!SupabaseService.serviceInstance) {
      SupabaseService.serviceInstance = createClient(
        configs.supabaseUrl,
        configs.supabaseServiceKey,
      );
    }

    return SupabaseService.serviceInstance;
  }
}

export default SupabaseService;
