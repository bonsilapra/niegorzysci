import {Modal} from './Modal';
import {Button} from './Button';

export const DeleteDraftModal = ({
	showModal,
	setShowModal,
	draftId,
	handleDeleteDraft,
}) => {
	return (
		<Modal
			isOpen={showModal}
			onClose={() => setShowModal(false)}
		>
			<div>
				<p className="text-xl mb-5">
					Czy na pewno usunąć ten szkic?
				</p>
				<div className="flex gap-5">
					<Button
						content="Usuń"
						onClick={() => handleDeleteDraft(draftId)}
						type="danger"
					/>
					<Button
						content="Anuluj"
						onClick={() => setShowModal(false)}
					/>
				</div>
			</div>
		</Modal>
	);
};
