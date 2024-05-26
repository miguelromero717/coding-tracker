import { signInWithGoogle } from '$lib/server/supabase/Auth';
import { json, redirect } from '@sveltejs/kit';

export const POST = async ({locals: { supabase }}) => {
	const { data, error } = await signInWithGoogle(supabase);

	if (error) {
		return json({ error: error.message }, { status: 500 });
	}

	if (data.url) {
		return redirect(301, data.url);
	}
};