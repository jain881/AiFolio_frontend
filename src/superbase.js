import {createClient} from '@supabase/supabase-js';

export const superbase = createClient(
    process.env.REACT_APP_SUPER_BASE_URL, process.env.REACT_APP_SUPER_BASE_KEY
); 