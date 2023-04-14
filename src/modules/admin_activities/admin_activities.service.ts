import { SupabaseClient } from '@supabase/supabase-js';
import { AdminGetActivitiesQueryString } from './admin_activities.schema';
import { CaughtError } from '../../common/errors';
import Logger from '../../common/logger';
import AdminSupabaseService from '../../common/supabase/admin_supabase.service';

class AdminActivitiesService {
  private static instance: AdminActivitiesService;

  private constructor(
    private readonly adminSupabaseClient: SupabaseClient = AdminSupabaseService.getClient(),
  ) {}

  public static getInstance(): AdminActivitiesService {
    if (!AdminActivitiesService.instance) {
      AdminActivitiesService.instance = new AdminActivitiesService();
    }

    return AdminActivitiesService.instance;
  }

  public async getActivities({
    limit = 100,
    offset = 0,
  }: AdminGetActivitiesQueryString): Promise<any[]> {
    try {
      const { data, error } = await this.adminSupabaseClient
        .from('activities')
        .select()
        .range(offset, offset + limit - 1);
      if (error) throw error;

      return data;
    } catch (e) {
      Logger.error(`Cannot get activities: ${e.message}`);
      throw new CaughtError('Cannot get activities.');
    }
  }
}

export default AdminActivitiesService;
