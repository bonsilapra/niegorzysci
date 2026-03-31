import cx from 'classnames';

export const UserInput = ({
	label,
	id,
	type = 'text',
	name,
	placeholder,
	value,
	isRequired = false,
	onChange,
	isDisabled,
	cssClass,
}) => {

	const inputFocus = 'focus:border-secondary-500 focus:bg-secondary-0';
	const inputActive = 'active:border-secondary-600 active:bg-secondary-200';

	return (
		<>
			<label
				htmlFor={id}
				className="mb-2"
			>
				{label}
			</label>
			<input
				id={id}
				type={type}
				name={name}
				placeholder={placeholder}
				className={cx('p-2 mb-5 border rounded-md border-secondary-400 bg-secondary-0', inputFocus, inputActive, cssClass)}
				value={value}
				required={isRequired}
				onChange={onChange}
				disabled={isDisabled}
			/>
		</>
	);
};
