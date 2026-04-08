import {Button} from '../components/Button';
export default function MainPage() {

	return (
		<>
			<h1 className="text-2xl font-bold pb-4">
				Hej!
			</h1>
			<p className="pb-8">Zapraszamy na przygodę!</p>
			<Button
				content="Zaloguj się"
				path="/login"
			/>
			<p className="my-5 self-center">
				lub
			</p>
			<Button
				content="Zarejestruj się"
				path="/signup"
				type="secondary"
			/>
		</>
	);
}
