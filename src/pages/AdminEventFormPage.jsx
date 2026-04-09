import {useState} from 'react';
import {useParams} from 'react-router';
import {UserInput} from '../components/Inputs';
import {Button} from '../components/Button';

export default function AdminEventFormPage() {
	const {id} = useParams();
	const [isLoading, setIsLoading] = useState(false);
	const [event, setEvent] = useState({
		title: '',
		begin: '',
		end: '',
		content: '',
		status: 'draft',
	});

	const title = id ? 'Edytuj rajd' : 'Dodaj rajd';

	const handleChange = (event) => {
		const {name, value} = event.target;
		setEvent((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSave = () => {
		setIsLoading(true);
	};

	return (
		<>
			<h1 className="text-2xl font-bold mb-5">{title}</h1>
			<form className="rounded-2xl bg-primary-0 p-6 shadow-xl flex flex-col" onSubmit={handleSave}>
				<div className="grid grid-cols-2 gap-x-5">
					{eventItems.map((item) =>
						<UserInput
							label={item.label}
							id={item.id}
							key={item.id}
							name={item.name}
							type={item.type || 'text'}
							placeholder={item.placeholder}
							value={event[item.name]}
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
						cssClass="sm:w-50! col-span-full sm:col-span-1"
					/>
					<Button
						content="Opublikuj"
						isLoading={isLoading}
						cssClass="sm:w-50! col-span-full sm:col-span-1"
					/>
				</div>
			</form>
		</>
	);
}

const eventItems = [
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
