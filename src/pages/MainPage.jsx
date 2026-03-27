import {NavButton} from '../components/Buttons';
export default function MainPage() {

	return (
		<>
			<h1 className="text-2xl font-bold pb-8 self-center">
				Hej!
			</h1>
			<NavButton
				content="Zaloguj się"
				path="/login"
			/>
			<p className="my-5 self-center">
				lub
			</p>
			<NavButton
				content="Zarejestruj się"
				path="/signup"
				type="secondary"
			/>
		</>
	);
}
