import {useState} from 'react';
import {Button} from './Button';
import {ImageInput} from './Inputs';

export const DraftImage = ({label, imgUrl, handleDeleteImage, onImageChange}) => {
	const [isChangingImage, setIsChangingImage] = useState(false);

	return (
		<div className="flex flex-col mb-5 col-span-full sm:col-span-1">
			<span className="mb-2">
				{label}:
			</span>
			{isChangingImage
				? <div>
					<ImageInput
						label={null}
						onChange={onImageChange}
						cssClass="col-span-full sm:col-span-1"
					/>
				</div>
				: <div className="flex-1 flex flex-col">
					<div className="flex justify-around">
						<Button
							content="Zmień"
							onClick={() => setIsChangingImage(true)}
							type="secondary"
							size="small"
							cssClass="w-30!"
						/>
						<Button
							content="Usuń"
							onClick={handleDeleteImage}
							type="danger"
							size="small"
							cssClass="w-30!"
						/>
					</div>
					<img
						className="px-5 py-2 lg:px-10 lg:py-5 object-scale-down self-center"
						src={imgUrl}
					/>
				</div>
			}
		</div>
	);
};
