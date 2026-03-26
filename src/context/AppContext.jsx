import {createContext, useContext, useEffect, useMemo, useState} from 'react';
import {supabase} from '../lib/supabase';

const AuthContext = createContext(null);

export function AuthProvider({children}) {
	const [session, setSession] = useState(null);
	const [user, setUser] = useState(null);
	const [profile, setProfile] = useState(null);

	const [isAuthReady, setIsAuthReady] = useState(false);
	const [isProfileReady, setIsProfileReady] = useState(false);

	const loadProfile = async(userId) => {
		const {data, error} = await supabase
			.from('profiles')
			.select('id, email, nick, role, approval_status')
			.eq('id', userId)
			.single();

		if (error) {
			console.error('Błąd podczas pobierania profilu:', error.message);
			setProfile(null);
			setIsProfileReady(true);

			return null;
		}
		setProfile(data ?? null);
		setIsProfileReady(true);

		return data ?? null;
	};

	const refreshProfile = async() => {
		if (!user?.id) return null;
		setIsProfileReady(false);

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
		let active = true;

		const applySession = async(session) => {
			if (!active) return;

			setSession(session);
			setUser(session?.user ?? null);

			if (!session?.user) {
				setProfile(null);
				setIsProfileReady(true);
				return;
			}

			setIsProfileReady(false);
			await loadProfile(session.user.id);
		};

		const init = async() => {
			try {
				const {
					data: {session},
					error,
				} = await supabase.auth.getSession();

				if (!active) return;

				if (error) {
					console.error('Błąd podczas pobierania sesji:', error.message);
					setSession(null);
					setUser(null);
					setProfile(null);
					setIsProfileReady(false);

					return;
				}

				await applySession(session);
			} finally {
				if (active) {
					setIsAuthReady(true);
				}
			}
		};

		init();

		const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
			if (!active) return;

			setIsAuthReady(true);
			queueMicrotask(async() => {
				await applySession(session);
			});
		});

		return () => {
			active = false;
			subscription.unsubscribe();
		};
	}, []);

	const value = useMemo(() => {
		return {
			session,
			user,
			profile,
			isAuthReady,
			isProfileReady,
			isLoggedIn: !!user,
			isAdmin: profile?.role === 'admin',
			isApproved: profile?.approval_status === 'approved',
			refreshProfile,
			signOut,
		};
	}, [session, user, profile, isAuthReady, isProfileReady]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error('useAuth musi być użyty wewnątrz AuthProvider');
	}

	return context;
}
