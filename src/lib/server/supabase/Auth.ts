import type { SupabaseClient } from '@supabase/supabase-js';

export const signInWithGoogle = async (supabase: SupabaseClient) => {
	const { data, error } = await supabase.auth.signInWithOAuth({
		provider: 'google'
	});

	if (error) return { error };

	return { data };
};
