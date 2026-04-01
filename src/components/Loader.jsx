export const Loader = ({type = 'button'}) => {
	if (type === 'button') {
		return (
			<span className="loader"></span>
		);
	}
	if (type === 'full-page') {
		return (
			<div className="flex items-center h-50">
				<span className="loader loader-dark"></span>
			</div>
		);
	}
};
