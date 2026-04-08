import {supabase} from '../supabase';

export const fetchAllUsers = async() => {
	const {data, error} = await supabase
		.from('profiles')
		.select('id, email, nick, role, approval_status, created_at')
		.eq('role', 'user')
		.order('approval_status', {ascending: false})
		.order('created_at', {ascending: false});

	if (error) {
		throw new Error(error.message);
	}

	return data ?? [];
};

export const fetchUser = async(userId) => {
	const {data, error} = await supabase
		.from('profiles')
		.select('id, email, nick, role, approval_status')
		.eq('id', userId)
		.single();

	return {data: data ?? [], error};
};

export const approveUser = async(userId) => {
	const {error} = await supabase
		.from('profiles')
		.update({approval_status: 'approved'})
		.eq('id', userId);

	if (error) {
		throw new Error(error.message);
	}

	return;
};
