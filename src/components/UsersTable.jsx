import dayjs from 'dayjs';
import cx from 'classnames';
import {useUsers} from '../context/UsersContext';
import {dateFormat} from '../lib/constants';
import {ActionButton} from '../components/Buttons';

export const UsersTable = ({users}) => {
	if (!users || !users.length) {
		return (
			<div className="mt-10 flex justify-center">
				<div className="p-6 bg-primary-0 w-50 text-center rounded-2xl shadow-lg">
					Brak użytkowników do wyświetlenia
				</div>
			</div>
		);
	}

	return (
		<div className="min-w-full flex justify-center mt-10">
			<table className="bg-white">
				<thead>
					<tr className="border-b-3 border-primary-300">
						<HeaderItem content="Nick" />
						<HeaderItem content="Email" />
						<HeaderItem content="Status" />
						<HeaderItem content="Data utworzenia" />
						<HeaderItem content="Akcje" />
					</tr>
				</thead>
				<tbody>
					{users.map(user =>
						<UserRow user={user} key={user.id} />,
					)}
				</tbody>
			</table>
		</div>
	);
};

const HeaderItem = ({content}) => {

	return (
		<th className="py-4 px-5 text-left">
			{content}
		</th>
	);
};

const UserRow = ({user}) => {

	return (
		<tr className="border-b last:border-b-0 border-primary-300">
			<RowItem value={user.nick} />
			<RowItem value={user.email} />
			<RowItem value={user.approval_status} />
			<RowItem value={user.created_at} type="date" />
			<ActionCell
				userId={user.id}
				status={user.approval_status}
			/>
		</tr>
	);
};

const RowItem = ({value, type = 'text'}) => {
	let content = value;
	if (type === 'date') {
		content = dayjs(value).format(dateFormat);
	}

	const isPending = type === 'text' && value === 'pending';

	return <td className={cx('py-3 px-5', {'text-yellow-500 font-bold': isPending})}>
		{content}
	</td>;
};

const ActionCell = ({userId, status}) => {
	const {approveUser, updatingUserId} = useUsers();

	return <td className={cx('p-3')}>
		<ActionButton
			content="Aktywuj"
			isDisabled={updatingUserId || status === 'approved'}
			onClick={() => approveUser(userId)}
			cssClass="p-2! h-10! w-25!"
		/>
	</td>;
};
