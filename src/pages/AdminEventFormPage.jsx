import {useState, useEffect} from 'react';
import {useParams, useNavigate} from 'react-router';
import dayjs from 'dayjs';
import {inputDateFormat} from '../lib/constants';
import {useAuth} from '../context/AppContext';
import {UserInput, ImageInput} from '../components/Inputs';
import {Button} from '../components/Button';
import {Loader} from '../components/Loader';
import {DeleteDraftModal} from '../components/DeleteDraftModal';
import {useDrafts} from '../hooks/useDrafts';
import {toast} from '../lib/toasts';
import {isEmpty} from '../lib/isEmpty';

const emptyDraft = {
	title: '',
	begin: '',
	end: '',
	content: '',
	logo_path: null,
	cover_path: null,
};

export default function AdminEventFormPage() {
	const {id} = useParams();
	const isExistingDraft = !!id;
	const {handleAddDraft, loadDraft, isLoadingDraft, handleDeleteDraft} = useDrafts();

	const navigate = useNavigate();
	const {profile} = useAuth();

	const [isLoading, setIsLoading] = useState(false);
	const [draft, setDraft] = useState(emptyDraft);
	const [logoFile, setLogoFile] = useState(null);
	const [coverFile, setCoverFile] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);

	const title = isExistingDraft ? 'Edytuj rajd' : 'Dodaj rajd';

	useEffect(() => {
		const init = async() => {
			if (!isExistingDraft) {
				setDraft(emptyDraft);
				return;
			}

			const draft = await loadDraft(id);

			if (draft) {
				setDraft({
					title: draft.title ?? '',
					begin: dayjs(draft.event_begin).format(inputDateFormat) ?? '',
					end: dayjs(draft.event_end).format(inputDateFormat) ?? '',
					content: draft.content ?? '',
					logo_path: draft.logo_path ?? null,
					cover_path: draft.cover_path ?? null,
				});
			}
		};

		init();
	}, [id, loadDraft]);

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

		if (isExistingDraft) {
			console.log('save existing');
		} else {
			try {
				await handleAddDraft({
					draft: {
						...cleanDraft,
						logoFile,
						coverFile,
					},
					author: profile.id,
				});
				toast({
					content: 'Szkic został dodany',
					type: 'success',
				});
			} catch (error) {
				console.error(error);
				toast({
					content: error.message || 'Nie można dodać szkicu',
					type: 'error',
				});
			} finally {
				navigate('/admin/events/drafts');
				setIsLoading(false);
			}
		}
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

	if (isLoadingDraft) {
		return <Loader type="full-page" />;
	}

	return (
		<>
			<h1 className="text-2xl font-bold mb-5">{title}</h1>
			<div className="rounded-2xl bg-primary-0 p-6 shadow-xl flex flex-col">
				{isExistingDraft &&
					<>
						<Button
							content="Usuń"
							size="small"
							onClick={() => setShowDeleteModal(true)}
							type="danger"
							cssClass="w-30! self-end"
						/>
						<DeleteDraftModal
							showModal={showDeleteModal}
							setShowModal={setShowDeleteModal}
							handleDeleteDraft={() => handleDeleteDraft({
								draftId: id,
								imgPaths: [draft.logo_path, draft.cover_path],
								redirect: true,
							})}
						/>
					</>
				}
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
						<ImageInput
							label="Logo"
							onChange={(e) => setLogoFile(e.target.files?.[0] ?? null)}
							cssClass="col-span-full sm:col-span-1"
						/>
						<ImageInput
							label="Cover"
							onChange={(e) => setCoverFile(e.target.files?.[0] ?? null)}
							cssClass="col-span-full sm:col-span-1"
						/>
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
