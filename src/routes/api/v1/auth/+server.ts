import { signInWithGoogle } from '$lib/server/supabase/Auth';
import { json } from '@sveltejs/kit';

export const POST = async ({locals: { supabase }}) => {
	const { data, error } = await signInWithGoogle(supabase);

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	return json({ data, success: true });
};