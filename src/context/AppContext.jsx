import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {supabase} from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const loadProfile = async(userId) => {
		const {data, error} = await supabase
			.from('profiles')
			.select('id, email, nick, role, approval_status')
			.eq('id', userId)
			.single();

		if (error) {
			console.error('Błąd podczas pobierania profilu:', error.message);
			setProfile(null);

			return null;
		}
		setProfile(data);

		return data;
	};

	const refreshProfile = async() => {
		if (!user?.id) return null;

		return loadProfile(user.id);
	};

	const signOut = async() => {
		const {error} = await supabase.auth.signOut();

		if (error) {
			console.error('Błąd podczas wylogowania:', error.message);
			throw error;
		}
	};

	useEffect(() => {
		let isMounted = true;

		const initializeAuth = async() => {
			setIsLoading(true);

			const {
				data: {session},
				error,
			} = await supabase.auth.getSession();

			if (!isMounted) return;

			if (error) {
				console.error('Błąd podczas pobierania sesji:', error.message);
				setSession(null);
				setUser(null);
				setProfile(null);
				setIsLoading(false);

				return;
			}

			setSession(session);
			setUser(session?.user ?? null);

			if (session?.user) {
				await loadProfile(session.user.id);
			} else {
				setProfile(null);
			}

			if (isMounted) {
				setIsLoading(false);
			}
		};

		initializeAuth();

		const {data: {subscription}} = supabase.auth.onAuthStateChange((event, session) => {
			setSession(session);
			setUser(session?.user ?? null);

			if (!session?.user) {
				setProfile(null);
				setIsLoading(false);

				return;
			}

			queueMicrotask(async() => {
				await loadProfile(session.user.id);

				if (isMounted) {
					setIsLoading(false);
				}
			});
		});

		return () => {
			isMounted = false;
			subscription.unsubscribe();
		};
	}, []);

	const value = useMemo(() => {
		return {
			session,
			user,
			profile,
			isLoading,
			isLoggedIn: !!user,
			isAdmin: profile?.role === 'admin',
			isApproved: profile?.approval_status === 'approved',
			refreshProfile,
			signOut,
		};
	}, [session, user, profile, isLoading]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
	}

	return context;
}
