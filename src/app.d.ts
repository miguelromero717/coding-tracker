// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		interface Locals {
			supabase: SupabaseClient;

			safeGetSession(): Promise<{ session: Session | null; user: User | null; }>;
		}

		interface PageData {
			session: Session | null;
		}

		interface Platform {
			env: {
				COUNTER: DurableObjectNamespace;
			};
			context: {
				waitUntil(promise: Promise<unknown>): void;
			};
			caches: CacheStorage & { default: Cache };
		}

		// interface Error {}
	}
}
