import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_LOGIN_REDIRECT_URL } from '$env/static/private';

export const signInWithGoogle = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google',
		options: {
			redirectTo: SUPABASE_LOGIN_REDIRECT_URL,
		},
	});

	if (error) return { error };

	return { data };
};
