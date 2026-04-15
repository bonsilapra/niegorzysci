export const DraftImage = ({label, imgUrl}) => {
	return (
		<div className="flex flex-col mb-5 col-span-full sm:col-span-1">
			<span className="mb-2">
				{label}:
			</span>
			<img
				className="flex-1 px-5 py-2 lg:px-10 lg:py-5 object-scale-down self-center"
				src={imgUrl}
			/>
		</div>
	);
};
