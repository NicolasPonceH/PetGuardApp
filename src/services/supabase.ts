import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SUPABASE_URL = 'https://jwmymnkdvoguvjuhfoxm.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_r5M1W6vB7glGeo3sY3XYjw_0GzTTW0p';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
