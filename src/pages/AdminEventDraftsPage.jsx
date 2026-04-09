import {Button} from '../components/Button';
import {DraftCard} from '../components/DraftCard';
import {useDrafts} from '../hooks/useDrafts';

export default function AdminEventDraftsPage() {
	const {drafts, handleDeleteDraft} = useDrafts();

	return (
		<>
			<h1 className="text-2xl font-bold mb-5">Szkice</h1>
			<div className="flex flex-col gap-5 justify-center">
				{drafts.length === 0
					? <p className="text-center">
						Nie masz jeszcze szkiców
					</p>
					: drafts.map((draft) =>
						<DraftCard
							id={draft.id}
							key={draft.id}
							title={draft.title}
							updatedTimestamp={draft.updated_at}
							handleDeleteDraft={handleDeleteDraft}
						/>,
					)
				}
				<Button
					content="Dodaj nowy"
					path="/admin/events/new"
					cssClass="sm:w-50! mt-10"
				/>
			</div>
		</>
	);
}
