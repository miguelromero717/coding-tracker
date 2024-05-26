import {PUBLIC_SUPABASE_ANON_KEY, PUBLIC_SUPABASE_URL} from '$env/static/public';
import {type Handle} from '@sveltejs/kit';
import {createServerClient} from "@supabase/ssr";

export const handle: Handle = async ({event, resolve}) => {
	event.locals.supabase = createServerClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY, {
		cookies: {
			get: (key) => event.cookies.get(key),
			set: (key, value, options) => {
				event.cookies.set(key, value, {...options, path: '/'})
			},
			remove: (key, options) => {
				event.cookies.delete(key, {...options, path: '/'})
			},
		}
	});

	event.locals.safeGetSession = async () => {
		const {
			data: {user},
			error,
		} = await event.locals.supabase.auth.getUser()
		if (error) {
			return {session: null, user: null}
		}

		const {
			data: {session},
		} = await event.locals.supabase.auth.getSession()

		return {session, user}
	}

	return resolve(event, {
		filterSerializedResponseHeaders(name) {
			return name === 'content-range'
		},
	})
};