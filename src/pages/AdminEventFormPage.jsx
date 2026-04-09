import {useState} from 'react';
import {useParams, useNavigate} from 'react-router';
import dayjs from 'dayjs';
import {useAuth} from '../context/AppContext';
import {UserInput} from '../components/Inputs';
import {Button} from '../components/Button';
import {useDrafts} from '../hooks/useDrafts';
import {toast} from '../lib/toasts';
import {isEmpty} from '../lib/isEmpty';

export default function AdminEventFormPage() {
	const {id} = useParams();
	const navigate = useNavigate();
	const {profile} = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const {handleAddDraft} = useDrafts();

	const [draft, setDraft] = useState({
		title: '',
		begin: '',
		end: '',
		content: '',
	});

	const title = id ? 'Edytuj rajd' : 'Dodaj rajd';

	const handleChange = (event) => {
		const {name, value} = event.target;
		setDraft((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSaveDraft = async() => {
		setIsLoading(true);
		if (!checkFields()) {
			setIsLoading(false);
			return;
		}
		const cleanDraft = sanitizeDraft(draft);

		if (id) {
			console.log('save existing');
		} else {
			await handleAddDraft({
				draft: cleanDraft,
				author: profile.id,
			});
		}
		setIsLoading(false);
		navigate('/admin/events/drafts');
	};

	const handlePublish = () => {
		setIsLoading(true);
	};

	const checkFields = () => {
		if (isEmpty(draft.title)
			|| isEmpty(draft.content)
			|| isEmpty(draft.begin)
			|| isEmpty(draft.end)
		) {
			toast({
				content: 'Uzupełnij wszystkie pola',
				type: 'info',
			});
			return false;
		} else if (dayjs(draft.begin).isAfter(dayjs(draft.end))) {
			toast({
				content: 'Koniec nie może być przed początkiem',
				type: 'info',
			});
			return false;
		} else {
			return true;
		}
	};

	const sanitizeDraft = (draft) => {
		return {
			title: draft.title.trim(),
			begin: draft.begin.trim(),
			end: draft.end.trim(),
			content: draft.content.trim(),
		};
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-5">{title}</h1>
			<div className="rounded-2xl bg-primary-0 p-6 shadow-xl flex flex-col">
				<form onSubmit={handlePublish}>
					<div className="grid grid-cols-2 gap-x-5">
						{draftItems.map((item) =>
							<UserInput
								label={item.label}
								id={item.id}
								key={item.id}
								name={item.name}
								type={item.type || 'text'}
								placeholder={item.placeholder}
								value={draft[item.name]}
								required={true}
								onChange={handleChange}
								isDisabled={isLoading}
								cssLayout={item.type === 'date' ? 'col-span-full sm:col-span-1' : 'col-span-full'}
							/>,
						)}
					</div>
					<div className="grid grid-cols-2 gap-x-5 gap-y-5 sm:gap-y-0 justify-items-center">
						<Button
							content="Zapisz szkic"
							type="secondary"
							isLoading={isLoading}
							onClick={handleSaveDraft}
							isDisabled={isLoading}
							cssClass="sm:w-50! col-span-full sm:col-span-1"
						/>
						<Button
							content="Opublikuj"
							isLoading={isLoading}
							isDisabled={isLoading}
							cssClass="sm:w-50! col-span-full sm:col-span-1"
						/>
					</div>
				</form>
				<Button
					path="/admin/events/drafts"
					simple
				/>
			</div>
		</>
	);
}

const draftItems = [
	{
		label: 'Tytuł:',
		id: 'title',
		name: 'title',
		placeholder: 'Tytuł',
	},
	{
		label: 'Początek:',
		id: 'begin',
		name: 'begin',
		type: 'date',
	},
	{
		label: 'Koniec:',
		id: 'end',
		name: 'end',
		type: 'date',
	},
	{
		label: 'Opis:',
		placeholder: 'Opis...',
		id: 'content',
		name: 'content',
		type: 'textarea',
	},
];
