import {useState} from 'react';
import dayjs from 'dayjs';
import {dateTimeFormat} from '../lib/constants';
import {Button} from './Button';
import {DeleteDraftModal} from './DeleteDraftModal';

export const DraftCard = ({
	id,
	title,
	updatedTimestamp,
	handleDeleteDraft,
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<div className="bg-primary-0 rounded-xl shadow-xl flex flex-row justify-between">
			<div className="flex flex-col p-3">
				<h3 className="text-2xl font-semibold mb-1">
					{title}
				</h3>
				<p className="text-sm">
					Edytowano: {dayjs(updatedTimestamp).format(dateTimeFormat)}
				</p>
			</div>
			<div className="flex flex-row gap-3 me-3">
				<Button
					content="Edytuj"
					size="small"
					path={`/admin/events/${id}/edit`}
					cssClass="w-25!"
				/>
				<Button
					content="Usuń"
					size="small"
					onClick={() => setShowModal(true)}
					type="danger"
					cssClass="w-30!"
				/>
				<DeleteDraftModal
					showModal={showModal}
					setShowModal={setShowModal}
					draftId={id}
					handleDeleteDraft={() => handleDeleteDraft({draftId: id})}
				/>
			</div>
		</div>
	);
};

